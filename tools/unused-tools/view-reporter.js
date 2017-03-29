const path = require('path');
const open = require("open");
const rimraf = require('rimraf');
const files = {
  json: path.join(__dirname, "../tests/reports/frontend-tests-report.json"),
  assets: path.join(__dirname, "../tests/reports/assets")
};

// Cleanup
rimraf(files.json, function() { console.log('removed temp mocha-awesome json'); });
rimraf(files.assets, function() { console.log('removed temp mocha-awesome assets!'); });

// Open the browser with the test
// open(path.join(__dirname, "../tests/reports/frontend-tests-report.html"));