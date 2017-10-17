import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import config from '../config';


// Regex 
const regexInjectCss = /<!-- bundle:css -->([\s\S]*?)<!-- endinject -->/g;
const replaceTagPlaceholder = `<!-- bundle:css -->
    <!-- endinject -->`;

fs.readFile(path.join(config.webRoot, 'index.html'), 'utf8', (err, html) => {
  if (err) {
    return console.log(err);
  }

  // Replace tags
  html = html.replace(regexInjectCss, replaceTagPlaceholder);

  // Write changes to index.html file
  fs.writeFile(path.join(config.webRoot, 'index.html'), html, 'utf8', function(err) {
    if (err) {
      return console.log(err);
    }
    console.log(chalk.blue('Temp ./app.css tags removed from /www/index.html'));
  });
});