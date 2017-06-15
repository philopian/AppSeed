var path = require('path');
const DIST_NAME = 'dist';

module.exports = {
  mysecret: 'This is a secret shhhhh',
  jwtUniqueId: '123456789',
  port: 8080,
  portTests: 8081,
  portAPI: 8082,

  appRoot: __dirname,
  webRoot: path.join(__dirname, './www'),
  distFileName: DIST_NAME,
  distRoot: path.join(__dirname, DIST_NAME),
  bower: path.join(__dirname, './www/bower_components'),

  logo: path.join(__dirname, "logo.png"),
  favicons: path.join(__dirname, "www/assets/favicon"),

  sass: path.join(__dirname, "www/sass/*.scss"),
  cssDir: path.join(__dirname, "www/css"),

  frontendFiles: path.join(__dirname, './www/**/*'),
  backendFiles: path.join(__dirname, './server/**/*'),

  server: path.join(__dirname, './server'),
  db: { languageDriver: 'sqlite' },
  // db: {languageDriver: 'postgres'},
  // db: {languageDriver: 'sqlite'},
};