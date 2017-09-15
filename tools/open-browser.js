import config from '../config';
const open = require("open");

console.log('..opening the browser');

// Open the browser to view the build
setTimeout(() => {
  open('http://localhost:3001');
  open('http://localhost:' + config.port);
}, 3000);