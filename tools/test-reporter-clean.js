const path = require('path');
const rimraf = require('rimraf');

// Cleanup
rimraf(path.join(__dirname, "../tests/reports"), function() {
  console.log('clean the test-report directory');
});