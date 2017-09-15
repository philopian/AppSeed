const path = require('path');
const fs = require('fs');
const config = require('../config');

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Document</title></head><body>No Tests Yet!</body></html>';
const reporterDir = `${config.appRoot}/tests-reports`;
const reporterHtmlFile = `${config.appRoot}/tests-reports/index.html`;

// Because we are igonring ./tests-reports we need to make one for the first time
if (!fs.existsSync(reporterHtmlFile)) {
  fs.mkdirSync(reporterDir);
  fs.writeFile(reporterHtmlFile, html, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}