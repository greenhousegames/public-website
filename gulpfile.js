'use strict';

var gulp = require('gulp');
var panini = require('panini');
var rimraf = require('rimraf');
var yaml = require('js-yaml');
var fs = require('fs');
var argv = require('yargs').argv;
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();

var config = loadConfig();

var production = !!argv.production;
var DIST = 'public';

function loadConfig() {
  var config = {};

  var ymlFile = fs.readFileSync('./app/data/games.yml', 'utf8');
  config.games = yaml.load(ymlFile);

  return config;
}

function initGames() {
  var copies = [];
  for (var key in config.games) {
    createGameTask(key)
    copies.push(key);
  }
  return copies;
}

function createGameTask(game) {
  var src, dest, imgsrc, assetDest, assetTask;
  assetTask = game + '-assets';
  assetDest = DIST + '/assets/img/games/' + game;
  if (production) {
    src = config.games[game].paths.src_release;
  } else {
    src = config.games[game].paths.src_debug;
  }
  imgsrc = config.games[game].paths.screenshot;
  dest = DIST + '/' + config.games[game].paths.dist;

  if (imgsrc) {
    gulp.task(assetTask, function() {
      return gulp.src(imgsrc)
      .pipe($.rename('screenshot.png'))
        .pipe(gulp.dest(assetDest));
    });
  }

  if (src.indexOf('.zip') !== -1) {
    // source is zip file
    gulp.task(game, imgsrc ? [assetTask] : [], function() {
      return gulp.src(src)
        .pipe($.unzip())
        .pipe(gulp.dest(dest));
    });
  } else {
    // source is blob
    gulp.task(game, imgsrc ? [assetTask] : [], function() {
      return gulp.src(src)
        .pipe(gulp.dest(dest));
    });
  }
}

// Build the "dist" folder by running all of the below tasks
gulp.task('default', ['pages'], function(cb) {
  if (production) {
    runSequence(initGames(), 'sitemap', cb);
  } else {
    runSequence(initGames(), cb);
  }
});

// Copy page templates into finished HTML files
gulp.task('pages', function() {
  return gulp.src('app/pages/**/*.{html,hbs,handlebars}')
    .pipe(panini({
      root: 'app/pages/',
      layouts: 'app/layouts/',
      pageLayouts: {
        'learn/abc': 'abc'
      },
      partials: 'app/partials/',
      data: 'app/data/',
      helpers: 'app/helpers/'
    }))
    .pipe($.if(production, $.htmlmin({
      collapseWhitespace: true,
      removeComments: true
    })))
    .pipe(gulp.dest(DIST));
});

gulp.task('sitemap', function() {
  gulp.src(DIST + '/**/*.html', {
          read: false
      })
      .pipe($.sitemap({
          siteUrl: 'https://www.greenhousegames.com'
      }))
      .pipe(gulp.dest(DIST));
});
