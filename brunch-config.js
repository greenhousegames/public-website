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
          'bower_components/jquery/dist/jquery.js',
          'bower_components/what-input/what-input.js',
          'bower_components/foundation-sites/dist/foundation.js'
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
          'bower_components/foundation-sites/scss',
          'bower_components/motion-ui/src'
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
