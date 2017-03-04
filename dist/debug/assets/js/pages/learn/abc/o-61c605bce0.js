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
require.register("pages/learn/abc/o.js", function(exports, require, module) {
'use strict';

var _utils = require('./utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function create() {
  var sprite1 = void 0,
      abutton = void 0,
      obstacle = void 0;

  var game = _utils2.default.init({
    preload: function preload() {
      _utils2.default.preload(game, ['a']);
      game.load.image('obstacle', '/assets/img/learning/obstacle.png');
    },
    create: function create() {
      _utils2.default.create(game);
      game.physics.arcade.gravity.y = 200;
      game.physics.arcade.checkCollision.right = false;

      sprite1 = game.add.sprite(0, game.height, 'greenhouse-square');
      sprite1.anchor.setTo(0, 1);
      game.physics.arcade.enable(sprite1);
      _utils2.default.ifBreakpoint(game, 'small', function () {
        return sprite1.body.velocity.x = 50;
      });
      _utils2.default.ifBreakpoint(game, 'medium', function () {
        return sprite1.body.velocity.x = 75;
      });
      _utils2.default.ifBreakpoint(game, 'large', function () {
        return sprite1.body.velocity.x = 100;
      });
      sprite1.body.collideWorldBounds = true;

      _utils2.default.ifBreakpoint(game, 'small', function () {
        return obstacle = game.add.tileSprite(game.width / 2, game.height, 16, 32, 'obstacle');
      });
      _utils2.default.ifBreakpoint(game, 'medium', function () {
        return obstacle = game.add.tileSprite(game.width / 2, game.height, 16, 64, 'obstacle');
      });
      _utils2.default.ifBreakpoint(game, 'large', function () {
        return obstacle = game.add.tileSprite(game.width / 2, game.height, 32, 128, 'obstacle');
      });
      obstacle.anchor.setTo(0.5, 1);
      game.physics.arcade.enable(obstacle);
      obstacle.body.immovable = true;
      obstacle.body.allowGravity = false;

      abutton = game.add.button(0, 0, 'a-button', jump);
      _utils2.default.alignButtons(game, [abutton]);
    },
    update: function update() {
      game.physics.arcade.collide(sprite1, obstacle);
    },
    render: function render() {}
  });
  return game;

  function jump() {
    if (sprite1.y == game.height) {
      _utils2.default.ifBreakpoint(game, 'small', function () {
        return sprite1.body.velocity.y = -200;
      });
      _utils2.default.ifBreakpoint(game, 'medium', function () {
        return sprite1.body.velocity.y = -250;
      });
      _utils2.default.ifBreakpoint(game, 'large', function () {
        return sprite1.body.velocity.y = -300;
      });
    }
  }
}

module.exports = create;

});

require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.jQuery = require("jquery");
window["$"] = require("jquery");


});})();require('___globals___');


//# sourceMappingURL=o.js.map