!function(){"use strict";var e="undefined"==typeof window?global:window;if("function"!=typeof e.require){var r={},n={},o={},t={}.hasOwnProperty,i=/^\.\.?(\/|$)/,u=function(e,r){for(var n,o=[],t=(i.test(r)?e+"/"+r:r).split("/"),u=0,a=t.length;u<a;u++)n=t[u],".."===n?o.pop():"."!==n&&""!==n&&o.push(n);return o.join("/")},a=function(e){return e.split("/").slice(0,-1).join("/")},s=function(r){return function(n){var o=u(a(r),n);return e.require(o,r)}},c=function(e,r){var o=null;o=w&&w.createHot(e);var t={id:e,exports:{},hot:o};return n[e]=t,r(t.exports,s(e),t),t.exports},l=function(e){return o[e]?l(o[e]):e},f=function(e,r){return l(u(a(e),r))},d=function(e,o){null==o&&(o="/");var i=l(e);if(t.call(n,i))return n[i].exports;if(t.call(r,i))return c(i,r[i]);throw new Error("Cannot find module '"+e+"' from '"+o+"'")};d.alias=function(e,r){o[r]=e};var p=/\.[^.\/]+$/,h=/\/index(\.[^\/]+)?$/,g=function(e){if(p.test(e)){var r=e.replace(p,"");t.call(o,r)&&o[r].replace(p,"")!==r+"/index"||(o[r]=e)}if(h.test(e)){var n=e.replace(h,"");t.call(o,n)||(o[n]=e)}};d.register=d.define=function(e,o){if("object"==typeof e)for(var i in e)t.call(e,i)&&d.register(i,e[i]);else r[e]=o,delete n[e],g(e)},d.list=function(){var e=[];for(var n in r)t.call(r,n)&&e.push(n);return e};var w=e._hmr&&new e._hmr(f,d,r,n);d._cache=n,d.hmr=w&&w.wrap,d.brunch=!0,e.require=d}}(),function(){var e;window;require.register("pages/learn/abc/x.js",function(e,r,n){"use strict";var o,t=Math.min($("#game-container").width(),600),i=new Phaser.Game(t,t/(16/9),Phaser.AUTO,"learning-game",{preload:function(){i.load.image("greenhouse","/assets/img/logo-circle.png")},create:function(){i.stage.backgroundColor="#000000",o=i.add.sprite(i.width/2,i.height/2,"greenhouse"),o.anchor.setTo(.5,.5)},update:function(){},render:function(){}})}),require.alias("brunch/node_modules/deppack/node_modules/node-browser-modules/node_modules/process/browser.js","process"),e=require("process"),require.register("___globals___",function(e,r,n){window.jQuery=r("jquery"),window.$=r("jquery")})}(),require("___globals___");