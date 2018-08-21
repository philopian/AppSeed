process.env.BABEL_ENV = "test";
process.env.NODE_ENV = "test";
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());

// Run Jest on the application files (./www/* & ./server/*)
const jest = require("jest");
let jestConfig = require("./config");
jestConfig.roots = [appDirectory];
const jestCommand = [
  "--env=jsdom",
  "--coverage",
  "--config",
  JSON.stringify(jestConfig)
];
jest.run(jestCommand);