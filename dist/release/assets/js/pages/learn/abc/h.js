!function(){"use strict";var e="undefined"==typeof global?self:global;if("function"!=typeof e.require){var r={},n={},t={},i={}.hasOwnProperty,o=/^\.\.?(\/|$)/,u=function(e,r){for(var n,t=[],i=(o.test(r)?e+"/"+r:r).split("/"),u=0,a=i.length;u<a;u++)n=i[u],".."===n?t.pop():"."!==n&&""!==n&&t.push(n);return t.join("/")},a=function(e){return e.split("/").slice(0,-1).join("/")},c=function(r){return function(n){var t=u(a(r),n);return e.require(t,r)}},f=function(e,r){var t=v&&v.createHot(e),i={id:e,exports:{},hot:t};return n[e]=i,r(i.exports,c(e),i),i.exports},s=function(e){return t[e]?s(t[e]):e},l=function(e,r){return s(u(a(e),r))},p=function(e,t){null==t&&(t="/");var o=s(e);if(i.call(n,o))return n[o].exports;if(i.call(r,o))return f(o,r[o]);throw new Error("Cannot find module '"+e+"' from '"+t+"'")};p.alias=function(e,r){t[r]=e};var d=/\.[^.\/]+$/,h=/\/index(\.[^\/]+)?$/,_=function(e){if(d.test(e)){var r=e.replace(d,"");i.call(t,r)&&t[r].replace(d,"")!==r+"/index"||(t[r]=e)}if(h.test(e)){var n=e.replace(h,"");i.call(t,n)||(t[n]=e)}};p.register=p.define=function(e,t){if(e&&"object"==typeof e)for(var o in e)i.call(e,o)&&p.register(o,e[o]);else r[e]=t,delete n[e],_(e)},p.list=function(){var e=[];for(var n in r)i.call(r,n)&&e.push(n);return e};var v=e._hmr&&new e._hmr(l,p,r,n);p._cache=n,p.hmr=v&&v.wrap,p.brunch=!0,e.require=p}}(),function(){var e;"undefined"==typeof window?this:window;require.register("pages/learn/abc/h.js",function(e,r,n){"use strict";function t(e){return e&&e.__esModule?e:{"default":e}}function i(){var e,r=u["default"].init("h",{preload:function(){u["default"].preload(r)},create:function(){u["default"].create(r),e=r.add.sprite(r.width/2,r.height/2,"greenhouse"),e.anchor.setTo(.5,.5)},update:function(){},render:function(){}});return r}var o=r("./utils.js"),u=t(o);n.exports=i}),require.alias("process/browser.js","process"),e=require("process"),require.register("___globals___",function(e,r,n){window.jQuery=r("jquery"),window.$=r("jquery")})}(),require("___globals___");