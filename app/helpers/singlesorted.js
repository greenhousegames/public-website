module.exports = function(context, sortkey, key, relativeIndex, options) {
  var index;
  var keys = Object.keys(context).slice(0, context.length).sort(function(a, b) {
    return context[a][sortkey] > context[b][sortkey] ? 1 : (context[a][sortkey] < context[b][sortkey] ? -1 : 0);
  });
  index = keys.findIndex(k => k == key);
  index += relativeIndex || 0;
  return options.fn(context[keys[index]]);
}
