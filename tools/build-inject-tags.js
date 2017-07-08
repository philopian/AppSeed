/*eslint-disable no-console */

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import config from '../config';

const inputHtml = path.join(config.webRoot, 'index.html');
const outputHtml = path.join(config.distRoot, 'index.html');
fs.readFile(inputHtml, 'utf8', (err, html) => {
  if (err) {
    console.log('...err cant read');

    return console.log(err);
  }

  var regexInjectCss = /<!-- bower:css -->([\s\S]*?)<!-- endinject -->/g;
  var regexInjectJs = /<!-- bundle:css -->([\s\S]*?)<!-- endinject -->/g;
  var regexInjectBundleJs = /<!-- bundle:js -->([\s\S]*?)<!-- endinject -->/g;

  // Replace tags
  html = html.replace(regexInjectCss, '<!-- bower:css -->\n    <link rel="stylesheet" href="code/vendor.min.css">\n    <!-- endinject -->');
  html = html.replace(regexInjectJs, '<!-- bundle:css -->\n    <link rel="stylesheet" type="" href="code/app.css">\n    <!-- endinject -->');
  html = html.replace(regexInjectBundleJs, '<!-- bundle:js -->\n <script src="code/bundle.js"></script> <!-- endinject -->');

  // Create new file
  fs.writeFile(inputHtml, html, 'utf8', function(err) {
    if (err) {
      console.log('...err cant write');
      return console.log(err);
    }
    console.log(chalk.green(`index.html written to ./${config.distFileName}`));
  });
});