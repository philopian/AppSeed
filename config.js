var path = require('path');
const DEPLOY = 'DEPLOY';
const DIST_NAME = 'www';
const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8082';

module.exports = {
  serverIp: 'xxx.xxx.xxx.xxx',
  mysecret: 'This is a secret shhhhh',
  jwtUniqueId: '123456789',
  port: 8080,
  portTests: 8081,
  portAPI: 8082,
  portStorybook: 8083,
  BASE_URL,

  appRoot: __dirname,
  webRoot: path.join(__dirname, './www'),
  serverRoot: path.join(__dirname, './server'),
  distFileName: `${DEPLOY}/${DIST_NAME}`,
  deployRoot: path.join(__dirname, DEPLOY),
  distRoot: path.join(__dirname, DEPLOY, DIST_NAME),
  deployWww: path.join(__dirname, DEPLOY, DIST_NAME),
  deployServeWww: path.join(__dirname, DIST_NAME),
  bower: path.join(__dirname, './www/bower_components'),

  logo: path.join(__dirname, "logo.png"),
  favicons: path.join(__dirname, "www/assets/favicon"),

  sass: path.join(__dirname, "www/sass/*.scss"),
  cssDir: path.join(__dirname, "www/css"),

  frontendFiles: path.join(__dirname, './www/**/*'),
  backendFiles: path.join(__dirname, './server/**/*'),

  server: path.join(__dirname, './server'),
  // db: { languageDriver: 'sqlite' },
  // db: {languageDriver: 'postgres'},
  // db: {languageDriver: 'sqlite'},
};