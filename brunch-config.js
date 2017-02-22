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
      'node_modules/foundation-sites/dist/js/foundation.js'
    ]
  },

  files: {
    javascripts: {
      joinTo: {
        'assets/js/vendor.js': /^(?!app)/,
        'assets/js/app.js': "app/*.js",
        'assets/js/pages/account/account.js': "app/pages/account/account.js"
      },
      order: {
        after: [
          'node_modules/what-input/what-input.js',
          'node_modules/timeago/jquery.timeago.js',
          'node_modules/foundation-sites/dist/js/foundation.js'
        ]
      }
    },
    stylesheets: {
      joinTo: '/assets/css/app.css'
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
['smashdot'].forEach(function(game) {
  config.files.javascripts.joinTo['assets/js/pages/games/' + game + '/reporting.js'] = 'app/pages/games/' + game + '/reporting.js';
});

// LEARNING ABCs
var path = 'pages/learn/abc/utils.js';
config.files.javascripts.joinTo['assets/js/' + path] = 'app/' + path;
for (var i = 65; i <= 90; i++) {
  var letter = String.fromCharCode(i).toLowerCase();
  path = 'pages/learn/abc/' + letter + '.js';
  config.files.javascripts.joinTo['assets/js/' + path] = 'app/' + path;
}

module.exports = config;
