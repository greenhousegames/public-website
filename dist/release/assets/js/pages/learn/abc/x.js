!function(){"use strict";var e="undefined"==typeof window?global:window;if("function"!=typeof e.require){var r={},n={},t={},i={}.hasOwnProperty,o=/^\.\.?(\/|$)/,a=function(e,r){for(var n,t=[],i=(o.test(r)?e+"/"+r:r).split("/"),a=0,u=i.length;a<u;a++)n=i[a],".."===n?t.pop():"."!==n&&""!==n&&t.push(n);return t.join("/")},u=function(e){return e.split("/").slice(0,-1).join("/")},c=function(r){return function(n){var t=a(u(r),n);return e.require(t,r)}},s=function(e,r){var t=null;t=w&&w.createHot(e);var i={id:e,exports:{},hot:t};return n[e]=i,r(i.exports,c(e),i),i.exports},l=function(e){return t[e]?l(t[e]):e},f=function(e,r){return l(a(u(e),r))},p=function(e,t){null==t&&(t="/");var o=l(e);if(i.call(n,o))return n[o].exports;if(i.call(r,o))return s(o,r[o]);throw new Error("Cannot find module '"+e+"' from '"+t+"'")};p.alias=function(e,r){t[r]=e};var d=/\.[^.\/]+$/,g=/\/index(\.[^\/]+)?$/,h=function(e){if(d.test(e)){var r=e.replace(d,"");i.call(t,r)&&t[r].replace(d,"")!==r+"/index"||(t[r]=e)}if(g.test(e)){var n=e.replace(g,"");i.call(t,n)||(t[n]=e)}};p.register=p.define=function(e,t){if("object"==typeof e)for(var o in e)i.call(e,o)&&p.register(o,e[o]);else r[e]=t,delete n[e],h(e)},p.list=function(){var e=[];for(var n in r)i.call(r,n)&&e.push(n);return e};var w=e._hmr&&new e._hmr(f,p,r,n);p._cache=n,p.hmr=w&&w.wrap,p.brunch=!0,e.require=p}}(),function(){var e;window;require.register("pages/learn/abc/x.js",function(e,r,n){"use strict";var t,i=Math.min($("#game-container").width(),600),o=new Phaser.Game(i,i/(16/9),Phaser.AUTO,"learning-game",{preload:function(){o.load.image("greenhouse","/assets/img/logo-circle.png")},create:function(){o.stage.backgroundColor="#000000",t=o.add.sprite(o.width/2,o.height/2,"greenhouse"),t.anchor.setTo(.5,.5)},update:function(){},render:function(){}})}),require.alias("process/browser.js","process"),e=require("process"),require.register("___globals___",function(e,r,n){window.jQuery=r("jquery"),window.$=r("jquery")})}(),require("___globals___");