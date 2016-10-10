import GameReporting from '@greenhousegames/smash-dot/dist/reporting';
import FirebaseClient from '../firebase-client';
import rsvp from 'rsvp';

class Reporting extends FirebaseClient {
  constructor() {
    super();
    this.reporting = new GameReporting(this.firebase.database().ref('games/smashdot/data'), this.firebase.database().ref('games/smashdot/reporting'));
  }

  loadCharts(done) {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(done);
  }

  draw() {
    this.requireAuth().then(() => {
      this._draw();
      this._drawClassicRankings();
      this._drawSurvivalRankings();
    });
  }

  _drawClassicRankings() {
    const prQuery = this.reporting.filter('users-modes', {
      uid: this.currentUID(),
      mode: 'classic'
    }).max('classic-score').value();

    prQuery.then((pr) => {
      if (pr) {
        const totalQuery = this.reporting.filter('users').max('classic-score').count();
        const rankingQuery = this.reporting.filter('users', {
          uid: this.currentUserUID()
        }).max('classic-score').greater(pr).count();

        rsvp.all([rankingQuery, totalQuery]).then((values) => {
          jQuery('#classic_ranking').text('#' + values[0] + ' of ' + values[1]);
        });
      } else {
        jQuery('#classic_ranking').text('N/A');
      }
    }).catch(function(err) { console.log(err); });
  }

  _drawSurvivalRankings() {
    const prQuery = this.reporting.filter('users-modes', {
      uid: this.currentUID(),
      mode: 'survival'
    }).max('survival-duration').value();

    prQuery.then((pr) => {
      if (pr) {
        const totalQuery = this.reporting.filter('users').max('survival-duration').count();
        const rankingQuery = this.reporting.filter('users', {
          uid: this.game.greenhouse.auth.currentUserUID()
        }).max('survival-duration').greater(pr).count();

        rsvp.all([rankingQuery, totalQuery]).then((values) => {
          jQuery('#survival_ranking').text('#' + values[0] + ' of ' + values[1]);
        });
      } else {
        jQuery('#survival_ranking').text('N/A');
      }
    }).catch(function(err) { console.log(err); });
  }

  _draw() {
    var gamesPlayedQuery = this.reporting.filter().sum('played').select(1);
    var usersPlayedQuery = this.reporting.filter('users').sum('played').count();
    var lastPlayedQuery = this.reporting.filter().last('endedAt').select(1);
    var survivalPlayed = this.reporting.filter('modes', { mode: 'survival' }).sum('played').value();
    var battlePlayed = this.reporting.filter('modes', { mode: 'battle' }).sum('played').value();
    var classicPlayed = this.reporting.filter('modes', { mode: 'classic' }).sum('played').value();
    var survivalMax = this.reporting.filter('modes', { mode: 'survival' }).max('survival-score').value();
    var battleMax = this.reporting.filter('modes', { mode: 'battle' }).max('battle-score').value();
    var classicMax = this.reporting.filter('modes', { mode: 'classic' }).max('classic-score').value();

    gamesPlayedQuery.then(function(values) {
      jQuery('#game_played_count').text(values[0] || 0);
    }).catch(function(err) { console.log(err); });

    usersPlayedQuery.then(function(total) {
      jQuery('#user_played_count').text(total);
    }).catch(function(err) { console.log(err); });

    lastPlayedQuery.then(function(values) {
      if (!values[0]) {
        jQuery('#last_played_count').text('never');
      } else {
        var date = new Date();
        date.setTime(values[0]);
        jQuery('#last_played_count').text(date.toLocaleString());
      }
    }).catch(function(err) { console.log(err); });

    rsvp.all([survivalPlayed, classicPlayed, battlePlayed]).then(function(values) {
      var element = jQuery('#line_chart_div4');
      var data = new google.visualization.arrayToDataTable([
        ['Mode', 'Times Played'],
        ['Survival', values[0]],
        ['Classic', values[1]],
        ['Battle', values[2]]
      ]);

      // Set chart options
      var options = {
         title:'Games Played',
         width: element.width(),
         height: 400,
         pieHole: 0.4,
         legend: { position: 'bottom' }
      };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.PieChart(element[0]);
      chart.draw(data, options);
    });

    rsvp.all([survivalMax, classicMax, battleMax]).then(function(values) {
      var element = jQuery('#line_chart_div4');
      var data = new google.visualization.arrayToDataTable([
        ['Mode', 'Max Score'],
        ['Survival', values[0]],
        ['Classic', values[1]],
        ['Battle', values[2]]
      ]);

      // Set chart options
      var options = {
        title:'Max Scores',
        width: element.width(),
        height: 400,
        legend: { position: 'bottom' }
      };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.ColumnChart(element[0]);
      chart.draw(data, options);
    });
  }
}

module.exports = Reporting;
