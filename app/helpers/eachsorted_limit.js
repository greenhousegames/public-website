module.exports = function(context, sortkey, start, limit, options) {
  var ret = "";

  var keys = Object.keys(context).slice(0, context.length).sort(function(a, b) {
      return context[a][sortkey] > context[b][sortkey] ? 1 : (context[a][sortkey] < context[b][sortkey] ? -1 : 0);
  });
  var end = Math.min(start + limit, keys.length);
  for(var i=start; i<end; i++) {
    ret = ret + options.fn(context[keys[i]]);
  }

  return ret;
}
