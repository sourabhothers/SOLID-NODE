import { warn } from "console";
import path from "path";
import winston, { LoggerOptions } from "winston";

const logDir = path.resolve(__dirname, "../../logs");

const logCongiguration: LoggerOptions = {
  transports: [
    new winston.transports.Console({
      consoleWarnLevels: [],
      format: winston.format.combine(
        winston.format.label({ label: "Just Testing" }),
        winston.format.timestamp({ format: "DD-MMM-YYYY HH:mm:ss" }),
        winston.format.printf(
          (info) =>
            `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
    // new winston.transports.File({
    //   filename: `${logDir}/test.log`,
    //   format: winston.format.combine(
    //     winston.format.label({ label: "Just Testing" }),
    //     winston.format.timestamp({ format: "DD-MMM-YYYY HH:mm:ss" }),
    //     winston.format.printf(
    //       (info) =>
    //         `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`
    //     )
    //   ),
    // }),
  ],
};

const extLogger = winston.createLogger(logCongiguration);

export default extLogger;
