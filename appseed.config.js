const path = require("path");
const ROOT = __dirname;
const DEPLOY_FOLDER_NAME = "DEPLOY";
const REST_API_PORT = 9090;

module.exports = {
  port: 8080,
  portApi: REST_API_PORT,
  portStorybook: 8081,
  baseUrl: (process.env.NODE_ENV === "production") ? "" : `http://localhost:${REST_API_PORT}`,
  fileNames: {
    webRoot: "www",
    distRoot: DEPLOY_FOLDER_NAME
  },
  paths: {
    appRoot: ROOT,
    webRoot: path.join(ROOT, "./www"),
    serverRoot: path.join(ROOT, "./server"),
    deployRoot: path.join(ROOT, DEPLOY_FOLDER_NAME),
    deployWwwRoot: path.join(ROOT, DEPLOY_FOLDER_NAME, 'www'),
    bower: path.join(ROOT, "./www/bower_components")
  }
};