(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

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
    var hot = null;
    hot = hmr && hmr.createHot(name);
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
    if (typeof bundle === 'object') {
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
var global = window;
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

require('./reporting');

var _firebaseClient = require('./firebase-client');

var _firebaseClient2 = _interopRequireDefault(_firebaseClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _jquery2.default)(document).foundation();

var client = new _firebaseClient2.default();
client.firebase.auth().onAuthStateChanged(function (user) {
  if (user && !user.isAnonymous) {
    loginSuccess({ user: user });
  } else {
    hideAuth();
  }
});

if (!window.GreenhouseGames.root) {
  jQuery('section.main').addClass('subpage');
}

if (window.GreenhouseGames.account) {
  initAccountPage();
}

if (window.GreenhouseGames.reporting) {
  initGamePage();
}

// Google Analytics
(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments);
  }, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-85526007-1', 'auto');
ga('send', 'pageview');

/*
 * AUTH HELPERS
 */
function showAuth() {
  jQuery('.show-auth').show();
  jQuery('.hide-auth').hide();
}

function hideAuth() {
  jQuery('.hide-auth').show();
  jQuery('.show-auth').hide();
  jQuery('span.user-name').text('Login');
}

function loginSuccess(data) {
  if (window.GreenhouseGames.account) {
    jQuery('#' + window.GreenhouseGames.account.user.image).attr('src', data.user.photoURL);
    jQuery('#' + window.GreenhouseGames.account.user.name).text(data.user.displayName);
  }
  jQuery('span.user-name').text(data.user.displayName);
  showAuth();
}

function loginError(err) {
  console.log(err);
}

/*
 * PAGE HELPERS
 */
function initAccountPage() {
  // init buttons
  jQuery('#' + window.GreenhouseGames.account.buttons.logout).click(function () {
    return client.signOut().then(hideAuth).catch(hideAuth);
  });
  jQuery('#' + window.GreenhouseGames.account.buttons.twitter).click(function () {
    return client.signInWithPopup('twitter').then(loginSuccess).catch(loginError);
  });
  jQuery('#' + window.GreenhouseGames.account.buttons.facebook).click(function () {
    return client.signInWithPopup('facebook').then(loginSuccess).catch(loginError);
  });
  jQuery('#' + window.GreenhouseGames.account.buttons.google).click(function () {
    return client.signInWithPopup('google');
  });
  jQuery('#' + window.GreenhouseGames.account.buttons.github).click(function () {
    return client.signInWithPopup('github').then(loginSuccess).catch(loginError);
  });
}

function initGamePage() {
  var Reporting = require('reporting/' + window.GreenhouseGames.reporting + '.js');
  var report = new Reporting();
  report.loadCharts(function () {
    (0, _jquery2.default)(document).ready(function () {
      report.draw();

      (0, _jquery2.default)(window).resize(function () {
        report.draw();
      });
    });
  });
}
});

;require.register("config.js", function(exports, require, module) {
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

var _rsvp = require('rsvp');

var _rsvp2 = _interopRequireDefault(_rsvp);

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
      var promise = new _rsvp2.default.Promise(function (resolve) {
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

      var promise = new _rsvp2.default.Promise(function (resolve, reject) {
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

require.register("reporting/heartbeat.js", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reporting = require('@greenhousegames/heartbeat/dist/reporting');

var _reporting2 = _interopRequireDefault(_reporting);

var _firebaseClient = require('../firebase-client');

var _firebaseClient2 = _interopRequireDefault(_firebaseClient);

var _rsvp = require('rsvp');

var _rsvp2 = _interopRequireDefault(_rsvp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Reporting = function (_FirebaseClient) {
  _inherits(Reporting, _FirebaseClient);

  function Reporting() {
    _classCallCheck(this, Reporting);

    var _this = _possibleConstructorReturn(this, (Reporting.__proto__ || Object.getPrototypeOf(Reporting)).call(this));

    _this.reporting = new _reporting2.default(_this.firebase.database().ref('games/heartbeat/data'), _this.firebase.database().ref('games/heartbeat/reporting'));
    return _this;
  }

  _createClass(Reporting, [{
    key: 'loadCharts',
    value: function loadCharts(done) {
      google.charts.load('current', { 'packages': ['corechart'] });
      google.charts.setOnLoadCallback(done);
    }
  }, {
    key: 'draw',
    value: function draw() {
      var _this2 = this;

      this.requireAuth().then(function () {
        // metrics
        _this2._drawGamePlayed();
        _this2._drawUsersPlayed();
        _this2._drawLastPlayed();
      });
    }
  }, {
    key: '_drawGamePlayed',
    value: function _drawGamePlayed() {
      this.reporting.filter().sum('played').select(1).then(function (values) {
        jQuery('#game_played_count').text(values[0] || 0);
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    key: '_drawUsersPlayed',
    value: function _drawUsersPlayed() {
      this.reporting.filter('users').sum('played').count().then(function (total) {
        jQuery('#user_played_count').text(total);
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    key: '_drawLastPlayed',
    value: function _drawLastPlayed() {
      this.reporting.filter().last('endedAt').select(1).then(function (values) {
        if (!values[0]) {
          jQuery('#last_played_timestamp').text('never');
        } else {
          var date = new Date();
          date.setTime(values[0]);
          jQuery('#last_played_timestamp').attr('datetime', date.toISOString());
          jQuery('#last_played_timestamp').timeago();
        }
      }).catch(function (err) {
        console.log(err);
      });
    }
  }]);

  return Reporting;
}(_firebaseClient2.default);

module.exports = Reporting;
});

require.register("reporting/index.js", function(exports, require, module) {
'use strict';

require('./heartbeat');

require('./smashdot');
});

require.register("reporting/smashdot.js", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reporting = require('@greenhousegames/smash-dot/dist/reporting');

var _reporting2 = _interopRequireDefault(_reporting);

var _firebaseClient = require('../firebase-client');

var _firebaseClient2 = _interopRequireDefault(_firebaseClient);

var _rsvp = require('rsvp');

var _rsvp2 = _interopRequireDefault(_rsvp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Reporting = function (_FirebaseClient) {
  _inherits(Reporting, _FirebaseClient);

  function Reporting() {
    _classCallCheck(this, Reporting);

    var _this = _possibleConstructorReturn(this, (Reporting.__proto__ || Object.getPrototypeOf(Reporting)).call(this));

    _this.reporting = new _reporting2.default(_this.firebase.database().ref('games/smashdot/data'), _this.firebase.database().ref('games/smashdot/reporting'));
    return _this;
  }

  _createClass(Reporting, [{
    key: 'loadCharts',
    value: function loadCharts(done) {
      google.charts.load('current', { 'packages': ['corechart'] });
      google.charts.setOnLoadCallback(done);
    }
  }, {
    key: 'draw',
    value: function draw() {
      var _this2 = this;

      this.requireAuth().then(function () {
        // metrics
        _this2._drawGamePlayed();
        _this2._drawUsersPlayed();
        _this2._drawLastPlayed();

        // rankings
        _this2._drawClassicRankings();
        _this2._drawSurvivalRankings();

        // charts
        _this2._drawMaxScores();
        _this2._drawModesPlayed();
      });
    }
  }, {
    key: '_drawClassicRankings',
    value: function _drawClassicRankings() {
      var _this3 = this;

      this.reporting.filter('users').max('classic-score').count().then(function (value) {
        jQuery('#classic_ranking2').text('of ' + value);
      }).catch(function (err) {
        console.log(err);
      });

      this.reporting.filter('users-modes', {
        uid: this.currentUID(),
        mode: 'classic'
      }).max('classic-score').value().then(function (pr) {
        if (pr) {
          _this3.reporting.filter('users', {
            uid: _this3.currentUID()
          }).max('classic-score').greater(pr).count().then(function (value) {
            jQuery('#classic_ranking1').text('#' + value);
          });
        } else {
          jQuery('#classic_ranking1').text('N/A');
        }
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    key: '_drawSurvivalRankings',
    value: function _drawSurvivalRankings() {
      var _this4 = this;

      this.reporting.filter('users').min('survival-duration').count().then(function (value) {
        jQuery('#survival_ranking2').text('of ' + value);
      }).catch(function (err) {
        console.log(err);
      });

      this.reporting.filter('users-modes', {
        uid: this.currentUID(),
        mode: 'survival'
      }).min('survival-duration').value().then(function (pr) {
        if (pr) {
          _this4.reporting.filter('users', {
            uid: _this4.currentUID()
          }).min('survival-duration').greater(pr).count().then(function (value) {
            jQuery('#survival_ranking1').text('#' + value);
          });
        } else {
          jQuery('#survival_ranking1').text('N/A');
        }
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    key: '_drawGamePlayed',
    value: function _drawGamePlayed() {
      this.reporting.filter().sum('played').select(1).then(function (values) {
        jQuery('#game_played_count').text(values[0] || 0);
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    key: '_drawUsersPlayed',
    value: function _drawUsersPlayed() {
      this.reporting.filter('users').sum('played').count().then(function (total) {
        jQuery('#user_played_count').text(total);
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    key: '_drawLastPlayed',
    value: function _drawLastPlayed() {
      this.reporting.filter().last('endedAt').select(1).then(function (values) {
        if (!values[0]) {
          jQuery('#last_played_timestamp').text('never');
        } else {
          var date = new Date();
          date.setTime(values[0]);
          jQuery('#last_played_timestamp').attr('datetime', date.toISOString());
          jQuery('#last_played_timestamp').timeago();
        }
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    key: '_drawModesPlayed',
    value: function _drawModesPlayed() {
      _rsvp2.default.all([this.reporting.filter('modes', { mode: 'survival' }).sum('played').value(), this.reporting.filter('modes', { mode: 'classic' }).sum('played').value(), this.reporting.filter('modes', { mode: 'battle' }).sum('played').value()]).then(function (values) {
        var element = jQuery('#sum_played_chart');
        var data = new google.visualization.arrayToDataTable([['Mode', 'Times Played'], ['Survival', values[0] || 0], ['Classic', values[1] || 0], ['Battle', values[2] || 0]]);

        // Set chart options
        var options = {
          title: 'Modes Played',
          width: element.width(),
          height: 400,
          pieHole: 0.4,
          legend: { position: 'bottom' }
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(element[0]);
        chart.draw(data, options);
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    key: '_drawMaxScores',
    value: function _drawMaxScores() {
      _rsvp2.default.all([this.reporting.filter('modes', { mode: 'survival' }).max('survival-score').value(), this.reporting.filter('modes', { mode: 'classic' }).max('classic-score').value(), this.reporting.filter('modes', { mode: 'battle' }).max('battle-score').value()]).then(function (values) {
        var element = jQuery('#max_score_chart');
        var data = new google.visualization.arrayToDataTable([['Mode', 'Max Score'], ['Survival', values[0] || 0], ['Classic', values[1] || 0], ['Battle', values[2] || 0]]);

        // Set chart options
        var options = {
          title: 'Max Scores',
          width: element.width(),
          height: 400,
          legend: { position: 'bottom' }
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.ColumnChart(element[0]);
        chart.draw(data, options);
      }).catch(function (err) {
        console.log(err);
      });
    }
  }]);

  return Reporting;
}(_firebaseClient2.default);

module.exports = Reporting;
});

require.alias("brunch/node_modules/deppack/node_modules/node-browser-modules/node_modules/process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.jQuery = require("jquery");
window["$"] = require("jquery");


});})();require('___globals___');


//# sourceMappingURL=app.js.map