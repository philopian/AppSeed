require("dotenv").config();
const path = require("path");
const chalk = require("chalk");
const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const winston = require("winston");
const shell = require("shelljs");

const config = require("../appseed.config.js");
const PORT = process.env.PORT || config.portApi;

/******** Logging *************************************/
winston.add(winston.transports.File, {
  filename: "appseed-server.log",
  level: "error"
});
winston.remove(winston.transports.Console);

/******** API Calls	**************************************/
const apiServer = `json-server ${config.jsonServerData} --port ${config.portApi} --watch`
shell.exec(apiServer);


/******** All other routes redirect to the SPA ********/
if (process.env.NODE_ENV === "production") {
  const app = express();
  /******** Middleware *************************************/
  app.use(helmet());
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("X-Powered-By", "AppSeed");
    next();
  });
  app.use(compression()); // compress all responses
  app.use(bodyParser.urlencoded({ extended: false })); // Parse application/x-www-form-urlencoded
  app.use(bodyParser.json()); // Parse application/json

  app.use(express.static(config.paths.webRoot)); // Serve all the files as static
  app.all("/*", (req, res) => {
    const indexHtml = path.join(config.paths.webRoot, "index.html");
    res.status(200).sendFile(indexHtml);
  });

  /******** Listen on a port	*****************************/
  app.listen(PORT, () => {
    console.log(chalk.bgBlue.bold(`[NODE_ENV] "${process.env.NODE_ENV}"`));
    console.log(chalk.blue(`[REST Server]: http://localhost:${PORT}`));
  });
}

