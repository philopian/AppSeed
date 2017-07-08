import rimraf from 'rimraf';
import fs from 'fs';
import config from '../config';

function makeFolderIfDoesntExist(folderName) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(folderName)) {
      rimraf(folderName, () => {
        fs.mkdirSync(folderName);
        resolve();
      });
    } else {
      fs.mkdirSync(folderName);
      resolve();
    }
  });
}

// Make the ./DEPLOY & ./DEPLOY/www/
const deployFolder = config.deployRoot;
const wwwFolder = config.distRoot;
makeFolderIfDoesntExist(deployFolder)
  .then(() => {
    return makeFolderIfDoesntExist(wwwFolder);
  });