'use strict';

var gulp = require('gulp');
var panini = require('panini');
var rimraf = require('rimraf');
var yaml = require('js-yaml');
var fs = require('fs');
var argv = require('yargs').argv;

var config = loadConfig();

var production = !!argv.production;
var DIST = 'public';

function loadConfig() {
  var config = {};

  var ymlFile = fs.readFileSync('./app/html/data/gamepaths.yml', 'utf8');
  config.gamepaths = yaml.load(ymlFile);

  ymlFile = fs.readFileSync('./app/html/data/games.yml', 'utf8');
  config.games = yaml.load(ymlFile);

  return config;
}

function initGames() {
  var copies = [];
  for (var i = 0; i < config.games.length; i++) {
    copies.push(createGameTask(config.games[i]));
  }
  return copies;
}

function createGameTask(game) {
  var src = 'node_modules/@greenhousegames/' + config.gamepaths[game].npm + '/dist/';
  if (production) {
    src += 'debug';
  } else {
    src += 'production';
  }
  src += 'www/**/*';
  var dest = DIST + '/games/' + config.gamepaths[game].dist + '/play';
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
  rimraf(DIST, done);
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
    .pipe(gulp.dest(DIST));
}
