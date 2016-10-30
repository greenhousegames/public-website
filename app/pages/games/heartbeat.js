import GameReporting from '@greenhousegames/heartbeat/dist/reporting';
import FirebaseClient from 'firebase-client.js';

class Reporting extends FirebaseClient {
  constructor() {
    super();
    this.reporting = new GameReporting(this.firebase.database().ref('games/heartbeat/data'), this.firebase.database().ref('games/heartbeat/reporting'));
  }

  draw() {
    // metrics
    this._drawGamePlayed();
    this._drawUsersPlayed();
    this._drawLastPlayed();
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
        jQuery('#last_played_timestamp').attr('datetime', date.toISOString());
        jQuery('#last_played_timestamp').timeago();
      }
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
