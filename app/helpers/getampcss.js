var fs = require('fs');

module.exports = function(path, options) {
  return fs.readFileSync(path).toString().replace('@charset "UTF-8";', '');
}
