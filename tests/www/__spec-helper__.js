// Sets Node environment variable
process.env.NODE_ENV = "test";

// Registers babel for transpilling our code for testing
require('babel-register')();

// Requires jsdom so we can test via an in-memory DOM with Node
const jsdom = require('jsdom').jsdom;

// Sets up global vars that mimic a browser
const exposedProperties = ['window', 'navigator', 'document'];
global.document = jsdom();
global.window = document.defaultView;

// var $ = require('jquery')(global.window);

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});
global.navigator = {
  userAgent: 'node.js'
};