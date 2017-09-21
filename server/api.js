const fs = require('fs');
const path = require('path');
const config = require('../config');

module.exports = {
  test: (req, res) => {
    console.log('.....server is up!');
    res.status(200).json({ "test": "works!!" });
  },

  testJsonApi: (req, res) => {
    const filepath = path.join(config.serverRoot, 'data/test.json');
    var file = fs.readFileSync(filepath, 'utf-8');
    res.status(200).json(JSON.parse(file));
  },

  routeDoesNotExist: (req, res) => {
    res.json({ "route": "does not exist!!!!!" });
  }
};