import chalk from 'chalk';
import path from 'path';
import config from '../config';
import fs from 'node-fs-extra';


// Copy the server files
var sourceServer = config.serverRoot;
var destinationServer = path.join(config.deployRoot, 'server');
fs.copy(sourceServer, destinationServer, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log("Nodejs server files has been copied to the ./DEPLOY/ folder!");
  }
});


// // Copy the API folder (static json file)
// var sourceApi = config.appRoot;
// var destinationApi = path.join(config.deployRoot, 'api');
// fs.copy(sourceApi, destinationApi, function(err) {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log("./api/ folder has been copied to the ./DEPLOY/ folder!");
//   }
// });


// Copy the package.json and remove all the devDependencies
const packageJsonFileIn = path.join(config.appRoot, 'package.json');
const pacpackageJsonFileOut = path.join(config.deployRoot, 'package.json');
fs.readFile(packageJsonFileIn, 'utf8', (err, packageJson) => {
  if (err) {
    return console.log(err);
  }

  // Cleanup the devDependencies
  const regexRemoveDevDependencies = /"devDependencies": {([\s\S]*?)},\n /g;
  packageJson = packageJson.replace(regexRemoveDevDependencies, "");

  // Cleanup the scripts list
  const regexRemoveNpmScripts = /"scripts": {([\s\S]*?)},\n /g;
  const prodScripts = `"scripts": {
    "prestart": "npm i",
    "start": "npm-run-all --parallel message:running-production serve:production server:rest-production",
    "message:running-production": "node_modules/.bin/babel-node message-running-production",
    "serve:production": "node_modules/.bin/live-server ./www",
    "server:rest-production": "cross-env NODE_ENV=production node_modules/.bin/babel-node ./server"
  },
`;
  packageJson = packageJson.replace(regexRemoveNpmScripts, prodScripts);

  // Write changes to index.html file
  fs.writeFile(pacpackageJsonFileOut, packageJson, 'utf8', (err) => {
    if (err) {
      return console.log(err);
    }
    console.log(chalk.blue(`bower tags injected into ${pacpackageJsonFileOut}`));
  });

});