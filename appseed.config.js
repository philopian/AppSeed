var path = require("path");

const WEB_FOLDER = "www";
const BUILD_FOLDER = "DEPLOY";
const REST_API_PORT = 1234;
const BASE_URL = process.env.NODE_ENV === 'production' ? '' : `http://localhost:${REST_API_PORT}`;

module.exports = {
  port: 8080,
  portApi: REST_API_PORT,
  portStorybook: 8081,
  BASE_URL,
  appRoot: __dirname,
  webRoot: path.join(__dirname, WEB_FOLDER),
  publicRoot: path.join(__dirname, WEB_FOLDER),

  distFileName: "DEPLOY",
  deployRoot: path.join(__dirname, BUILD_FOLDER),
  distRoot: path.join(__dirname, BUILD_FOLDER),
  bower: path.join(__dirname, "./bower_components")
};