var fs = require('fs');

module.exports = function(path1, path2, path3, options) {
  var path = path1;
  if (path2) path += path2;
  if (path3) path += path3;
  return fs.readFileSync(path);
}
