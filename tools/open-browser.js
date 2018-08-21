import config from "../appseed.config";
const open = require("open");
const printMessage = require("./print-message");

printMessage("opening", "your default browser");

// Open the browser to view the build
setTimeout(() => {
  open("http://localhost:" + config.port);
}, 2000);
