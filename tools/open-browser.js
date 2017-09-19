import config from '../config';
const open = require("open");

console.log('..opening the browser');

// Open the browser to view the build
open('http://localhost:' + config.portStorybook);
open('http://localhost:' + config.portTests);
open('http://localhost:' + config.port);