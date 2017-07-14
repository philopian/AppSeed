import path from 'path';
import fs from 'fs';
import fsExtra from 'fs-extra';
import chalk from 'chalk';
import bowerMain from 'bower-main';
import mainBowerFiles from 'main-bower-files';
import merge2 from 'merge2';
import concat from 'concat-files';
import uglifyJS from "uglify-js";
import uglifyCss from 'uglifycss';
import rimraf from 'rimraf';
import config from '../config';

/*********************************************
 * Create the ./DEPLOY/www/code/ directory
 *********************************************/
const webDir = path.join(config.distRoot, 'code');
fs.mkdirSync(webDir);



/*********************************************
 * Copy config file
 *********************************************/
const configFrom = path.join(config.appRoot, 'config.js');
const configTo = path.join(config.deployRoot, 'config.js');
fsExtra.copy(configFrom, configTo, err => {
  if (err) return console.error(err)
  console.log(chalk.green('Config file copied to DEPLOY'));
});



/*********************************************
 * CSS
 *********************************************/
var bowerCssFiles = bowerMain('css', 'min.css');
var outCssFile = path.join(config.distRoot, 'code/vendor.min.css');
var tempOutCssFile = path.join(config.distRoot, 'code/.temp.vendor.min.css');

// Minified JS packages provided
concat(bowerCssFiles.minified, outCssFile, function(err) {
  if (err) throw err
  console.log(chalk.green('CSS Bower Packages concatenated'));

  // Minify these JS packages
  concat(bowerCssFiles.minifiedNotFound, tempOutCssFile, function(err) {
    if (err) throw err
    console.log(chalk.blue('Concat non-min CSS bowerfiles'));

    var uglified = uglifyCss.processFiles(
      [tempOutCssFile], { uglyComments: true }
    );

    fs.appendFile(outCssFile, uglified, (err) => {
      if (err) throw err;
      rimraf(tempOutCssFile, () => {});
      console.log(chalk.green(`non minified CSS appended to ./${config.distFileName}/code/vendor.min.js`));
    });
  });

});


/*********************************************
 * FontAwesome
 *********************************************/
const fontAwesomeDir = path.join(config.bower, 'font-awesome/fonts');
const fontAwesomeBuildDir = path.join(config.distRoot, 'fonts');
if (fs.existsSync(path.join(fontAwesomeDir, 'fontawesome-webfont.ttf'))) {
  fsExtra.copy(fontAwesomeDir, fontAwesomeBuildDir, err => {
    if (err) return console.error(err)
    console.log(chalk.green('FontAwesome fonts copied to DEPLOY'));
  });
}


/*********************************************
 * Leaflet
 *********************************************/
const leafletAssets = path.join(config.bower, 'leaflet/dist/images');
const codeDir = path.join(config.distRoot, 'code/images');
if (fs.existsSync(path.join(leafletAssets, 'marker-icon.png'))) {
  fsExtra.copy(leafletAssets, codeDir, err => {
    if (err) return console.error(err)
    console.log(chalk.green('Leaflet assets copied to DEPLOY'));
  });
}



/*********************************************
 * API file
 *********************************************/
const apiDevDir = path.join(config.appRoot, 'api');
const apiProdDir = path.join(config.deployRoot, 'api');
fsExtra.copy(apiDevDir, apiProdDir, err => {
  if (err) return console.error(err)
  console.log('Sample API files copied to DEPLOY');
});