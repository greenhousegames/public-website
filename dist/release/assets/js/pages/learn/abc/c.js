!function(){"use strict";var e="undefined"==typeof window?global:window;if("function"!=typeof e.require){var r={},n={},i={},o={}.hasOwnProperty,t=/^\.\.?(\/|$)/,s=function(e,r){for(var n,i=[],o=(t.test(r)?e+"/"+r:r).split("/"),s=0,a=o.length;s<a;s++)n=o[s],".."===n?i.pop():"."!==n&&""!==n&&i.push(n);return i.join("/")},a=function(e){return e.split("/").slice(0,-1).join("/")},c=function(r){return function(n){var i=s(a(r),n);return e.require(i,r)}},u=function(e,r){var i=null;i=w&&w.createHot(e);var o={id:e,exports:{},hot:i};return n[e]=o,r(o.exports,c(e),o),o.exports},l=function(e){return i[e]?l(i[e]):e},d=function(e,r){return l(s(a(e),r))},f=function(e,i){null==i&&(i="/");var t=l(e);if(o.call(n,t))return n[t].exports;if(o.call(r,t))return u(t,r[t]);throw new Error("Cannot find module '"+e+"' from '"+i+"'")};f.alias=function(e,r){i[r]=e};var h=/\.[^.\/]+$/,p=/\/index(\.[^\/]+)?$/,g=function(e){if(h.test(e)){var r=e.replace(h,"");o.call(i,r)&&i[r].replace(h,"")!==r+"/index"||(i[r]=e)}if(p.test(e)){var n=e.replace(p,"");o.call(i,n)||(i[n]=e)}};f.register=f.define=function(e,i){if("object"==typeof e)for(var t in e)o.call(e,t)&&f.register(t,e[t]);else r[e]=i,delete n[e],g(e)},f.list=function(){var e=[];for(var n in r)o.call(r,n)&&e.push(n);return e};var w=e._hmr&&new e._hmr(d,f,r,n);f._cache=n,f.hmr=w&&w.wrap,f.brunch=!0,e.require=f}}(),function(){var e;window;require.register("pages/learn/abc/c.js",function(e,r,n){"use strict";var i,o,t=Math.min($("#game-container").width(),600),s=new Phaser.Game(t,t/(16/9),Phaser.AUTO,"learning-game",{preload:function(){s.load.image("greenhouse","/assets/img/logo-circle.png")},create:function(){s.physics.startSystem(Phaser.Physics.ARCADE),s.stage.backgroundColor="#000000",i=s.add.sprite(0,s.height/2,"greenhouse"),i.anchor.setTo(.5,.5),s.physics.enable(i,Phaser.Physics.ARCADE),i.body.velocity.x=100,o=s.add.sprite(s.width,s.height/2,"greenhouse"),o.anchor.setTo(.5,.5),s.physics.enable(o,Phaser.Physics.ARCADE),o.body.velocity.x=-100},update:function(){s.physics.arcade.collide(i,o)},render:function(){}})}),require.alias("brunch/node_modules/deppack/node_modules/node-browser-modules/node_modules/process/browser.js","process"),e=require("process"),require.register("___globals___",function(e,r,n){window.jQuery=r("jquery"),window.$=r("jquery")})}(),require("___globals___");