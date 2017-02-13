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
var process;
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _jquery2.default)(document).foundation();

window.GreenhouseGames = {
  client: new _firebaseClient2.default(),
  authHelpers: {
    showAuth: function showAuth() {
      (0, _jquery2.default)('.show-auth').show();
      (0, _jquery2.default)('.hide-auth').hide();
    },
    hideAuth: function hideAuth() {
      (0, _jquery2.default)('.hide-auth').show();
      (0, _jquery2.default)('.show-auth').hide();
      (0, _jquery2.default)('span.user-name').text('Login');
    },
    loginSuccess: function loginSuccess(data) {
      (0, _jquery2.default)('#user_image').attr('src', data.user.photoURL);
      (0, _jquery2.default)('#user_name').text(data.user.displayName);
      (0, _jquery2.default)('span.user-name').text(data.user.displayName);
      window.GreenhouseGames.authHelpers.showAuth();
    },
    loginError: function loginError(err) {
      console.log(err);
    }
  }
};

window.GreenhouseGames.client.firebase.auth().onAuthStateChanged(function (user) {
  if (user && !user.isAnonymous) {
    window.GreenhouseGames.authHelpers.loginSuccess({ user: user });
  } else {
    window.GreenhouseGames.authHelpers.hideAuth();
  }
});

// Google Analytics
(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments);
  }, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-85526007-1', 'auto');
ga('send', 'pageview');

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

require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.jQuery = require("jquery");
window["$"] = require("jquery");


});})();require('___globals___');


//# sourceMappingURL=app.js.map