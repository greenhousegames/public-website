var config = {
  conventions: {
    assets:   /^(app)(\\|\/)(assets)/,
    ignored:  ['test/**/*.js','app/scss/components/*.scss', 'app/helpers/**/*.js']
  },

  npm: {
    globals: {
      'jQuery': 'jquery',
      '$': 'jquery'
    },
    static: [
      'node_modules/what-input/what-input.js',
      'node_modules/timeago/jquery.timeago.js',
      'node_modules/foundation-sites/dist/js/plugins/foundation.core.js',
      'node_modules/foundation-sites/dist/js/plugins/foundation.util.mediaQuery.js',
      'node_modules/foundation-sites/dist/js/plugins/foundation.dropdownMenu.js',
      'node_modules/foundation-sites/dist/js/plugins/foundation.equalizer.js',
      'node_modules/foundation-sites/dist/js/plugins/foundation.tabs.js',
      'node_modules/foundation-sites/dist/js/plugins/foundation.util.box.js',
      'node_modules/foundation-sites/dist/js/plugins/foundation.util.keyboard.js',
      'node_modules/foundation-sites/dist/js/plugins/foundation.util.nest.js',
      'node_modules/highlightjs/highlight.pack.min.js'
    ]
  },

  files: {
    javascripts: {
      joinTo: {
        'assets/js/vendor.js': [/^(?!app)/, '!node_modules/highlightjs/*.js'],
        'assets/js/highlight.js': 'node_modules/highlightjs/*.js',
        'assets/js/app.js': "app/*.js",
        'assets/js/pages/account/account.js': "app/pages/account/account.js"
      },
      order: {
        after: [
          'node_modules/what-input/what-input.js',
          'node_modules/timeago/jquery.timeago.js',
          'node_modules/foundation-sites/dist/js/plugins/*.js'
        ]
      }
    },
    stylesheets: {
      joinTo: {
        'assets/css/app.css': [/^(app)/, "!app/scss/highlight.scss", "!app/scss/amp.scss"],
        'assets/css/highlight.css': "app/scss/highlight.scss",
        'assets/css/amp.css': "app/scss/amp.scss"
      }
    }
  },

  plugins: {
    babel: {
      presets: ['es2015']
    },
    sass: {
      options: {
        includePaths: [
          'node_modules/foundation-sites/scss',
          'node_modules/motion-ui/src'
        ]
      }
    },
    postcss: {
      processors: [
        require('autoprefixer')(['last 8 versions','ie >= 9'])
      ]
    },
    beforeBrunch: [
      'cp environments/debug/config.development.js app/config.js',
      'cp environments/debug/google-analytics.js app/google-analytics.js'
    ],
    afterBrunch: [
      'gulp'
    ]
  },

  overrides: {
    production: {
      plugins: {
        beforeBrunch: [
          'cp environments/release/config.production.js app/config.js',
          'cp environments/release/google-analytics.js app/google-analytics.js'
        ],
        afterBrunch: [
          'gulp --production'
        ]
      }
    }
  }
};

// GAMES
var temppath;
var fs = require('fs');
var yaml = require('js-yaml');
var games = yaml.load(fs.readFileSync('./app/data/games.yml', 'utf8'));
Object.keys(games).forEach(function(key) {
  temppath = 'pages/games/' + key + '/reporting.js';
  config.files.javascripts.joinTo['assets/js/' + temppath] = 'app/' + temppath;
});

// LEARNING ABCs
['pages/learn/abc/utils.js', 'pages/learn/abc/preview.js'].forEach(function(path) {
  config.files.javascripts.joinTo['assets/js/' + path] = 'app/' + path;
});
var abc = yaml.load(fs.readFileSync('./app/data/abc.yml', 'utf8'));
Object.keys(abc).forEach(function(letter) {
  temppath = 'pages/learn/abc/' + letter + '.js';
  config.files.javascripts.joinTo['assets/js/' + temppath] = 'app/' + temppath;
});

module.exports = config;
