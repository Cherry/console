import { withActor } from "@console/core/actor";
import { App, Stage } from "@console/core/app";
import { app, stage } from "@console/core/app/app.sql";
import { awsAccount } from "@console/core/aws/aws.sql";
import { db } from "@console/core/drizzle";
import {
  createTransaction,
  createTransactionEffect,
} from "@console/core/util/transaction";
import { and, eq } from "drizzle-orm";

interface Events {
  "Object Created": {
    bucket: {
      name: string;
    };
    object: {
      key: string;
    };
  };
}

type Payload = {
  [key in keyof Events]: {
    account: string;
    region: string;
    "detail-type": key;
    detail: Events[key];
  };
}[keyof Events];

export const handler = async (evt: Payload) => {
  console.log(evt);
  if (
    evt["detail-type"] === "Object Created" ||
    evt["detail-type"] === "Object Deleted"
  ) {
    if (
      !evt.detail.object.key.startsWith("stackMetadata") &&
      !evt.detail.object.key.startsWith("app")
    ) {
      console.log("skipping", evt.detail.object.key);
      return;
    }
    const [, appHint, stageHint] = evt.detail.object.key.split("/");
    console.log({ appHint, stageHint });
    if (!stageHint || !appHint) return;
    let stageName = stageHint.endsWith(".json")
      ? stageHint.split(".")[0]
      : stageHint?.split(".").at(-1);
    const appName = appHint.includes(".")
      ? appHint?.split(".").at(-1)
      : appHint;
    const { account, region } = evt;
    console.log("processing", appName, stageName, account, region);

    const rows = await db
      .select({
        workspaceID: awsAccount.workspaceID,
        stageID: stage.id,
        appID: app.id,
        id: awsAccount.id,
      })
      .from(awsAccount)
      .leftJoin(
        app,
        and(
          eq(app.name, appName!),
          eq(app.workspaceID, awsAccount.workspaceID),
        ),
      )
      .leftJoin(stage, and(eq(stage.name, stageName!), eq(stage.appID, app.id)))
      .where(and(eq(awsAccount.accountID, account)))
      .execute();

    console.log("matches", rows);

    for (const row of rows) {
      await withActor(
        {
          type: "system",
          properties: {
            workspaceID: row.workspaceID,
          },
        },
        () =>
          createTransaction(async () => {
            if (row.stageID) {
              console.log("creating effect");
              await createTransactionEffect(() =>
                Stage.Events.Updated.publish({
                  stageID: row.stageID!,
                }),
              );
              return;
            }

            let appID = row.appID;
            if (!appID) {
              appID = await App.create({
                name: appName!,
              });
            }

            await App.Stage.connect({
              appID,
              region,
              name: stageName!,
              awsAccountID: row.id,
            });
          }),
      );
      console.log("done", row);
    }
  }
};
