/**
 *
 * Just import this module and fire off a message
 * e.g.
    logger.log({
      level: "info",
      message: "Hello distributed log files!"
    });
 */

const fs = require("fs");
const path = require("path");
const winston = require("winston");

const filePaths = {
  loggingDir: path.join(__dirname, "__LOGS__"),
  errorFilePath: path.join(__dirname, "__LOGS__", "error.log"),
  allLogs: path.join(__dirname, "__LOGS__", "appseed-server.log")
};
if (!fs.existsSync(filePaths.loggingDir)) {
  fs.mkdirSync(filePaths.loggingDir);
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    // - Write to all logs with level `info` and below to `combined.log`
    new winston.transports.File({
      filename: filePaths.errorFilePath,
      level: "error"
    }),

    // - Write all logs error (and below) to `error.log`.
    new winston.transports.File({ filename: filePaths.allLogs })
  ]
});

logger.add(
  new winston.transports.Console({
    format: winston.format.simple()
  })
);
module.exports = logger;
