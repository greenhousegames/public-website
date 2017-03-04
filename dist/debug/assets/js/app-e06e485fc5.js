(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("app.js", function(exports, require, module) {
'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _firebaseClient = require('./firebase-client');

var _firebaseClient2 = _interopRequireDefault(_firebaseClient);

require('./google-analytics');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.GreenhouseGames = {
  client: new _firebaseClient2.default(),
  authHelpers: {
    showAuth: function showAuth() {
      (0, _jquery2.default)('.show-auth').removeClass('hidden');
      (0, _jquery2.default)('.hide-auth').addClass('hidden');
    },
    hideAuth: function hideAuth() {
      (0, _jquery2.default)('.hide-auth').removeClass('hidden');
      (0, _jquery2.default)('.show-auth').addClass('hidden');
    },
    loginSuccess: function loginSuccess(data) {
      if (data.user && !data.user.isAnonymous) {
        (0, _jquery2.default)('a.account-link').html('<div class="thumbnail-image user-image"></div>' + data.user.displayName);
        (0, _jquery2.default)('div.user-image').html('<img alt="User Profile Image" src="' + data.user.photoURL + '">');
        (0, _jquery2.default)('.user-name').text(data.user.displayName);
      } else {
        (0, _jquery2.default)('a.account-link').html('<i class="material-icons">person</i>Guest');
        (0, _jquery2.default)('div.user-image').html('<i class="material-icons">person</i>');
        (0, _jquery2.default)('.user-name').text('Guest');
      }

      window.GreenhouseGames.authHelpers.showAuth();
    },
    loginError: function loginError(err) {
      console.log(err);
    }
  }
};

(0, _jquery2.default)(document).ready(function () {
  // AUTH
  window.GreenhouseGames.client.firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      window.GreenhouseGames.authHelpers.loginSuccess({ user: user });
    } else {
      window.GreenhouseGames.authHelpers.hideAuth();
    }
  });

  // HEADER
  (0, _jquery2.default)('#header-logout-button').click(function () {
    window.GreenhouseGames.client.signOut().then(window.GreenhouseGames.authHelpers.hideAuth).catch(window.GreenhouseGames.authHelpers.hideAuth);
  });

  // ACCOUNT
  (0, _jquery2.default)('#logout_button').click(function () {
    return window.GreenhouseGames.client.signOut().then(window.GreenhouseGames.authHelpers.hideAuth);
  });
  (0, _jquery2.default)('#twitterLogin_button').click(function () {
    return window.GreenhouseGames.client.signInWithPopup('twitter').then(window.GreenhouseGames.authHelpers.loginSuccess).catch(window.GreenhouseGames.authHelpers.loginError);
  });
  (0, _jquery2.default)('#facebookLogin_button').click(function () {
    return window.GreenhouseGames.client.signInWithPopup('facebook').then(window.GreenhouseGames.authHelpers.loginSuccess).catch(window.GreenhouseGames.authHelpers.loginError);
  });
  (0, _jquery2.default)('#guestLogin_button').click(function () {
    return window.GreenhouseGames.client.signInAnonymously().then(window.GreenhouseGames.authHelpers.loginSuccess).catch(window.GreenhouseGames.authHelpers.loginError);
  });

  // FOUNADTION
  (0, _jquery2.default)(document).foundation();
});

});

require.register("config.js", function(exports, require, module) {
'use strict';

module.exports = {
  apiKey: 'AIzaSyCqcbh9XmZZBahTDxmj4GXbwQny9H9wHdo',
  authDomain: 'greenhouse-games-test.firebaseapp.com',
  databaseURL: 'https://greenhouse-games-test.firebaseio.com',
  storageBucket: '',
  messagingSenderId: '756331628096'
};

});

require.register("firebase-client.js", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var staticFirebase = null;

var FirebaseClient = function () {
  function FirebaseClient() {
    _classCallCheck(this, FirebaseClient);

    if (!staticFirebase) {
      staticFirebase = _firebase2.default.initializeApp(_config2.default);
    }
    this.firebase = staticFirebase;
  }

  _createClass(FirebaseClient, [{
    key: 'currentUID',
    value: function currentUID() {
      return this.firebase.auth().currentUser ? this.firebase.auth().currentUser.uid : null;
    }
  }, {
    key: 'signOut',
    value: function signOut() {
      return this.firebase.auth().signOut();
    }
  }, {
    key: 'signInAnonymously',
    value: function signInAnonymously() {
      return this.firebase.auth().signInAnonymously();
    }
  }, {
    key: 'signInWithPopup',
    value: function signInWithPopup(name) {
      var provider = void 0;
      switch (name) {
        case 'google':
          provider = new _firebase2.default.auth.GoogleAuthProvider();
          break;
        case 'facebook':
          provider = new _firebase2.default.auth.FacebookAuthProvider();
          break;
        case 'twitter':
          provider = new _firebase2.default.auth.TwitterAuthProvider();
          break;
        case 'github':
          provider = new _firebase2.default.auth.GithubAuthProvider();
          break;
        default:
          console.log('Provider "' + name + '" is not support');
          return;
      }

      return this.firebase.auth().signInWithPopup(provider);
    }
  }, {
    key: 'waitForAuth',
    value: function waitForAuth() {
      var auth = this.firebase.auth();
      var promise = new Promise(function (resolve) {
        var callback = function callback() {
          off();
          resolve();
        };
        var off = auth.onAuthStateChanged(callback);
      });
      return promise;
    }
  }, {
    key: 'requireAuth',
    value: function requireAuth() {
      var _this = this;

      var promise = new Promise(function (resolve, reject) {
        _this.waitForAuth().then(function () {
          if (!_this.firebase.auth().currentUser) {
            _this.firebase.auth().signInAnonymously().then(resolve).catch(reject);
          } else {
            resolve();
          }
        }).catch(reject);
      });
      return promise;
    }
  }]);

  return FirebaseClient;
}();

module.exports = FirebaseClient;

});

require.register("google-analytics.js", function(exports, require, module) {
// Google Analytics disabled for debug builds
"use strict";

});

require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.jQuery = require("jquery");
window["$"] = require("jquery");


});})();require('___globals___');


//# sourceMappingURL=app.js.map