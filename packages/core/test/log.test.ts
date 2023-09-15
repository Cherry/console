import { expect, test } from "vitest";
import { Log } from "../src/log";

function runTest(input: string[]) {
  const err = Log.extractError(input);
  expect(err).not.toBeUndefined();
  expect(err).toMatchSnapshot();
}

test("node invoke", () => {
  runTest([
    `2023-09-15T13:03:59.257Z`,
    `8179a9db-e726-451b-898f-93923b3e7bbd`,
    `ERROR`,
    `Invoke Error`,
    `{"errorType":"NoSuchBucket","errorMessage":"The specified bucket does not exist","name":"NoSuchBucket","$fault":"client","$metadata":{"httpStatusCode":404,"requestId":"SEDJ1KBFNG26CADF","extendedRequestId":"Uxm/2OOqe5zjcRwxzZNzpePcai5oteEZJoq1S7gTWF94BO1ClmQAl5nYM7UeOpMZKAla5SFqJdI=","attempts":1,"totalRetryDelay":0},"Code":"NoSuchBucket","BucketName":"sstbootstrap-useast124d14e4b-txrftoxsysmw","RequestId":"SEDJ1KBFNG26CADF","HostId":"Uxm/2OOqe5zjcRwxzZNzpePcai5oteEZJoq1S7gTWF94BO1ClmQAl5nYM7UeOpMZKAla5SFqJdI=","message":"The specified bucket does not exist","stack":["NoSuchBucket: The specified bucket does not exist"," at de_NoSuchBucketRes (file:///var/task/packages/functions/src/events/app-stage-updated.mjs:51859:21)"," at de_ListObjectsV2CommandError (file:///var/task/packages/functions/src/events/app-stage-updated.mjs:51807:19)"," at runMicrotasks (<anonymous>)"," at processTicksAndRejections (node:internal/process/task_queues:96:5)"," at async file:///var/task/packages/functions/src/events/app-stage-updated.mjs:42732:20"," at async file:///var/task/packages/functions/src/events/app-stage-updated.mjs:41547:18"," at async file:///var/task/packages/functions/src/events/app-stage-updated.mjs:43230:38"," at async file:///var/task/packages/functions/src/events/app-stage-updated.mjs:41269:22"," at async file:///var/task/packages/functions/src/events/app-stage-updated.mjs:56745:19"," at async file:///var/task/packages/functions/src/events/app-stage-updated.mjs:56891:3"]}`,
  ]);
});

test("node uncaught exception", () => {
  runTest([
    `2023-09-15T13:03:59.257Z`,
    `8179a9db-e726-451b-898f-93923b3e7bbd`,
    `ERROR`,
    `Uncaught Exception`,
    `{"errorType":"NoSuchBucket","errorMessage":"The specified bucket does not exist","name":"NoSuchBucket","$fault":"client","$metadata":{"httpStatusCode":404,"requestId":"SEDJ1KBFNG26CADF","extendedRequestId":"Uxm/2OOqe5zjcRwxzZNzpePcai5oteEZJoq1S7gTWF94BO1ClmQAl5nYM7UeOpMZKAla5SFqJdI=","attempts":1,"totalRetryDelay":0},"Code":"NoSuchBucket","BucketName":"sstbootstrap-useast124d14e4b-txrftoxsysmw","RequestId":"SEDJ1KBFNG26CADF","HostId":"Uxm/2OOqe5zjcRwxzZNzpePcai5oteEZJoq1S7gTWF94BO1ClmQAl5nYM7UeOpMZKAla5SFqJdI=","message":"The specified bucket does not exist","stack":["NoSuchBucket: The specified bucket does not exist"," at de_NoSuchBucketRes (file:///var/task/packages/functions/src/events/app-stage-updated.mjs:51859:21)"," at de_ListObjectsV2CommandError (file:///var/task/packages/functions/src/events/app-stage-updated.mjs:51807:19)"," at runMicrotasks (<anonymous>)"," at processTicksAndRejections (node:internal/process/task_queues:96:5)"," at async file:///var/task/packages/functions/src/events/app-stage-updated.mjs:42732:20"," at async file:///var/task/packages/functions/src/events/app-stage-updated.mjs:41547:18"," at async file:///var/task/packages/functions/src/events/app-stage-updated.mjs:43230:38"," at async file:///var/task/packages/functions/src/events/app-stage-updated.mjs:41269:22"," at async file:///var/task/packages/functions/src/events/app-stage-updated.mjs:56745:19"," at async file:///var/task/packages/functions/src/events/app-stage-updated.mjs:56891:3"]}`,
  ]);
});

test("node inline multiline", () => {
  runTest([
    `2023-09-15T12:43:23.014Z`,
    `31eaad44-5f5e-41ae-ae77-db15c7f7c8a2`,
    `ERROR`,
    `ZodError: [\n  {\n    "code": "too_small",\n    "minimum": 1,\n    "type": "string",\n    "inclusive": true,\n    "exact": false,\n    "message": "String must contain at least 1 character(s)",\n    "path": [\n      "slug"\n    ]\n  },\n  {\n    "code": "too_small",\n    "minimum": 3,\n    "type": "string",\n    "inclusive": true,\n    "exact": false,\n    "message": "String must contain at least 3 character(s)",\n    "path": [\n      "slug"\n    ]\n  },\n  {\n    "validation": "regex",\n    "code": "invalid_string",\n    "message": "Invalid",\n    "path": [\n      "slug"\n    ]\n  }\n]\n    at Object.get error [as error] (file:///var/task/packages/functions/src/replicache/push1.mjs:37260:23)\n    at _ZodObject.parse (file:///var/task/packages/functions/src/replicache/push1.mjs:37363:18)\n    at Object.result (file:///var/task/packages/functions/src/replicache/push1.mjs:58013:27)\n    at file:///var/task/packages/functions/src/replicache/push1.mjs:76714:46\n    at Object.fn (file:///var/task/packages/functions/src/replicache/push1.mjs:58262:16)\n    at Server.execute (file:///var/task/packages/functions/src/replicache/push1.mjs:58279:16)\n    at file:///var/task/packages/functions/src/replicache/push1.mjs:76784:22\n    at runMicrotasks (<anonymous>)\n    at processTicksAndRejections (node:internal/process/task_queues:96:5)\n    at async db.transaction.isolationLevel (file:///var/task/packages/functions/src/replicache/push1.mjs:55329:25) {\n  issues: [\n    {\n      code: \'too_small\',\n      minimum: 1,\n      type: \'string\',\n      inclusive: true,\n      exact: false,\n      message: \'String must contain at least 1 character(s)\',\n      path: [Array]\n    },\n    {\n      code: \'too_small\',\n      minimum: 3,\n      type: \'string\',\n      inclusive: true,\n      exact: false,\n      message: \'String must contain at least 3 character(s)\',\n      path: [Array]\n    },\n    {\n      validation: \'regex\',\n      code: \'invalid_string\',\n      message: \'Invalid\',\n      path: [Array]\n    }\n  ],\n  addIssue: [Function (anonymous)],\n  addIssues: [Function (anonymous)],\n  errors: [\n    {\n      code: \'too_small\',\n      minimum: 1,\n      type: \'string\',\n      inclusive: true,\n      exact: false,\n      message: \'String must contain at least 1 character(s)\',\n      path: [Array]\n    },\n    {\n      code: \'too_small\',\n      minimum: 3,\n      type: \'string\',\n      inclusive: true,\n      exact: false,\n      message: \'String must contain at least 3 character(s)\',\n      path: [Array]\n    },\n    {\n      validation: \'regex\',\n      code: \'invalid_string\',\n      message: \'Invalid\',\n      path: [Array]\n    }\n  ]\n}\n`,
  ]);
});

test("node inline", () => {
  runTest([
    `2023-09-12T00:55:20.974Z`,
    `662fa6b4-dc47-4d49-a7e2-200ad7ce1537`,
    `ERROR`,
    `DatabaseError: target: sst.-.primary: vttablet: rpc error: code = AlreadyExists desc = Duplicate entry 'foo' for key 'workspace.slug' (errno 1062) (sqlstate 23000) (CallerID: lq15hm6s0ctusshuarsx): Sql: \"insert into workspace(id, time_created, time_updated, time_deleted, slug, stripe_customer_id, stripe_subscription_id, stripe_subscription_item_id) values (:vtg1 /* VARCHAR */, default, default, default, :vtg2 /* VARCHAR */, default, default, default)\", BindVars: {REDACTED}\n    at _Connection.execute (file:///var/task/packages/functions/src/replicache/push1.mjs:47211:13)\n    at runMicrotasks (<anonymous>)\n    at processTicksAndRejections (node:internal/process/task_queues:96:5)\n    at async file:///var/task/packages/functions/src/replicache/push1.mjs:69523:5\n    at async file:///var/task/packages/functions/src/replicache/push1.mjs:76353:22\n    at async file:///var/task/packages/functions/src/replicache/push1.mjs:76423:9\n    at async db.transaction.isolationLevel (file:///var/task/packages/functions/src/replicache/push1.mjs:55325:25)\n    at async _Connection.transaction (file:///var/task/packages/functions/src/replicache/push1.mjs:47190:19)\n    at async createTransaction (file:///var/task/packages/functions/src/replicache/push1.mjs:55322:20)\n    at async file:///var/task/packages/functions/src/replicache/push1.mjs:76380:5 {\n  status: 400,\n  body: {\n    message: \`target: sst.-.primary: vttablet: rpc error: code = AlreadyExists desc = Duplicate entry 'foo' for key 'workspace.slug' (errno 1062) (sqlstate 23000) (CallerID: lq15hm6s0ctusshuarsx): Sql: \"insert into workspace(id, time_created, time_updated, time_deleted, slug, stripe_customer_id, stripe_subscription_id, stripe_subscription_item_id) values (:vtg1 /* VARCHAR */, default, default, default, :vtg2 /* VARCHAR */, default, default, default)\", BindVars: {REDACTED}\`,\n    code: 'UNKNOWN'\n  }\n}\n`,
  ]);
});

test("node ignore warning", () => {
  const err = Log.extractError([
    `2023-09-12T00:55:20.974Z`,
    `662fa6b4-dc47-4d49-a7e2-200ad7ce1537`,
    `ERROR`,
    `(node:8) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
(Use \`node --trace-deprecation ...\` to show where the warning was created)`,
  ]);
  expect(err).toBeUndefined();
});
