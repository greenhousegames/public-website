module.exports = function(context, key, options) {
  return options.fn(context[key]);
}
