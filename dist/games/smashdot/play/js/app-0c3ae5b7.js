!function(){"use strict";var e="undefined"==typeof window?global:window;if("function"!=typeof e.require){var r={},n={},t={},o={}.hasOwnProperty,s=/^\.\.?(\/|$)/,a=function(e,r){for(var n,t=[],o=(s.test(r)?e+"/"+r:r).split("/"),a=0,i=o.length;a<i;a++)n=o[a],".."===n?t.pop():"."!==n&&""!==n&&t.push(n);return t.join("/")},i=function(e){return e.split("/").slice(0,-1).join("/")},u=function(r){return function(n){var t=a(i(r),n);return e.require(t,r)}},c=function(e,r){var t=null;t=m&&m.createHot(e);var o={id:e,exports:{},hot:t};return n[e]=o,r(o.exports,u(e),o),o.exports},l=function(e){return t[e]?l(t[e]):e},f=function(e,r){return l(a(i(e),r))},d=function(e,t){null==t&&(t="/");var s=l(e);if(o.call(n,s))return n[s].exports;if(o.call(r,s))return c(s,r[s]);throw new Error("Cannot find module '"+e+"' from '"+t+"'")};d.alias=function(e,r){t[r]=e};var p=/\.[^.\/]+$/,g=/\/index(\.[^\/]+)?$/,h=function(e){if(p.test(e)){var r=e.replace(p,"");o.call(t,r)&&t[r].replace(p,"")!==r+"/index"||(t[r]=e)}if(g.test(e)){var n=e.replace(g,"");o.call(t,n)||(t[n]=e)}};d.register=d.define=function(e,t){if("object"==typeof e)for(var s in e)o.call(e,s)&&d.register(s,e[s]);else r[e]=t,delete n[e],h(e)},d.list=function(){var e=[];for(var n in r)o.call(r,n)&&e.push(n);return e};var m=e._hmr&&new e._hmr(f,d,r,n);d._cache=n,d.hmr=m&&m.wrap,d.brunch=!0,e.require=d}}(),function(){var e;window;require.register("app.js",function(e,r,n){"use strict";function t(e){return e&&e.__esModule?e:{"default":e}}var o=r("fastclick"),s=t(o),a=r("firebase"),i=t(a),u=r("@greenhousegames/smash-dot"),c=t(u);r("@greenhousegames/greenhouse-phaser-plugin");var l=r("./config"),f=t(l);s["default"].FastClick.attach(document.body);var d=i["default"].initializeApp(f["default"]),p=new c["default"]({firebase:d,assetPath:"game"});p.state.start("boot")}),require.register("config.js",function(e,r,n){"use strict";n.exports={apiKey:"AIzaSyDPGXl6Bc8jf_IPlkcVJe6jNlrNz72zaCo",authDomain:"greenhouse-games.firebaseapp.com",databaseURL:"https://greenhouse-games.firebaseio.com",storageBucket:"greenhouse-games.appspot.com",messagingSenderId:"832706408675"}}),require.alias("brunch/node_modules/deppack/node_modules/node-browser-modules/node_modules/path-browserify/index.js","path"),require.alias("brunch/node_modules/deppack/node_modules/node-browser-modules/node_modules/process/browser.js","process"),e=require("process"),require.register("___globals___",function(e,r,n){})}(),require("___globals___");