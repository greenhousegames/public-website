module.exports = function(context, sortkey, options) {
  var ret = "";

  var keys = Object.keys(context).slice(0, context.length).sort(function(a, b) {
      return context[a][sortkey] > context[b][sortkey] ? 1 : (context[a][sortkey] < context[b][sortkey] ? -1 : 0);
  });
  for(var i=0; i<keys.length; i++) {
    ret = ret + options.fn(context[keys[i]]);
  }

  return ret;
}
