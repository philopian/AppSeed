import fs from 'fs';
import path from 'path';
import config from '../config';

module.exports = {

  test: (req, res) => {
    console.log('.....server is up!');
    res.status(200).json({ "test": "works!!" });
  },

  testJsonApi: (req, res) => {
    const filepath = path.join(config.appRoot, 'api/test.json');
    var file = fs.readFileSync(filepath, 'utf-8');
    res.status(200).json(JSON.parse(file));
  },

};