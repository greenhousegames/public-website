!function(){"use strict";var e="undefined"==typeof global?self:global;if("function"!=typeof e.require){var r={},t={},n={},i={}.hasOwnProperty,o=/^\.\.?(\/|$)/,a=function(e,r){for(var t,n=[],i=(o.test(r)?e+"/"+r:r).split("/"),a=0,s=i.length;a<s;a++)t=i[a],".."===t?n.pop():"."!==t&&""!==t&&n.push(t);return n.join("/")},s=function(e){return e.split("/").slice(0,-1).join("/")},u=function(r){return function(t){var n=a(s(r),t);return e.require(n,r)}},c=function(e,r){var n=w&&w.createHot(e),i={id:e,exports:{},hot:n};return t[e]=i,r(i.exports,u(e),i),i.exports},l=function(e){return n[e]?l(n[e]):e},f=function(e,r){return l(a(s(e),r))},g=function(e,n){null==n&&(n="/");var o=l(e);if(i.call(t,o))return t[o].exports;if(i.call(r,o))return c(o,r[o]);throw new Error("Cannot find module '"+e+"' from '"+n+"'")};g.alias=function(e,r){n[r]=e};var h=/\.[^.\/]+$/,d=/\/index(\.[^\/]+)?$/,p=function(e){if(h.test(e)){var r=e.replace(h,"");i.call(n,r)&&n[r].replace(h,"")!==r+"/index"||(n[r]=e)}if(d.test(e)){var t=e.replace(d,"");i.call(n,t)||(n[t]=e)}};g.register=g.define=function(e,n){if(e&&"object"==typeof e)for(var o in e)i.call(e,o)&&g.register(o,e[o]);else r[e]=n,delete t[e],p(e)},g.list=function(){var e=[];for(var t in r)i.call(r,t)&&e.push(t);return e};var w=e._hmr&&new e._hmr(f,g,r,t);g._cache=t,g.hmr=w&&w.wrap,g.brunch=!0,e.require=g}}(),function(){var e;"undefined"==typeof window?this:window;require.register("pages/learn/abc/utils.js",function(e,r,t){"use strict";function n(e){var r=s();return e.width!=r.width&&(e.scale.setGameSize(r.width,r.height),!0)}function i(e){e.width>1e3?e.load.image("greenhouse","/assets/img/logo-circle-large.png"):e.width>600?e.load.image("greenhouse","/assets/img/logo-circle-medium.png"):e.load.image("greenhouse","/assets/img/logo-circle-small.png"),e.load.image("reload","/assets/img/restart-game.png")}function o(e){n(e),e.physics.startSystem(Phaser.Physics.ARCADE),e.stage.backgroundColor="#000000",e.add.button(e.width-16-8,e.height-16-8,"reload",function(){return e.state.restart()}),e.scale.setResizeCallback(function(){n(e)&&e.state.restart()})}function a(e){return e.width>1e3?128:e.width>600?64:32}function s(){var e=$("#game-container").width();return{width:e,height:e/(16/9)}}function u(e){return new Phaser.Game(s().width,s().height,Phaser.AUTO,"learning-game",e)}t.exports={resize:n,preload:i,create:o,getIconWidth:a,init:u}}),require.alias("process/browser.js","process"),e=require("process"),require.register("___globals___",function(e,r,t){window.jQuery=r("jquery"),window.$=r("jquery")})}(),require("___globals___");