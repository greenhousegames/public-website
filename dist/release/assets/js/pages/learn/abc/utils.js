!function(){"use strict";var e="undefined"==typeof global?self:global;if("function"!=typeof e.require){var r={},t={},n={},i={}.hasOwnProperty,a=/^\.\.?(\/|$)/,o=function(e,r){for(var t,n=[],i=(a.test(r)?e+"/"+r:r).split("/"),o=0,s=i.length;o<s;o++)t=i[o],".."===t?n.pop():"."!==t&&""!==t&&n.push(t);return n.join("/")},s=function(e){return e.split("/").slice(0,-1).join("/")},u=function(r){return function(t){var n=o(s(r),t);return e.require(n,r)}},l=function(e,r){var n=p&&p.createHot(e),i={id:e,exports:{},hot:n};return t[e]=i,r(i.exports,u(e),i),i.exports},c=function(e){return n[e]?c(n[e]):e},g=function(e,r){return c(o(s(e),r))},d=function(e,n){null==n&&(n="/");var a=c(e);if(i.call(t,a))return t[a].exports;if(i.call(r,a))return l(a,r[a]);throw new Error("Cannot find module '"+e+"' from '"+n+"'")};d.alias=function(e,r){n[r]=e};var f=/\.[^.\/]+$/,h=/\/index(\.[^\/]+)?$/,m=function(e){if(f.test(e)){var r=e.replace(f,"");i.call(n,r)&&n[r].replace(f,"")!==r+"/index"||(n[r]=e)}if(h.test(e)){var t=e.replace(h,"");i.call(n,t)||(n[t]=e)}};d.register=d.define=function(e,n){if(e&&"object"==typeof e)for(var a in e)i.call(e,a)&&d.register(a,e[a]);else r[e]=n,delete t[e],m(e)},d.list=function(){var e=[];for(var t in r)i.call(r,t)&&e.push(t);return e};var p=e._hmr&&new e._hmr(g,d,r,t);d._cache=t,d.hmr=p&&p.wrap,d.brunch=!0,e.require=d}}(),function(){"undefined"==typeof window?this:window;require.register("pages/learn/abc/utils.js",function(e,r,t){"use strict";function n(e){var r=u(e.containerId);return e.width!=r.width&&(e.scale.setGameSize(r.width,r.height),!0)}function i(e){e.width>1e3?(e.load.image("greenhouse","/assets/img/logo-circle-large.png"),e.load.image("greenhouse-square","/assets/img/logo-square-large.png")):e.width>600?(e.load.image("greenhouse","/assets/img/logo-circle-medium.png"),e.load.image("greenhouse-square","/assets/img/logo-square-medium.png")):(e.load.image("greenhouse","/assets/img/logo-circle-small.png"),e.load.image("greenhouse-square","/assets/img/logo-square-small.png")),e.load.image("reload","/assets/img/restart-game.png")}function a(e){n(e),e.physics.startSystem(Phaser.Physics.ARCADE),e.stage.backgroundColor="#000000",e.add.button(e.width-16-8,e.height-16-8,"reload",function(){return e.state.restart()}),e.scale.setResizeCallback(function(){n(e)&&e.state.restart()})}function o(e){return e.width>1e3?128:e.width>600?64:32}function s(e){return e.width>1e3?"large":e.width>600?"medium":"small"}function u(e){var r=$("#"+e).width();return{width:r,height:r/(16/9)}}function l(e,r){var t="learning-game-"+e+"-container",n=new Phaser.Game(u(t).width,u(t).height,Phaser.AUTO,"learning-game-"+e,r);return n.containerId=t,n}t.exports={resize:n,preload:i,create:a,getIconWidth:o,init:l,getBreakpoint:s}}),require.register("___globals___",function(e,r,t){window.jQuery=r("jquery"),window.$=r("jquery")})}(),require("___globals___");