'use strict';

var gulp = require('gulp');
var panini = require('panini');
var rimraf = require('rimraf');
var yaml = require('js-yaml');
var fs = require('fs');
var argv = require('yargs').argv;
var runSequence = require('run-sequence');

var config = loadConfig();

var production = !!argv.production;
var DIST = 'public';

function loadConfig() {
  var config = {};

  var ymlFile = fs.readFileSync('./app/data/gamepaths.yml', 'utf8');
  config.gamepaths = yaml.load(ymlFile);

  ymlFile = fs.readFileSync('./app/data/games.yml', 'utf8');
  config.games = yaml.load(ymlFile);

  return config;
}

function initGames() {
  var copies = [];
  for (var i = 0; i < config.games.length; i++) {
    createGameTask(config.games[i])
    copies.push(config.games[i]);
  }
  return copies;
}

function createGameTask(game) {
  var src, dest;
  if (production) {
    src = config.gamepaths[game].src_release;
  } else {
    src = config.gamepaths[game].src_debug;
  }
  dest = DIST + '/' + config.gamepaths[game].dist;
  gulp.task(game, function() {
    return gulp.src(src)
      .pipe(gulp.dest(dest));
  });
}

// Build the "dist" folder by running all of the below tasks
gulp.task('default', ['pages'], function(cb) {
  runSequence(initGames(), cb);
});

// Delete the "dist" folder
// This happens every time a build starts
gulp.task('clean', function(done) {
  rimraf(DIST, done);
});

// Copy page templates into finished HTML files
gulp.task('pages', ['clean'], function() {
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
    .pipe(gulp.dest(DIST));
});
