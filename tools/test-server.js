const config = require('../config');
const open = require("open");
const shell = require('shelljs');
const path = require('path');

console.log('..opening the browser to show test results');
const testReportDir = path.join(config.appRoot, 'tests-reports');
const liveServer = path.join(config.appRoot, 'node_modules/.bin/live-server');
const cmd = `${liveServer} ${testReportDir} --port=${config.portTests} --open`
shell.exec(cmd);