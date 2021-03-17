const compiler = require("./modules/compiler");
const pjson = require("../package.json");

module.exports = {
  compile: compiler.compile,
  version: pjson.version,
};
