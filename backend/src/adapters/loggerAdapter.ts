import extLogger from "../utils/extLoggerConfig";
import { Logger as ExtLogger } from "winston";

type LoggerLevels = "error" | "warn" | "info" | "verbose" | "debug" | "silly";

type logOpts = { message: any; level: LoggerLevels };

interface Logger {
  extLogger: ExtLogger;
  log: (opts: logOpts) => this;
  error: (message: any) => this;
  warn: (message: any) => this;
  info: (message: any) => this;
  verbose: (message: any) => this;
  debug: (message: any) => this;
  silly: (message: any) => this;
}

class Logger implements Logger {
  extLogger: ExtLogger;
  constructor(extLogger: ExtLogger) {
    this.extLogger = extLogger;
  }
  log = (opts: logOpts) => {
    const { message, level } = opts;
    this.extLogger.log(level, message);
    return this;
  };
  error = (message: any) => {
    this.extLogger.error(message);
    return this;
  };
  warn = (message: any) => {
    this.extLogger.warn(message);
    return this;
  };
  info = (message: any) => {
    this.extLogger.info(message);
    return this;
  };
  debug = (message: any) => {
    this.extLogger.debug(message);
    return this;
  };
  silly = (message: any) => {
    this.extLogger.silly(message);
    return this;
  };
}

const logger = new Logger(extLogger);

export default logger;
