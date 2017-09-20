import chalk from 'chalk';
import path from 'path';
import config from '../config';
import fs from 'node-fs-extra';
import chmod from 'chmod';


/*********************************************
 * nodejs
 *********************************************/
// Copy the server files
var sourceServer = config.serverRoot;
var destinationServer = path.join(config.deployRoot, 'server');
fs.copy(sourceServer, destinationServer, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log("Nodejs server files has been copied to the ./DEPLOY/nodejs folder!");
    console.log(chalk.blue('...Copied the nodejs server files has been copied to the ./DEPLOY/nodejs folder'));
  }
});

// Copy the package.json and remove all the devDependencies
const packageJsonFileIn = path.join(config.appRoot, 'package.json');
const packageJsonFileOut = path.join(config.deployRoot, 'package.json');
fs.readFile(packageJsonFileIn, 'utf8', (err, packageJson) => {
  if (err) return console.error(err)

  // Cleanup the devDependencies
  const regexRemoveDevDependencies = /"devDependencies": {([\s\S]*?)},\n /g;
  packageJson = packageJson.replace(regexRemoveDevDependencies, "");


  // Cleanup the scripts list
  const regexRemoveNpmScripts = /"scripts": {([\s\S]*?)},\n /g;
  const prodScripts = `"scripts": {
    "prestart": "npm i",
    "start": "node_modules/.bin/nodemon server --exec babel-node --presets babel-preset-es2015"
  },
`;
  packageJson = packageJson.replace(regexRemoveNpmScripts, prodScripts);

  // Write changes to index.html file
  fs.writeFile(packageJsonFileOut, packageJson, 'utf8', (err) => {
    if (err) return console.error(err)
      // console.log(chalk.blue('...Wrote changes to index.html file'));
      // console.log(chalk.blue(`bower tags injected into ${packageJsonFileOut}`));
  });
});

// Copy and update the config.js file to have the proper portAPI value
const configFileName = path.join(config.appRoot, 'config.js');
const nodejsConfigFileName = path.join(config.deployRoot, 'config.js');
fs.readFile(configFileName, 'utf8', (err, data) => {
  if (err) return console.error(err)
    // console.log(chalk.blue('...'));

  // Cleanup the devDependencies
  const updatePortAPI = /portAPI: ([\s\S]*?),/g;
  data = data.replace(updatePortAPI, "portAPI: 8080,");

  // update the config www path
  const currentServerPath = 'deployWww: path.join(__dirname, DEPLOY, DIST_NAME)';
  const replaceServerPath = 'deployWww: path.join(__dirname, DIST_NAME)';
  data = data.replace(currentServerPath, replaceServerPath);


  // Write changes to DEPLOY/server/nodejs file
  fs.writeFile(nodejsConfigFileName, data, 'utf8', (err) => {
    if (err) return console.error(err)
      // console.log(chalk.blue('...Copied and updated the config.js file to have the proper portAPI value'));
  });
});