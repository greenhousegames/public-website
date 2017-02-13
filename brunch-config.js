var config = {
  conventions: {
    assets:   /^(app)(\\|\/)(assets)/,
    ignored:  ['test/**/*.js','app/scss/components/*.scss']
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
        'assets/js/pages/account/account.js': "app/pages/account/account.js",
        'assets/js/pages/games/heartbeat.js': "app/pages/games/heartbeat.js",
        'assets/js/pages/games/smashdot.js': "app/pages/games/smashdot.js"
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
      'cp config.development.js app/config.js'
    ],
    afterBrunch: [
      'gulp'
    ]
  },

  overrides: {
    production: {
      plugins: {
        beforeBrunch: [
          'cp config.production.js app/config.js'
        ],
        afterBrunch: [
          'gulp --production'
        ]
      }
    }
  }
};

// LEARNING ABCs
for (var i = 65; i <= 90; i++) {
  var letter = String.fromCharCode(i).toLowerCase();
  var path = 'pages/learn/abc/' + letter + '.js';
  config.files.javascripts.joinTo['assets/js/' + path] = 'app/' + path;
}

module.exports = config;
