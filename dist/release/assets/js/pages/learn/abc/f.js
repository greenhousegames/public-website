!function(){"use strict";var e="undefined"==typeof window?global:window;if("function"!=typeof e.require){var r={},t={},n={},i={}.hasOwnProperty,a=/^\.\.?(\/|$)/,o=function(e,r){for(var t,n=[],i=(a.test(r)?e+"/"+r:r).split("/"),o=0,s=i.length;o<s;o++)t=i[o],".."===t?n.pop():"."!==t&&""!==t&&n.push(t);return n.join("/")},s=function(e){return e.split("/").slice(0,-1).join("/")},u=function(r){return function(t){var n=o(s(r),t);return e.require(n,r)}},c=function(e,r){var n=null;n=w&&w.createHot(e);var i={id:e,exports:{},hot:n};return t[e]=i,r(i.exports,u(e),i),i.exports},l=function(e){return n[e]?l(n[e]):e},f=function(e,r){return l(o(s(e),r))},h=function(e,n){null==n&&(n="/");var a=l(e);if(i.call(t,a))return t[a].exports;if(i.call(r,a))return c(a,r[a]);throw new Error("Cannot find module '"+e+"' from '"+n+"'")};h.alias=function(e,r){n[r]=e};var p=/\.[^.\/]+$/,d=/\/index(\.[^\/]+)?$/,g=function(e){if(p.test(e)){var r=e.replace(p,"");i.call(n,r)&&n[r].replace(p,"")!==r+"/index"||(n[r]=e)}if(d.test(e)){var t=e.replace(d,"");i.call(n,t)||(n[t]=e)}};h.register=h.define=function(e,n){if("object"==typeof e)for(var a in e)i.call(e,a)&&h.register(a,e[a]);else r[e]=n,delete t[e],g(e)},h.list=function(){var e=[];for(var t in r)i.call(r,t)&&e.push(t);return e};var w=e._hmr&&new e._hmr(f,h,r,t);h._cache=t,h.hmr=w&&w.wrap,h.brunch=!0,e.require=h}}(),function(){var e;window;require.register("pages/learn/abc/f.js",function(e,r,t){"use strict";var n,i,a,o=Math.min($("#game-container").width(),600),s=new Phaser.Game(o,o/(16/9),Phaser.AUTO,"learning-game",{preload:function(){s.load.image("greenhouse","/assets/img/logo-circle-large.png"),s.load.script("filter","https://cdn.rawgit.com/photonstorm/phaser/master/filters/Marble.js")},create:function(){s.physics.startSystem(Phaser.Physics.ARCADE),s.stage.backgroundColor="#000000",n=s.add.sprite(s.width/2,s.height/2,"greenhouse"),n.anchor.setTo(.5,.5),s.physics.enable(n,Phaser.Physics.ARCADE),n.body.allowRotation=!1,i=s.add.filter("Marble",s.width,s.height),i.alpha=.1,a=s.add.sprite(0,0),a.width=s.width,a.height=s.height,a.filters=[i]},update:function(){i.update()},render:function(){}})}),require.alias("process/browser.js","process"),e=require("process"),require.register("___globals___",function(e,r,t){window.jQuery=r("jquery"),window.$=r("jquery")})}(),require("___globals___");