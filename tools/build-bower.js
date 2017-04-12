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

fs.mkdir(path.join(config.distRoot, 'code'));

/*********************************************
 * JAVASCRIPT
 *********************************************/
/* var bowerJsFiles = bowerMain('js', 'min.js');
var outJsFile = path.join(config.distRoot, 'code/vendor.min.js');
var tempOutJsFile = path.join(config.distRoot, 'code/.temp.vendor.min.js');

// Minified JS packages provided
concat(bowerJsFiles.minified, outJsFile, function(err) {
  if (err) throw err
  console.log(chalk.green('JS Bower Packages concatenated'));

  // Minify these JS packages
  concat(bowerJsFiles.minifiedNotFound, tempOutJsFile, function(err) {
    if (err) throw err
    console.log(chalk.blue('Concat non-min bowerfiles'));

    let uglify = uglifyJS.minify(tempOutJsFile, {
      compress: {
        dead_code: true,
        global_defs: {
          DEBUG: false
        },
      }
    });

    fs.appendFile(outJsFile, uglify.code, (err) => {
      if (err) throw err;
      rimraf(tempOutJsFile, () => {});
      console.log(chalk.green(`non minified JS appended to ./${config.distFileName}/code/vendor.min.js`));
    });
  });

});
//*/



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
    console.log(chalk.green('FontAwesome fonts copied to dist'));
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
    console.log(chalk.green('Leaflet assets copied to dist'));
  });
}