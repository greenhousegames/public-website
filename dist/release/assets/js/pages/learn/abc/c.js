!function(){"use strict";var e="undefined"==typeof global?self:global;if("function"!=typeof e.require){var r={},t={},n={},i={}.hasOwnProperty,o=/^\.\.?(\/|$)/,u=function(e,r){for(var t,n=[],i=(o.test(r)?e+"/"+r:r).split("/"),u=0,c=i.length;u<c;u++)t=i[u],".."===t?n.pop():"."!==t&&""!==t&&n.push(t);return n.join("/")},c=function(e){return e.split("/").slice(0,-1).join("/")},a=function(r){return function(t){var n=u(c(r),t);return e.require(n,r)}},l=function(e,r){var n=g&&g.createHot(e),i={id:e,exports:{},hot:n};return t[e]=i,r(i.exports,a(e),i),i.exports},s=function(e){return n[e]?s(n[e]):e},d=function(e,r){return s(u(c(e),r))},f=function(e,n){null==n&&(n="/");var o=s(e);if(i.call(t,o))return t[o].exports;if(i.call(r,o))return l(o,r[o]);throw new Error("Cannot find module '"+e+"' from '"+n+"'")};f.alias=function(e,r){n[r]=e};var h=/\.[^.\/]+$/,p=/\/index(\.[^\/]+)?$/,y=function(e){if(h.test(e)){var r=e.replace(h,"");i.call(n,r)&&n[r].replace(h,"")!==r+"/index"||(n[r]=e)}if(p.test(e)){var t=e.replace(p,"");i.call(n,t)||(n[t]=e)}};f.register=f.define=function(e,n){if(e&&"object"==typeof e)for(var o in e)i.call(e,o)&&f.register(o,e[o]);else r[e]=n,delete t[e],y(e)},f.list=function(){var e=[];for(var t in r)i.call(r,t)&&e.push(t);return e};var g=e._hmr&&new e._hmr(d,f,r,t);f._cache=t,f.hmr=g&&g.wrap,f.brunch=!0,e.require=f}}(),function(){"undefined"==typeof window?this:window;require.register("pages/learn/abc/c.js",function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function i(){var e,r,t,n,i=c["default"].init("c",{preload:function(){c["default"].preload(i)},create:function(){c["default"].create(i),e=i.add.sprite(0,i.height/4,"greenhouse"),o(e,i),e.body.velocity.x=100,r=i.add.sprite(i.width,i.height/4,"greenhouse"),o(r,i),r.body.velocity.x=-100,t=i.add.sprite(0,3*i.height/4,"greenhouse"),o(t,i),t.body.velocity.x=100,n=i.add.sprite(i.width,3*i.height/4,"greenhouse"),o(n,i),n.body.velocity.x=-100},update:function(){i.physics.arcade.collide(e,r)}});return i}function o(e,r){e.anchor.setTo(.5,.5),r.physics.enable(e,Phaser.Physics.ARCADE),e.body.bounce.set(1),e.body.collideWorldBounds=!0,e.body.setCircle(c["default"].getIconWidth(r)/2)}var u=r("./utils.js"),c=n(u);t.exports=i}),require.register("___globals___",function(e,r,t){window.jQuery=r("jquery"),window.$=r("jquery")})}(),require("___globals___");