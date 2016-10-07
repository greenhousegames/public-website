module.exports = {
  conventions: {
    assets:   /^(app)(\\|\/)(assets)/,
    ignored:  ['test/**/*.js','app/scss/components/*.scss']
  },

  files: {
    javascripts: {
      joinTo: {
        'assets/js/vendor.js': /^(?!app)/,
        'assets/js/app.js': /(^app)/
      },
      order: {
        before: [
          'node_modules/jquery/dist/jquery.js',
          'node_modules/what-input/dist/what-input.js',
          'node_modules/foundation-sites/dist/foundation.js'
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
    }
  }
};
