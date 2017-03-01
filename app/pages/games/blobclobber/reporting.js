import GameReporting from '@greenhousegames/smash-dot/dist/reporting';
import FirebaseClient from 'firebase-client.js';

class Reporting extends FirebaseClient {
  constructor() {
    super();
    this.reporting = new GameReporting(this.firebase.database().ref('games/smashdot/data'), this.firebase.database().ref('games/smashdot/reporting'));
  }

  draw() {
    // metrics
    this._drawGamePlayed();
    this._drawUsersPlayed();
    this._drawLastPlayed();

    // rankings
    this._drawClassicRankings();
    this._drawSurvivalRankings();

    // charts
    this._drawMaxScores();
    this._drawModesPlayed();
    this._drawDotsSmashed();
    this._drawUserBreakdown();
  }

  _drawClassicRankings() {
    this.reporting.filter('users').max('classic-score').count().then((value) => {
      jQuery('#classic_ranking2').text('of ' + value);
    }).catch(function(err) { console.log(err); });

    this.reporting.filter('users-modes', {
      uid: this.currentUID(),
      mode: 'classic'
    }).max('classic-score').value().then((pr) => {
      if (pr) {
        this.reporting.filter('users', {
          uid: this.currentUID()
        }).max('classic-score').greater(pr).count().then((value) => {
          jQuery('#classic_ranking1').text('#' + value);
        });
      } else {
        jQuery('#classic_ranking1').text('N/A');
      }
    }).catch(function(err) { console.log(err); });
  }

  _drawSurvivalRankings() {
    this.reporting.filter('users').min('survival-duration').count().then((value) => {
      jQuery('#survival_ranking2').text('of ' + value);
    }).catch(function(err) { console.log(err); });

    this.reporting.filter('users-modes', {
      uid: this.currentUID(),
      mode: 'survival'
    }).min('survival-duration').value().then((pr) => {
      if (pr) {
        this.reporting.filter('users', {
          uid: this.currentUID()
        }).min('survival-duration').greater(pr).count().then((value) => {
          jQuery('#survival_ranking1').text('#' + value);
        });
      } else {
        jQuery('#survival_ranking1').text('N/A');
      }
    }).catch(function(err) { console.log(err); });
  }

  _drawGamePlayed() {
    this.reporting.filter().sum('played').select(1).then(function(values) {
      jQuery('#game_played_count').text(values[0] || 0);
    }).catch(function(err) { console.log(err); });
  }

  _drawUsersPlayed() {
    this.reporting.filter('users').sum('played').count().then(function(total) {
      jQuery('#user_played_count').text(total);
    }).catch(function(err) { console.log(err); });
  }

  _drawLastPlayed() {
    this.reporting.filter().last('endedAt').select(1).then(function(values) {
      if (!values[0]) {
        jQuery('#last_played_timestamp').text('never');
      } else {
        var date = new Date();
        date.setTime(values[0]);
        jQuery('#last_played_timestamp').html('<time datetime="' + date.toISOString() + '"></time>');
        jQuery('#last_played_timestamp time').timeago();
      }
    }).catch(function(err) { console.log(err); });
  }

  _drawModesPlayed() {
    Promise.all([
      this.reporting.filter('modes', { mode: 'classic' }).sum('played').value(),
      this.reporting.filter('modes', { mode: 'survival' }).sum('played').value(),
      this.reporting.filter('modes', { mode: 'battle' }).sum('played').value()
    ]).then(function(values) {
      var element = jQuery('#sum_played_chart');
      var data = new google.visualization.arrayToDataTable([
        ['Mode', 'Times Played'],
        ['Classic', values[0] || 0],
        ['Survival', values[1] || 0],
        ['Battle', values[2] || 0]
      ]);

      // Set chart options
      var options = {
         title:'Games Played',
         width: element.width(),
         height: element.width()*9/16,
         legend: { position: 'bottom' }
      };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.PieChart(element[0]);
      chart.draw(data, options);
    }).catch(function(err) { console.log(err); });
  }

  _drawUserBreakdown() {
    Promise.all([
      this.reporting.filter('users-modes').max('classic-score').greater(0).count(),
      this.reporting.filter('users-modes').max('survival-score').greater(0).count(),
      this.reporting.filter('users-modes').max('battle-score').greater(0).count()
    ]).then(function(values) {
      var element = jQuery('#user_breakdown_chart');
      var data = new google.visualization.arrayToDataTable([
        ['Mode', 'Users'],
        ['Classic', values[0] || 0],
        ['Survival', values[1] || 0],
        ['Battle', values[2] || 0]
      ]);

      // Set chart options
      var options = {
         title:'Unique Users',
         width: element.width(),
         height: element.width()*9/16,
         legend: { position: 'bottom' }
      };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.PieChart(element[0]);
      chart.draw(data, options);
    }).catch(function(err) { console.log(err); });
  }

  _drawDotsSmashed() {
    Promise.all([
      this.reporting.filter('modes', { mode: 'classic' }).sum('classic-circles').value(),
      this.reporting.filter('modes', { mode: 'survival' }).sum('survival-circles').value(),
      this.reporting.filter('modes', { mode: 'battle' }).sum('battle-circles').value()
    ]).then(function(values) {
      var element = jQuery('#dots_smashed_chart');
      var data = new google.visualization.arrayToDataTable([
        ['Mode', 'Dots Smashed'],
        ['Classic', values[0] || 0],
        ['Survival', values[1] || 0],
        ['Battle', values[2] || 0]
      ]);

      // Set chart options
      var options = {
         title:'Dots Smashed',
         width: element.width(),
         height: element.width()*9/16,
         pieHole: 0.4,
         legend: { position: 'bottom' }
      };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.ColumnChart(element[0]);
      chart.draw(data, options);
    }).catch(function(err) { console.log(err); });
  }

  _drawMaxScores() {
    Promise.all([
      this.reporting.filter('modes', { mode: 'classic' }).max('classic-score').value(),
      this.reporting.filter('modes', { mode: 'survival' }).max('survival-score').value(),
      this.reporting.filter('modes', { mode: 'battle' }).max('battle-score').value()
    ]).then(function(values) {
      var element = jQuery('#max_score_chart');
      var data = new google.visualization.arrayToDataTable([
        ['Mode', 'Max Score'],
        ['Classic', values[0] || 0],
        ['Survival', values[1] || 0],
        ['Battle', values[2] || 0]
      ]);

      // Set chart options
      var options = {
        title:'Max Scores',
        width: element.width(),
        height: element.width()*9/16,
        legend: { position: 'bottom' }
      };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.ColumnChart(element[0]);
      chart.draw(data, options);
    }).catch(function(err) { console.log(err); });
  }
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(() => {
  var report = new Reporting();
  report.requireAuth().then(() => {
    $(document).ready(() => {
      report.draw();

      $(window).resize(() => {
        report.draw();
      });
    });
  });
});
