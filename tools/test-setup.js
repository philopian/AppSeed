// Register babel to transpile before our tests run.
require('babel-register')();

// Disable Webpack-specific features that Mocha doesn't understand
require.extensions['.css'] = function() { return null; };
require.extensions['.png'] = function() { return null; };
require.extensions['.jpg'] = function() { return null; };