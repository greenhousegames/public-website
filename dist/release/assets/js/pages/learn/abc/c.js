!function(){"use strict";var e="undefined"==typeof global?self:global;if("function"!=typeof e.require){var r={},t={},i={},n={}.hasOwnProperty,o=/^\.\.?(\/|$)/,c=function(e,r){for(var t,i=[],n=(o.test(r)?e+"/"+r:r).split("/"),c=0,s=n.length;c<s;c++)t=n[c],".."===t?i.pop():"."!==t&&""!==t&&i.push(t);return i.join("/")},s=function(e){return e.split("/").slice(0,-1).join("/")},a=function(r){return function(t){var i=c(s(r),t);return e.require(i,r)}},u=function(e,r){var i=v&&v.createHot(e),n={id:e,exports:{},hot:i};return t[e]=n,r(n.exports,a(e),n),n.exports},l=function(e){return i[e]?l(i[e]):e},d=function(e,r){return l(c(s(e),r))},f=function(e,i){null==i&&(i="/");var o=l(e);if(n.call(t,o))return t[o].exports;if(n.call(r,o))return u(o,r[o]);throw new Error("Cannot find module '"+e+"' from '"+i+"'")};f.alias=function(e,r){i[r]=e};var p=/\.[^.\/]+$/,h=/\/index(\.[^\/]+)?$/,y=function(e){if(p.test(e)){var r=e.replace(p,"");n.call(i,r)&&i[r].replace(p,"")!==r+"/index"||(i[r]=e)}if(h.test(e)){var t=e.replace(h,"");n.call(i,t)||(i[t]=e)}};f.register=f.define=function(e,i){if(e&&"object"==typeof e)for(var o in e)n.call(e,o)&&f.register(o,e[o]);else r[e]=i,delete t[e],y(e)},f.list=function(){var e=[];for(var t in r)n.call(r,t)&&e.push(t);return e};var v=e._hmr&&new e._hmr(d,f,r,t);f._cache=t,f.hmr=v&&v.wrap,f.brunch=!0,e.require=f}}(),function(){var e;"undefined"==typeof window?this:window;require.register("pages/learn/abc/c.js",function(e,r,t){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function n(e,r){e.anchor.setTo(.5,.5),r.physics.enable(e,Phaser.Physics.ARCADE),e.body.bounce.set(1),e.body.collideWorldBounds=!0,e.body.setCircle(l["default"].getIconWidth(r)/2)}var o,c,s,a,u=r("./utils.js"),l=i(u),d=l["default"].init({preload:function(){l["default"].preload(d)},create:function(){l["default"].create(d),o=d.add.sprite(0,0,"greenhouse"),n(o,d),o.body.velocity.set(150),c=d.add.sprite(0,d.height/2,"greenhouse"),n(c,d),c.body.velocity.set(100),s=d.add.sprite(d.width,d.height/2,"greenhouse"),n(s,d),s.body.velocity.set(100),a=d.add.sprite(d.width,d.height,"greenhouse"),n(a,d),a.body.velocity.set(150)},update:function(){d.physics.arcade.collide(o,c),d.physics.arcade.collide(o,s),d.physics.arcade.collide(o,a),d.physics.arcade.collide(c,s),d.physics.arcade.collide(c,a),d.physics.arcade.collide(s,a)},render:function(){}})}),require.alias("process/browser.js","process"),e=require("process"),require.register("___globals___",function(e,r,t){window.jQuery=r("jquery"),window.$=r("jquery")})}(),require("___globals___");