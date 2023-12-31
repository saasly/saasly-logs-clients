import getRootFilePath from "../getRootFilePath";
import getRootFileName from "../getRootFileName";
import { relative } from "path";
import pushLog from "./pushLog";
import { get as getStackTrace } from "stack-trace";

const os = require("os");

function getTrace() {
  let trace = getStackTrace();
  let final: string[] = [];
  trace.forEach((t: any) => {
    if (
      t.isNative() === false &&
      t.isConstructor() === false &&
      t.getFileName() !== __filename
    ) {
      if (relative(__filename, t.getFileName()) !== "../../../index.js") {
        final.push(t.toString());
      }
    }
  });

  return final;
}

export default function prepareLog({
  apiKey,
  source,
  level,
  identifier,
  message,
  stack,
}: {
  apiKey: string;
  source?: string;
  identifier?: string;
  level:
    | "info"
    | "error"
    | "warn"
    | "debug"
    | "log"
    | "uncaughtException"
    | "unhandledRejection";
  message?: string;
  stack?: string;
}) {
  return pushLog({
    apiKey,
    data: {
      at: new Date().toISOString(),
      source: source || process.env?.PROCESS_NAME || process.env?.NODE_ENV,
      level: level || "log",
      identifier: identifier || "",
      log: message || "no message",
      meta: JSON.stringify({
        rootFilePath: getRootFilePath() || "",
        rootFile: getRootFileName(getRootFilePath()) || "",
        trace: getTrace() || [],
        pid: process.pid || -1,
        nodeVersion: process.version,
        NODE_ENV: process.env.NODE_ENV || "",
        hostname: os.hostname(),
        os: `${os.type()} ${os.release()}`,
      }),
    },
  });
}
