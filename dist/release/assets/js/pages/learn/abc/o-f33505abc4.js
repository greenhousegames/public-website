!function(){"use strict";var e="undefined"==typeof global?self:global;if("function"!=typeof e.require){var t={},r={},i={},n={}.hasOwnProperty,o=/^\.\.?(\/|$)/,a=function(e,t){for(var r,i=[],n=(o.test(t)?e+"/"+t:t).split("/"),a=0,u=n.length;a<u;a++)r=n[a],".."===r?i.pop():"."!==r&&""!==r&&i.push(r);return i.join("/")},u=function(e){return e.split("/").slice(0,-1).join("/")},l=function(t){return function(r){var i=a(u(t),r);return e.require(i,t)}},c=function(e,t){var i=v&&v.createHot(e),n={id:e,exports:{},hot:i};return r[e]=n,t(n.exports,l(e),n),n.exports},f=function(e){return i[e]?f(i[e]):e},d=function(e,t){return f(a(u(e),t))},s=function(e,i){null==i&&(i="/");var o=f(e);if(n.call(r,o))return r[o].exports;if(n.call(t,o))return c(o,t[o]);throw new Error("Cannot find module '"+e+"' from '"+i+"'")};s.alias=function(e,t){i[t]=e};var p=/\.[^.\/]+$/,h=/\/index(\.[^\/]+)?$/,y=function(e){if(p.test(e)){var t=e.replace(p,"");n.call(i,t)&&i[t].replace(p,"")!==t+"/index"||(i[t]=e)}if(h.test(e)){var r=e.replace(h,"");n.call(i,r)||(i[r]=e)}};s.register=s.define=function(e,i){if(e&&"object"==typeof e)for(var o in e)n.call(e,o)&&s.register(o,e[o]);else t[e]=i,delete r[e],y(e)},s.list=function(){var e=[];for(var r in t)n.call(t,r)&&e.push(r);return e};var v=e._hmr&&new e._hmr(d,s,t,r);s._cache=r,s.hmr=v&&v.wrap,s.brunch=!0,e.require=s}}(),function(){"undefined"==typeof window?this:window;require.register("pages/learn/abc/o.js",function(e,t,r){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function n(){function e(){t.y==n.height&&(a["default"].ifBreakpoint(n,"small",function(){return t.body.velocity.y=-200}),a["default"].ifBreakpoint(n,"medium",function(){return t.body.velocity.y=-250}),a["default"].ifBreakpoint(n,"large",function(){return t.body.velocity.y=-300}))}var t=void 0,r=void 0,i=void 0,n=a["default"].init({preload:function(){a["default"].preload(n,["a"]),n.load.image("obstacle","/assets/img/learning/obstacle.png")},create:function(){a["default"].create(n),n.physics.arcade.gravity.y=200,n.physics.arcade.checkCollision.right=!1,t=n.add.sprite(0,n.height,"greenhouse-square"),t.anchor.setTo(0,1),n.physics.arcade.enable(t),a["default"].ifBreakpoint(n,"small",function(){return t.body.velocity.x=50}),a["default"].ifBreakpoint(n,"medium",function(){return t.body.velocity.x=75}),a["default"].ifBreakpoint(n,"large",function(){return t.body.velocity.x=100}),t.body.collideWorldBounds=!0,a["default"].ifBreakpoint(n,"small",function(){return i=n.add.tileSprite(n.width/2,n.height,16,32,"obstacle")}),a["default"].ifBreakpoint(n,"medium",function(){return i=n.add.tileSprite(n.width/2,n.height,16,64,"obstacle")}),a["default"].ifBreakpoint(n,"large",function(){return i=n.add.tileSprite(n.width/2,n.height,32,128,"obstacle")}),i.anchor.setTo(.5,1),n.physics.arcade.enable(i),i.body.immovable=!0,i.body.allowGravity=!1,r=n.add.button(0,0,"a-button",e),a["default"].alignButtons(n,[r])},update:function(){n.physics.arcade.collide(t,i)},render:function(){}});return n}var o=t("./utils.js"),a=i(o);r.exports=n}),require.register("___globals___",function(e,t,r){window.jQuery=t("jquery"),window.$=t("jquery")})}(),require("___globals___");