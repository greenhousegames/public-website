!function(){"use strict";var e="undefined"==typeof global?self:global;if("function"!=typeof e.require){var t={},r={},n={},i={}.hasOwnProperty,o=/^\.\.?(\/|$)/,a=function(e,t){for(var r,n=[],i=(o.test(t)?e+"/"+t:t).split("/"),a=0,l=i.length;a<l;a++)r=i[a],".."===r?n.pop():"."!==r&&""!==r&&n.push(r);return n.join("/")},l=function(e){return e.split("/").slice(0,-1).join("/")},u=function(t){return function(r){var n=a(l(t),r);return e.require(n,t)}},c=function(e,t){var n=g&&g.createHot(e),i={id:e,exports:{},hot:n};return r[e]=i,t(i.exports,u(e),i),i.exports},d=function(e){return n[e]?d(n[e]):e},f=function(e,t){return d(a(l(e),t))},s=function(e,n){null==n&&(n="/");var o=d(e);if(i.call(r,o))return r[o].exports;if(i.call(t,o))return c(o,t[o]);throw new Error("Cannot find module '"+e+"' from '"+n+"'")};s.alias=function(e,t){n[t]=e};var p=/\.[^.\/]+$/,y=/\/index(\.[^\/]+)?$/,h=function(e){if(p.test(e)){var t=e.replace(p,"");i.call(n,t)&&n[t].replace(p,"")!==t+"/index"||(n[t]=e)}if(y.test(e)){var r=e.replace(y,"");i.call(n,r)||(n[r]=e)}};s.register=s.define=function(e,n){if(e&&"object"==typeof e)for(var o in e)i.call(e,o)&&s.register(o,e[o]);else t[e]=n,delete r[e],h(e)},s.list=function(){var e=[];for(var r in t)i.call(t,r)&&e.push(r);return e};var g=e._hmr&&new e._hmr(f,s,t,r);s._cache=r,s.hmr=g&&g.wrap,s.brunch=!0,e.require=s}}(),function(){"undefined"==typeof window?this:window;require.register("pages/learn/abc/p.js",function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function i(){function e(){a["default"].ifBreakpoint(c,"small",function(){return n.body.velocity.y=-200}),a["default"].ifBreakpoint(c,"medium",function(){return n.body.velocity.y=-250}),a["default"].ifBreakpoint(c,"large",function(){return n.body.velocity.y=-300})}function t(){var e,t;if(o.getTop().y-u>0)return 1==l?(e=c.add.tileSprite(c.width,o.getTop().y-u,c.width/4-32,16,"obstacle"),e.anchor.setTo(1,0),t=c.add.tileSprite(0,o.getTop().y-u,c.width/4-32,16,"obstacle"),t.anchor.setTo(0,0),l=0):(e=c.add.tileSprite(c.width/2,o.getTop().y-u,3*c.width/8,16,"obstacle"),e.anchor.setTo(.5,0),l=1),e&&r(e),t&&r(t),!0}function r(e){c.physics.arcade.enable(e),e.body.immovable=!0,e.body.allowGravity=!1,e.body.velocity.y=25,o.add(e)}var n,i,o,l,u,c=a["default"].init("p",{preload:function(){a["default"].preload(c,["a","b","c"]),c.load.image("obstacle","/assets/img/learning/obstacle.png"),c.load.image("greenhouse-small","/assets/img/learning/logo-circle-small.png")},create:function(){a["default"].create(c),c.physics.arcade.gravity.y=200,c.physics.arcade.checkCollision.up=!1,c.physics.arcade.checkCollision.down=!1,a["default"].ifBreakpoint(c,"small",function(){return u=80}),a["default"].ifBreakpoint(c,"medium",function(){return u=130}),a["default"].ifBreakpoint(c,"large",function(){return u=180}),n=c.add.sprite(c.width/2,c.height/2,"greenhouse-small"),c.physics.arcade.enable(n),n.body.collideWorldBounds=!0,n.anchor.setTo(.5,1),n.body.bounce.x=1,a["default"].ifBreakpoint(c,"small",function(){return n.body.velocity.x=50}),a["default"].ifBreakpoint(c,"medium",function(){return n.body.velocity.x=75}),a["default"].ifBreakpoint(c,"large",function(){return n.body.velocity.x=100}),o=c.add.group();var d=c.add.tileSprite(c.width/2,c.height/2,3*c.width/8,16,"obstacle");for(d.anchor.setTo(.5,0),r(d),l=1;t(););i=c.add.button(0,0,"a-button",e),a["default"].alignButtons(c,[i])},update:function(){c.physics.arcade.collide(n,o),o.getBottom().y>c.height&&o.remove(o.getBottom(),!0),t()},render:function(){}});return c}var o=t("./utils.js"),a=n(o);r.exports=i}),require.register("___globals___",function(e,t,r){window.jQuery=t("jquery"),window.$=t("jquery")})}(),require("___globals___");