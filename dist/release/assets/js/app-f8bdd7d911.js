!function(){"use strict";var e="undefined"==typeof global?self:global;if("function"!=typeof e.require){var t={},n={},r={},u={}.hasOwnProperty,i=/^\.\.?(\/|$)/,o=function(e,t){for(var n,r=[],u=(i.test(t)?e+"/"+t:t).split("/"),o=0,a=u.length;o<a;o++)n=u[o],".."===n?r.pop():"."!==n&&""!==n&&r.push(n);return r.join("/")},a=function(e){return e.split("/").slice(0,-1).join("/")},s=function(t){return function(n){var r=o(a(t),n);return e.require(r,t)}},l=function(e,t){var r=p&&p.createHot(e),u={id:e,exports:{},hot:r};return n[e]=u,t(u.exports,s(e),u),u.exports},c=function(e){return r[e]?c(r[e]):e},h=function(e,t){return c(o(a(e),t))},f=function(e,r){null==r&&(r="/");var i=c(e);if(u.call(n,i))return n[i].exports;if(u.call(t,i))return l(i,t[i]);throw new Error("Cannot find module '"+e+"' from '"+r+"'")};f.alias=function(e,t){r[t]=e};var d=/\.[^.\/]+$/,g=/\/index(\.[^\/]+)?$/,w=function(e){if(d.test(e)){var t=e.replace(d,"");u.call(r,t)&&r[t].replace(d,"")!==t+"/index"||(r[t]=e)}if(g.test(e)){var n=e.replace(g,"");u.call(r,n)||(r[n]=e)}};f.register=f.define=function(e,r){if(e&&"object"==typeof e)for(var i in e)u.call(e,i)&&f.register(i,e[i]);else t[e]=r,delete n[e],w(e)},f.list=function(){var e=[];for(var n in t)u.call(t,n)&&e.push(n);return e};var p=e._hmr&&new e._hmr(h,f,t,n);f._cache=n,f.hmr=p&&p.wrap,f.brunch=!0,e.require=f}}(),function(){"undefined"==typeof window?this:window;require.register("app.js",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var u=t("jquery"),i=r(u),o=t("./firebase-client"),a=r(o);t("./google-analytics"),window.GreenhouseGames={client:new a["default"],authHelpers:{showAuth:function(){(0,i["default"])(".show-auth").removeClass("hidden"),(0,i["default"])(".hide-auth").addClass("hidden")},hideAuth:function(){(0,i["default"])(".hide-auth").removeClass("hidden"),(0,i["default"])(".show-auth").addClass("hidden")},loginSuccess:function(e){e.user&&!e.user.isAnonymous?((0,i["default"])("a.account-link").html('<div class="thumbnail-image user-image"></div>'+e.user.displayName),(0,i["default"])("div.user-image").html('<img alt="User Profile Image" src="'+e.user.photoURL+'">'),(0,i["default"])(".user-name").text(e.user.displayName)):((0,i["default"])("a.account-link").html('<i class="material-icons">person</i>Guest'),(0,i["default"])("div.user-image").html('<i class="material-icons">person</i>'),(0,i["default"])(".user-name").text("Guest")),window.GreenhouseGames.authHelpers.showAuth()},loginError:function(e){console.log(e)}}},(0,i["default"])(document).ready(function(){window.GreenhouseGames.client.firebase.auth().onAuthStateChanged(function(e){e?window.GreenhouseGames.authHelpers.loginSuccess({user:e}):window.GreenhouseGames.authHelpers.hideAuth()}),(0,i["default"])("#header-logout-button").click(function(){window.GreenhouseGames.client.signOut().then(window.GreenhouseGames.authHelpers.hideAuth)["catch"](window.GreenhouseGames.authHelpers.hideAuth)}),(0,i["default"])("#logout_button").click(function(){return window.GreenhouseGames.client.signOut().then(window.GreenhouseGames.authHelpers.hideAuth)}),(0,i["default"])("#twitterLogin_button").click(function(){return window.GreenhouseGames.client.signInWithPopup("twitter").then(window.GreenhouseGames.authHelpers.loginSuccess)["catch"](window.GreenhouseGames.authHelpers.loginError)}),(0,i["default"])("#facebookLogin_button").click(function(){return window.GreenhouseGames.client.signInWithPopup("facebook").then(window.GreenhouseGames.authHelpers.loginSuccess)["catch"](window.GreenhouseGames.authHelpers.loginError)}),(0,i["default"])("#guestLogin_button").click(function(){return window.GreenhouseGames.client.signInAnonymously().then(window.GreenhouseGames.authHelpers.loginSuccess)["catch"](window.GreenhouseGames.authHelpers.loginError)}),(0,i["default"])(document).foundation()})}),require.register("config.js",function(e,t,n){"use strict";n.exports={apiKey:"AIzaSyDPGXl6Bc8jf_IPlkcVJe6jNlrNz72zaCo",authDomain:"greenhouse-games.firebaseapp.com",databaseURL:"https://greenhouse-games.firebaseio.com",storageBucket:"greenhouse-games.appspot.com",messagingSenderId:"832706408675"}}),require.register("firebase-client.js",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=t("firebase"),a=r(o),s=t("./config"),l=r(s),c=null,h=function(){function e(){u(this,e),c||(c=a["default"].initializeApp(l["default"])),this.firebase=c}return i(e,[{key:"currentUID",value:function(){return this.firebase.auth().currentUser?this.firebase.auth().currentUser.uid:null}},{key:"signOut",value:function(){return this.firebase.auth().signOut()}},{key:"signInAnonymously",value:function(){return this.firebase.auth().signInAnonymously()}},{key:"signInWithPopup",value:function(e){var t=void 0;switch(e){case"google":t=new a["default"].auth.GoogleAuthProvider;break;case"facebook":t=new a["default"].auth.FacebookAuthProvider;break;case"twitter":t=new a["default"].auth.TwitterAuthProvider;break;case"github":t=new a["default"].auth.GithubAuthProvider;break;default:return void console.log('Provider "'+e+'" is not support')}return this.firebase.auth().signInWithPopup(t)}},{key:"waitForAuth",value:function(){var e=this.firebase.auth(),t=new Promise(function(t){var n=function(){r(),t()},r=e.onAuthStateChanged(n)});return t}},{key:"requireAuth",value:function(){var e=this,t=new Promise(function(t,n){e.waitForAuth().then(function(){e.firebase.auth().currentUser?t():e.firebase.auth().signInAnonymously().then(t)["catch"](n)})["catch"](n)});return t}}]),e}();n.exports=h}),require.register("google-analytics.js",function(e,t,n){"use strict";!function(e,t,n,r,u,i,o){e.GoogleAnalyticsObject=u,e[u]=e[u]||function(){(e[u].q=e[u].q||[]).push(arguments)},e[u].l=1*new Date,i=t.createElement(n),o=t.getElementsByTagName(n)[0],i.async=1,i.src=r,o.parentNode.insertBefore(i,o)}(window,document,"script","https://www.google-analytics.com/analytics.js","ga"),ga("create","UA-85526007-1","auto"),ga("send","pageview")}),require.register("___globals___",function(e,t,n){window.jQuery=t("jquery"),window.$=t("jquery")})}(),require("___globals___");