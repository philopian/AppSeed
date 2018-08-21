const babel = require("babel-core");
const jestPreset = require("babel-preset-jest");

module.exports = {
  process: function(src) {
    const transformCfg = {
      presets: ["react", "env", "stage-0", jestPreset],
      retainLines: true
    };
    return babel.transform(src, transformCfg).code;
  }
};
