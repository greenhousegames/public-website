!function(){"use strict";var e="undefined"==typeof global?self:global;if("function"!=typeof e.require){var r={},n={},t={},i={}.hasOwnProperty,o=/^\.\.?(\/|$)/,u=function(e,r){for(var n,t=[],i=(o.test(r)?e+"/"+r:r).split("/"),u=0,a=i.length;u<a;u++)n=i[u],".."===n?t.pop():"."!==n&&""!==n&&t.push(n);return t.join("/")},a=function(e){return e.split("/").slice(0,-1).join("/")},s=function(r){return function(n){var t=u(a(r),n);return e.require(t,r)}},c=function(e,r){var t=v&&v.createHot(e),i={id:e,exports:{},hot:t};return n[e]=i,r(i.exports,s(e),i),i.exports},f=function(e){return t[e]?f(t[e]):e},l=function(e,r){return f(u(a(e),r))},d=function(e,t){null==t&&(t="/");var o=f(e);if(i.call(n,o))return n[o].exports;if(i.call(r,o))return c(o,r[o]);throw new Error("Cannot find module '"+e+"' from '"+t+"'")};d.alias=function(e,r){t[r]=e};var p=/\.[^.\/]+$/,h=/\/index(\.[^\/]+)?$/,_=function(e){if(p.test(e)){var r=e.replace(p,"");i.call(t,r)&&t[r].replace(p,"")!==r+"/index"||(t[r]=e)}if(h.test(e)){var n=e.replace(h,"");i.call(t,n)||(t[n]=e)}};d.register=d.define=function(e,t){if(e&&"object"==typeof e)for(var o in e)i.call(e,o)&&d.register(o,e[o]);else r[e]=t,delete n[e],_(e)},d.list=function(){var e=[];for(var n in r)i.call(r,n)&&e.push(n);return e};var v=e._hmr&&new e._hmr(l,d,r,n);d._cache=n,d.hmr=v&&v.wrap,d.brunch=!0,e.require=d}}(),function(){var e;"undefined"==typeof window?this:window;require.register("pages/learn/abc/x.js",function(e,r,n){"use strict";function t(e){return e&&e.__esModule?e:{"default":e}}function i(){var e,r,n=u["default"].init("x",{preload:function(){u["default"].preload(n)},create:function(){u["default"].create(n),e=n.add.sprite(0,n.height/2,"greenhouse"),e.anchor.setTo(0,.5),r=n.add.sprite(n.width,n.height/2,"greenhouse"),r.anchor.setTo(1,.5)},update:function(){},render:function(){}});return n}var o=r("./utils.js"),u=t(o);n.exports=i}),require.alias("process/browser.js","process"),e=require("process"),require.register("___globals___",function(e,r,n){window.jQuery=r("jquery"),window.$=r("jquery")})}(),require("___globals___");