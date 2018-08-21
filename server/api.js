const fs = require("fs");
const path = require("path");
const config = require("../appseed.config.js");

module.exports = {
  test: (req, res) => {
    res.status(200).json({ localServer: "works!" });
  },

  routeDoesNotExist: (req, res) => {
    res.json({ route: "does not exist!" });
  }
};
