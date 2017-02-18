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
  var dim = getGameDim(game.containerId);
  if (game.width != dim.width) {
    game.scale.setGameSize(dim.width, dim.height);
    return true;
  } else {
    return false;
  }
}

function preload(game) {
  if (game.width > 1000) {
    game.load.image('greenhouse', '/assets/img/logo-circle-large.png');
    game.load.image('greenhouse-square', '/assets/img/logo-square-large.png');
  } else if (game.width > 600) {
    game.load.image('greenhouse', '/assets/img/logo-circle-medium.png');
    game.load.image('greenhouse-square', '/assets/img/logo-square-medium.png');
  } else {
    game.load.image('greenhouse', '/assets/img/logo-circle-small.png');
    game.load.image('greenhouse-square', '/assets/img/logo-square-small.png');
  }
  game.load.image('reload', '/assets/img/restart-game.png');
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

function getIconWidth(game) {
  if (game.width > 1000) {
    return 128;
  } else if (game.width > 600) {
    return 64;
  } else {
    return 32;
  }
}

function getBreakpoint(game) {
  if (game.width > 1000) {
    return 'large';
  } else if (game.width > 600) {
    return 'medium';
  } else {
    return 'small';
  }
}

function getGameDim(id) {
  var width = $('#' + id).width();
  return {
    width: width,
    height: width / (16 / 9)
  };
}

function init(letter, config) {
  var containerId = 'learning-game-' + letter + '-container';
  var game = new Phaser.Game(getGameDim(containerId).width, getGameDim(containerId).height, Phaser.AUTO, 'learning-game-' + letter, config);
  game.containerId = containerId;
  return game;
}

module.exports = {
  resize: resize,
  preload: preload,
  create: create,
  getIconWidth: getIconWidth,
  init: init,
  getBreakpoint: getBreakpoint
};

});

require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.jQuery = require("jquery");
window["$"] = require("jquery");


});})();require('___globals___');


//# sourceMappingURL=utils.js.map