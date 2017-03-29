import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

/*eslint-disable no-console */

fs.readFile('www/index.html', 'utf8', (err, html) => {
  if (err) {
    return console.log(err);
  }

  var regexInjectCss = /<!-- bower:css -->([\s\S]*?)<!-- endinject -->/g;
  var regexInjectJs = /<!-- bower:js -->([\s\S]*?)<!-- endinject -->/g;
  var regexInjectBundleJs = /<!-- bundle:js -->([\s\S]*?)<!-- endinject -->/g;

  // Replace tags
  html = html.replace(regexInjectCss, '<!-- bower:css -->\n    <link rel="stylesheet" href="code/vendor.min.css">\n    <!-- endinject -->');
  html = html.replace(regexInjectJs, '<!-- bower:js -->\n    <link rel="stylesheet" type="" href="code/vendor.min.js">\n    <!-- endinject -->');
  html = html.replace(regexInjectBundleJs, '<!-- bundle:js -->\n    <!-- endinject -->');

  fs.writeFile('www/index.html', html, 'utf8', function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('index.html written to /www'.green);
  });
});