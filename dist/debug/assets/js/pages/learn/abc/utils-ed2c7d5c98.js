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
require.register("pages/learn/abc/utils.js", function(exports, require, module) {
'use strict';

function resize(game) {
  var width = getGameWidth();
  var height = getGameHeight();
  if (game.width != width) {
    game.scale.setGameSize(width, height);
    return true;
  } else {
    return false;
  }
}

function preload(game, buttons) {
  buttons = buttons || [];
  var breakpoint = getBreakpoint(game);
  game.load.image('greenhouse', '/assets/img/learning/logo-circle-' + breakpoint + '.png');
  game.load.image('greenhouse-square', '/assets/img/learning/logo-square-' + breakpoint + '.png');
  buttons.forEach(function (name) {
    game.load.image(name + '-button', '/assets/img/learning/' + name + '-button-' + breakpoint + '.png');
  });
  game.load.image('reload', '/assets/img/learning/restart-game.png');
}

function create(game) {
  resize(game);
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.stage.backgroundColor = '#000000';
  game.add.button(game.width - 16 - 8, game.height - 16 - 8, 'reload', function () {
    return game.state.restart();
  });
  game.scale.setResizeCallback(function () {
    if (resize(game)) {
      game.state.restart();
    }
  });
}

function getIconSize(game) {
  var size = void 0;
  ifBreakpoint(game, 'small', function () {
    return size = 32;
  });
  ifBreakpoint(game, 'medium', function () {
    return size = 64;
  });
  ifBreakpoint(game, 'large', function () {
    return size = 128;
  });
  return size;
}

function getBreakpoint(game) {
  if (game.width > 1000) return 'large';else if (game.width > 600) return 'medium';else return 'small';
}

function getGameWidth() {
  return $('#learning-game-preview-container').width();
}

function getGameHeight() {
  return getGameWidth() / (16 / 9);
}

function init(config) {
  var width = getGameWidth();
  var height = getGameHeight();
  var game = new Phaser.Game(width, height, Phaser.AUTO, 'learning-game-preview', config);
  return game;
}

function alignButtons(game, buttons) {
  var padding = void 0;
  ifBreakpoint(game, 'small', function () {
    return padding = 8;
  });
  ifBreakpoint(game, 'medium', function () {
    return padding = 12;
  });
  ifBreakpoint(game, 'large', function () {
    return padding = 16;
  });

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].anchor.setTo(0, 1);
    buttons[i].x = padding + (buttons[i].width + padding) * i;
    buttons[i].y = game.height - padding;
  }
}

function ifBreakpoint(game, breakpoint, callback) {
  if (getBreakpoint(game) == breakpoint) {
    callback();
  }
}

module.exports = {
  resize: resize,
  preload: preload,
  create: create,
  getIconSize: getIconSize,
  init: init,
  getBreakpoint: getBreakpoint,
  alignButtons: alignButtons,
  ifBreakpoint: ifBreakpoint
};

});

require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.jQuery = require("jquery");
window["$"] = require("jquery");


});})();require('___globals___');


//# sourceMappingURL=utils.js.map