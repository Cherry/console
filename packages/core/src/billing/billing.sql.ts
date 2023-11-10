import {
  mysqlTable,
  primaryKey,
  date,
  uniqueIndex,
  mysqlEnum,
  bigint,
  varchar,
} from "drizzle-orm/mysql-core";
import { timestamps, workspaceID, cuid } from "../util/sql";

export const usage = mysqlTable(
  "usage",
  {
    workspaceID: workspaceID.workspaceID,
    ...timestamps,
    id: cuid("id").notNull(),
    stageID: cuid("stage_id").notNull(),
    day: date("day", { mode: "string" }).notNull(),
    invocations: bigint("invocations", { mode: "number" }).notNull(),
  },
  (table) => ({
    primary: primaryKey({ columns: [table.workspaceID, table.id] }),
    stage: uniqueIndex("stage").on(table.workspaceID, table.stageID, table.day),
  })
);

export const stripe = mysqlTable(
  "stripe",
  {
    ...workspaceID,
    ...timestamps,
    customerID: varchar("customer_id", { length: 255 }),
    subscriptionID: varchar("subscription_id", { length: 255 }),
    subscriptionItemID: varchar("subscription_item_id", {
      length: 255,
    }),
    standing: mysqlEnum("standing", ["good", "overdue"]),
  },
  (table) => ({
    primary: primaryKey({ columns: [table.workspaceID, table.id] }),
    workspace: uniqueIndex("workspaceID").on(table.workspaceID),
  })
);
