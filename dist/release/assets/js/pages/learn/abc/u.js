!function(){"use strict";var r="undefined"==typeof window?global:window;if("function"!=typeof r.require){var e={},n={},o={},t={}.hasOwnProperty,i=/^\.\.?(\/|$)/,u=function(r,e){for(var n,o=[],t=(i.test(e)?r+"/"+e:e).split("/"),u=0,s=t.length;u<s;u++)n=t[u],".."===n?o.pop():"."!==n&&""!==n&&o.push(n);return o.join("/")},s=function(r){return r.split("/").slice(0,-1).join("/")},a=function(e){return function(n){var o=u(s(e),n);return r.require(o,e)}},c=function(r,e){var o=null;o=v&&v.createHot(r);var t={id:r,exports:{},hot:o};return n[r]=t,e(t.exports,a(r),t),t.exports},l=function(r){return o[r]?l(o[r]):r},f=function(r,e){return l(u(s(r),e))},p=function(r,o){null==o&&(o="/");var i=l(r);if(t.call(n,i))return n[i].exports;if(t.call(e,i))return c(i,e[i]);throw new Error("Cannot find module '"+r+"' from '"+o+"'")};p.alias=function(r,e){o[e]=r};var d=/\.[^.\/]+$/,_=/\/index(\.[^\/]+)?$/,w=function(r){if(d.test(r)){var e=r.replace(d,"");t.call(o,e)&&o[e].replace(d,"")!==e+"/index"||(o[e]=r)}if(_.test(r)){var n=r.replace(_,"");t.call(o,n)||(o[n]=r)}};p.register=p.define=function(r,o){if("object"==typeof r)for(var i in r)t.call(r,i)&&p.register(i,r[i]);else e[r]=o,delete n[r],w(r)},p.list=function(){var r=[];for(var n in e)t.call(e,n)&&r.push(n);return r};var v=r._hmr&&new r._hmr(f,p,e,n);p._cache=n,p.hmr=v&&v.wrap,p.brunch=!0,r.require=p}}(),function(){var r;window;require.register("pages/learn/abc/u.js",function(r,e,n){"use strict"}),require.alias("brunch/node_modules/deppack/node_modules/node-browser-modules/node_modules/process/browser.js","process"),r=require("process"),require.register("___globals___",function(r,e,n){window.jQuery=e("jquery"),window.$=e("jquery")})}(),require("___globals___");