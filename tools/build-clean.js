import rimraf from 'rimraf';
import fs from 'fs';
import config from '../config';

if (fs.existsSync(config.distRoot)) {
  rimraf(config.distRoot, () => {
    fs.mkdirSync(config.distRoot);
  });
} else {
  fs.mkdirSync(config.distRoot);
}