import GameReporting from '@greenhousegames/smash-dot/dist/reporting';
import FirebaseClient from '../firebase-client';
import rsvp from 'rsvp';

class Reporting extends FirebaseClient {
  constructor() {
    super();
    this.requireAuth();
  }

  loadCharts(done) {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(done);
  }

  draw() {
    this.requireAuth().then(() => {
      this._draw();
    });
  }

  _draw() {
    var reporting = new GameReporting(this.firebase);

    var gamesPlayedQuery = reporting.where().sum('played').select(1);
    var usersPlayedQuery = reporting.where('users').sum('played').count();
    var lastPlayedQuery = reporting.where().last('endedAt').select(1);
    var survivalPlayed = reporting.where('modes', { mode: 'survival' }).sum('played').value();
    var battlePlayed = reporting.where('modes', { mode: 'battle' }).sum('played').value();
    var classicPlayed = reporting.where('modes', { mode: 'classic' }).sum('played').value();
    var survivalMax = reporting.where('modes', { mode: 'survival' }).max('survival-score').value();
    var battleMax = reporting.where('modes', { mode: 'battle' }).max('battle-score').value();
    var classicMax = reporting.where('modes', { mode: 'classic' }).max('classic-score').value();

    gamesPlayedQuery.then(function(values) {
      jQuery('#game_played_count').text(values[0] || 0);
    }).catch(function(err) { console.log(err); });

    usersPlayedQuery.then(function(total) {
      jQuery('#user_played_count').text(total);
    }).catch(function(err) { console.log(err); });

    lastPlayedQuery.then(function(values) {
      if (!values) {
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