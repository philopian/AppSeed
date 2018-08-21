const chalk = require("chalk");

module.exports = function printMessage(type, message) {
  const typeText = chalk.bgBlue.black(` ${type.toUpperCase()} `);
  const messageText = chalk.blue(message);
  console.log(`${typeText} ${messageText}`);
};
