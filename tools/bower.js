import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import mainBowerFiles from 'main-bower-files';


var files = mainBowerFiles({ paths: path.join(__dirname, '..') });

// Get all the main files from the bower.json file
let cssTags = '<!-- bower:css -->\n';
let jsTags = '<!-- bower:js -->\n';
files.forEach((d) => {
  let tagPath = path.relative(path.join(__dirname, '..'), d)
  tagPath = tagPath.replace('www/', '');
  tagPath = tagPath.replace(/\\/g, '/');

  let fileType = path.extname(d);
  if (fileType == '.css') {
    cssTags += `    <link rel="stylesheet" type="" href="${tagPath}">\n`
  } else if (fileType == '.js') {
    jsTags += `    <script src="${tagPath}"></script>\n`
  }
});
cssTags += '    <!-- endinject -->';
jsTags += '    <!-- endinject -->';
let bundleJsTags = '<!-- bundle:js -->\n    <script src="bundle.js"></script>\n    <!-- endinject -->';

// Regex 
var regexInjectCss = /<!-- bower:css -->([\s\S]*?)<!-- endinject -->/g;
var regexInjectJs = /<!-- bower:js -->([\s\S]*?)<!-- endinject -->/g;
var regexInjectBundleJs = /<!-- bundle:js -->([\s\S]*?)<!-- endinject -->/g;

fs.readFile(path.join(__dirname, '../www/index.html'), 'utf8', (err, html) => {
  if (err) {
    return console.log(err);
  }

  // Replace tags
  html = html.replace(regexInjectCss, cssTags);
  html = html.replace(regexInjectJs, jsTags);
  html = html.replace(regexInjectBundleJs, bundleJsTags);

  // Write changes to index.html file
  fs.writeFile(path.join(__dirname, '../www/index.html'), html, 'utf8', function(err) {
    if (err) {
      return console.log(err);
    }
    console.log(chalk.blue('bower tags injected into /www/index.html'));
  });
});