!function(){"use strict";var e="undefined"==typeof global?self:global;if("function"!=typeof e.require){var t={},n={},r={},i={}.hasOwnProperty,u=/^\.\.?(\/|$)/,o=function(e,t){for(var n,r=[],i=(u.test(t)?e+"/"+t:t).split("/"),o=0,a=i.length;o<a;o++)n=i[o],".."===n?r.pop():"."!==n&&""!==n&&r.push(n);return r.join("/")},a=function(e){return e.split("/").slice(0,-1).join("/")},l=function(t){return function(n){var r=o(a(t),n);return e.require(r,t)}},f=function(e,t){var r=g&&g.createHot(e),i={id:e,exports:{},hot:r};return n[e]=i,t(i.exports,l(e),i),i.exports},c=function(e){return r[e]?c(r[e]):e},s=function(e,t){return c(o(a(e),t))},d=function(e,r){null==r&&(r="/");var u=c(e);if(i.call(n,u))return n[u].exports;if(i.call(t,u))return f(u,t[u]);throw new Error("Cannot find module '"+e+"' from '"+r+"'")};d.alias=function(e,t){r[t]=e};var h=/\.[^.\/]+$/,v=/\/index(\.[^\/]+)?$/,p=function(e){if(h.test(e)){var t=e.replace(h,"");i.call(r,t)&&r[t].replace(h,"")!==t+"/index"||(r[t]=e)}if(v.test(e)){var n=e.replace(v,"");i.call(r,n)||(r[n]=e)}};d.register=d.define=function(e,r){if(e&&"object"==typeof e)for(var u in e)i.call(e,u)&&d.register(u,e[u]);else t[e]=r,delete n[e],p(e)},d.list=function(){var e=[];for(var n in t)i.call(t,n)&&e.push(n);return e};var g=e._hmr&&new e._hmr(s,d,t,n);d._cache=n,d.hmr=g&&g.wrap,d.brunch=!0,e.require=d}}(),function(){"undefined"==typeof window?this:window;require.register("pages/learn/abc/l.js",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(){var e=void 0,t=void 0,n=void 0,r=o["default"].init("l",{preload:function(){o["default"].preload(r,["a","b"])},create:function(){o["default"].create(r),e=r.add.sprite(r.width/2,r.height/2,"greenhouse"),e.anchor.setTo(.5,.5),e.health=100,e.lives=3,t=r.add.button(0,0,"a-button",function(){e.health>0&&(e.health-=10,0==e.health&&(e.kill(),e.lives--))}),n=r.add.button(0,0,"b-button",function(){return e.lives++}),o["default"].alignButtons(r,[t,n])},update:function(){!e.alive&&e.lives>0&&(e.health=100,e.x=r.rnd.integerInRange(0,r.width),e.y=r.rnd.integerInRange(0,r.height),e.revive())},render:function(){r.debug.text("Lives: "+e.lives,32,32),r.debug.text("Health: "+e.health+" / 100",32,48)}});return r}var u=t("./utils.js"),o=r(u);n.exports=i}),require.register("___globals___",function(e,t,n){window.jQuery=t("jquery"),window.$=t("jquery")})}(),require("___globals___");