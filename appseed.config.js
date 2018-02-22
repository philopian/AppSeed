const path = require("path");
const ROOT = __dirname;
const DEPLOY_FOLDER_NAME = "DEPLOY";
const PORT_DEV_SERVER = 8080;
const PORT_STORYBOOK = 8081; // Make sure you update the package.json
const PORT_REST_API = 5150; // Make sure you update the package.json

module.exports = {
  port: PORT_DEV_SERVER,
  portApi: PORT_REST_API,
  portStorybook: PORT_STORYBOOK,
  baseUrl: (process.env.NODE_ENV === "production") ? "" : `http://localhost:${PORT_REST_API}`,
  jsonServerData: path.join(ROOT, "server-json/index.json"),
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