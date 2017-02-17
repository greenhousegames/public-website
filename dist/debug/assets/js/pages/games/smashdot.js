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
require.register("pages/games/smashdot.js", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reporting = require('@greenhousegames/smash-dot/dist/reporting');

var _reporting2 = _interopRequireDefault(_reporting);

var _firebaseClient = require('firebase-client.js');

var _firebaseClient2 = _interopRequireDefault(_firebaseClient);

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
    key: 'draw',
    value: function draw() {
      // metrics
      this._drawGamePlayed();
      this._drawUsersPlayed();
      this._drawLastPlayed();

      // rankings
      this._drawClassicRankings();
      this._drawSurvivalRankings();

      // charts
      this._drawMaxScores();
      this._drawModesPlayed();
    }
  }, {
    key: '_drawClassicRankings',
    value: function _drawClassicRankings() {
      var _this2 = this;

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
          _this2.reporting.filter('users', {
            uid: _this2.currentUID()
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
      var _this3 = this;

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
          _this3.reporting.filter('users', {
            uid: _this3.currentUID()
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
      Promise.all([this.reporting.filter('modes', { mode: 'survival' }).sum('played').value(), this.reporting.filter('modes', { mode: 'classic' }).sum('played').value(), this.reporting.filter('modes', { mode: 'battle' }).sum('played').value()]).then(function (values) {
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
      Promise.all([this.reporting.filter('modes', { mode: 'survival' }).max('survival-score').value(), this.reporting.filter('modes', { mode: 'classic' }).max('classic-score').value(), this.reporting.filter('modes', { mode: 'battle' }).max('battle-score').value()]).then(function (values) {
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

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(function () {
  var report = new Reporting();
  report.requireAuth().then(function () {
    $(document).ready(function () {
      report.draw();

      $(window).resize(function () {
        report.draw();
      });
    });
  });
});

});

require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.jQuery = require("jquery");
window["$"] = require("jquery");


});})();require('___globals___');


//# sourceMappingURL=smashdot.js.map