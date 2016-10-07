'use strict';

var gulp = require('gulp');
var panini = require('panini');
var rimraf = require('rimraf');
var yaml = require('js-yaml');
var fs = require('fs');

var PATHS = loadConfig().PATHS;

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

function initGames() {
  var copies = [];
  for (var game in PATHS.games) {
    copies.push(createGameTask(game));
  }
  return copies;
}

function createGameTask(game) {
  var src = 'node_modules/@greenhousegames/' + PATHS.games[game].npm + '/dist/www/**/*';
  var dest = PATHS.dist + '/' + PATHS.games[game].dist + '/play';
  return function() {
    return gulp.src(src)
      .pipe(gulp.dest(dest));
  };
}

// Build the "dist" folder by running all of the below tasks
gulp.task('default',
 gulp.series(clean, gulp.parallel(pages, initGames())));

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
  rimraf(PATHS.dist, done);
}

// Copy page templates into finished HTML files
function pages() {
  return gulp.src('app/html/pages/**/*.{html,hbs,handlebars}')
    .pipe(panini({
      root: 'app/html/pages/',
      layouts: 'app/html/layouts/',
      partials: 'app/html/partials/',
      data: 'app/html/data/',
      helpers: 'app/html/helpers/'
    }))
    .pipe(gulp.dest(PATHS.dist));
}
