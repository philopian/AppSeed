import chalk from 'chalk';
import path from 'path';
import config from '../config';
import fs from 'node-fs-extra';

var source = path.join(config.webRoot, 'assets');
var destination = path.join(config.distRoot, 'assets');

fs.copy(source, destination, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log(chalk.green('Assets files have been copied to the dist folder!'));
  }
}); //copies directory, even if it has subdirectories or files