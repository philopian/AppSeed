const rimraf = require("rimraf");
const config = require("../appseed.config");
const printMessage = require("./print-message");

// Cleanup
rimraf(config.deployRoot, function() {
  printMessage("cleaned", "the ./DEPLOY directory");
});
