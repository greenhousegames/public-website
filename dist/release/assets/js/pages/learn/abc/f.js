!function(){"use strict";var e="undefined"==typeof window?global:window;if("function"!=typeof e.require){var r={},t={},n={},i={}.hasOwnProperty,o=/^\.\.?(\/|$)/,a=function(e,r){for(var t,n=[],i=(o.test(r)?e+"/"+r:r).split("/"),a=0,s=i.length;a<s;a++)t=i[a],".."===t?n.pop():"."!==t&&""!==t&&n.push(t);return n.join("/")},s=function(e){return e.split("/").slice(0,-1).join("/")},u=function(r){return function(t){var n=a(s(r),t);return e.require(n,r)}},l=function(e,r){var n=null;n=w&&w.createHot(e);var i={id:e,exports:{},hot:n};return t[e]=i,r(i.exports,u(e),i),i.exports},c=function(e){return n[e]?c(n[e]):e},d=function(e,r){return c(a(s(e),r))},f=function(e,n){null==n&&(n="/");var o=c(e);if(i.call(t,o))return t[o].exports;if(i.call(r,o))return l(o,r[o]);throw new Error("Cannot find module '"+e+"' from '"+n+"'")};f.alias=function(e,r){n[r]=e};var h=/\.[^.\/]+$/,p=/\/index(\.[^\/]+)?$/,g=function(e){if(h.test(e)){var r=e.replace(h,"");i.call(n,r)&&n[r].replace(h,"")!==r+"/index"||(n[r]=e)}if(p.test(e)){var t=e.replace(p,"");i.call(n,t)||(n[t]=e)}};f.register=f.define=function(e,n){if("object"==typeof e)for(var o in e)i.call(e,o)&&f.register(o,e[o]);else r[e]=n,delete t[e],g(e)},f.list=function(){var e=[];for(var t in r)i.call(r,t)&&e.push(t);return e};var w=e._hmr&&new e._hmr(d,f,r,t);f._cache=t,f.hmr=w&&w.wrap,f.brunch=!0,e.require=f}}(),function(){var e;window;require.register("pages/learn/abc/f.js",function(e,r,t){"use strict";var n,i,o,a=Math.min($("#game-container").width(),600),s=new Phaser.Game(a,a/(16/9),Phaser.AUTO,"learning-game",{preload:function(){s.load.image("greenhouse","/assets/img/logo-circle-large.png"),s.load.script("filter","https://cdn.rawgit.com/photonstorm/phaser/master/filters/Marble.js")},create:function(){s.physics.startSystem(Phaser.Physics.ARCADE),s.stage.backgroundColor="#000000",n=s.add.sprite(s.width/2,s.height/2,"greenhouse"),n.anchor.setTo(.5,.5),s.physics.enable(n,Phaser.Physics.ARCADE),n.body.allowRotation=!1,i=s.add.filter("Marble",s.width,s.height),i.alpha=.1,o=s.add.sprite(0,0),o.width=s.width,o.height=s.height,o.filters=[i]},update:function(){i.update()},render:function(){}})}),require.alias("brunch/node_modules/deppack/node_modules/node-browser-modules/node_modules/process/browser.js","process"),e=require("process"),require.register("___globals___",function(e,r,t){window.jQuery=r("jquery"),window.$=r("jquery")})}(),require("___globals___");