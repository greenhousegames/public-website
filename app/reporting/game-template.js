import GameReporting from '@greenhousegames/game-template/dist/reporting';
import FirebaseClient from '../firebase-client';
import rsvp from 'rsvp';

class Reporting extends FirebaseClient {
  constructor() {
    super();
    this.reporting = new GameReporting(this.firebase.database().ref('games/game-template/data'), this.firebase.database().ref('games/game-template/reporting'));
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
    var gamesPlayedQuery = this.reporting.filter().sum('played').select(1);
    var usersPlayedQuery = this.reporting.filter('users').sum('played').count();
    var lastPlayedQuery = this.reporting.filter().last('endedAt').select(1);
    var aClickedQuery = this.reporting.filter().sum('aclicked').value();
    var bClickedQuery = this.reporting.filter().sum('bclicked').value();

    var queryStartTime = new Date();
    queryStartTime.setMinutes(0);
    queryStartTime.setSeconds(0);
    queryStartTime.setMilliseconds(0);
    var queryEndTime = new Date();
    queryEndTime.setTime(queryStartTime.getTime());
    queryEndTime.setHours(queryStartTime.getHours() + 1);
    var aClickedThisHourQuery = this.reporting.filter().sum('aclicked').during(queryStartTime.getTime(), queryEndTime.getTime(), 'minute').valuesAsArray();
    var bClickedThisHourQuery = this.reporting.filter().sum('bclicked').during(queryStartTime.getTime(), queryEndTime.getTime(), 'minute').valuesAsArray();

    queryStartTime.setHours(0);
    queryEndTime.setTime(queryStartTime.getTime());
    queryEndTime.setDate(queryStartTime.getDate() + 1);
    var aClickedTodayQuery = this.reporting.filter().sum('aclicked').during(queryStartTime.getTime(), queryEndTime.getTime(), 'hour').valuesAsArray();
    var bClickedTodayQuery = this.reporting.filter().sum('bclicked').during(queryStartTime.getTime(), queryEndTime.getTime(), 'hour').valuesAsArray();

    queryStartTime.setDate(1);
    queryEndTime.setTime(queryStartTime.getTime());
    queryEndTime.setMonth(queryStartTime.getMonth() + 1);
    var aClickedMonthQuery = this.reporting.filter().sum('aclicked').during(queryStartTime.getTime(), queryEndTime.getTime(), 'day').valuesAsArray();
    var bClickedMonthQuery = this.reporting.filter().sum('bclicked').during(queryStartTime.getTime(), queryEndTime.getTime(), 'day').valuesAsArray();

    queryStartTime.setMonth(1);
    queryEndTime.setTime(queryStartTime.getTime());
    queryEndTime.setFullYear(queryStartTime.getFullYear() + 1);
    var aClickedYearQuery = this.reporting.filter().sum('aclicked').during(queryStartTime.getTime(), queryEndTime.getTime(), 'week').valuesAsArray();
    var bClickedYearQuery = this.reporting.filter().sum('bclicked').during(queryStartTime.getTime(), queryEndTime.getTime(), 'week').valuesAsArray();

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

    rsvp.all([aClickedQuery, bClickedQuery]).then(function(values) {
      var element = jQuery('#pie_chart_div');
      var data = new google.visualization.arrayToDataTable([
        ['Button', 'Times Clicked'],
        ['A', values[0]],
        ['B', values[1]]
      ]);

      // Set chart options
      var options = {
         title:'Buttons Clicked',
         width: element.width(),
         height: 400,
         legend: { position: 'bottom' }
      };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.PieChart(element[0]);
      chart.draw(data, options);
    });

    rsvp.all([aClickedThisHourQuery, bClickedThisHourQuery]).then(function(values) {
      var element = jQuery('#line_chart_div');
      var chartdata = [['Time', 'A', 'B']];
      for (var i = 0; i < values[0].length; i++) {
        chartdata.push([new Date(values[0][i].timestamp), values[0][i].value, values[1][i].value]);
      }
      var data = new google.visualization.arrayToDataTable(chartdata);

      // Set chart options
      var options = {
         title:'Buttons Clicked this Hour',
         width: element.width(),
         height: 400,
         legend: { position: 'bottom' }
      };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.LineChart(element[0]);
      chart.draw(data, options);
    });

    rsvp.all([aClickedTodayQuery, bClickedTodayQuery]).then(function(values) {
      var element = jQuery('#line_chart_div2');
      var chartdata = [['Time', 'A', 'B']];
      for (var i = 0; i < values[0].length; i++) {
        chartdata.push([new Date(values[0][i].timestamp), values[0][i].value, values[1][i].value]);
      }
      var data = new google.visualization.arrayToDataTable(chartdata);

      // Set chart options
      var options = {
         title:'Buttons Clicked Today',
         width: element.width(),
         height: 400,
         legend: { position: 'bottom' }
      };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.LineChart(element[0]);
      chart.draw(data, options);
    });

    rsvp.all([aClickedMonthQuery, bClickedMonthQuery]).then(function(values) {
    var element = jQuery('#line_chart_div3');
      var chartdata = [['Time', 'A', 'B']];
      for (var i = 0; i < values[0].length; i++) {
        chartdata.push([new Date(values[0][i].timestamp), values[0][i].value, values[1][i].value]);
      }
      var data = new google.visualization.arrayToDataTable(chartdata);

      // Set chart options
      var options = {
         title:'Buttons Clicked this Month',
         width: element.width(),
         height: 400,
         legend: { position: 'bottom' }
      };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.LineChart(element[0]);
      chart.draw(data, options);
    });

    rsvp.all([aClickedYearQuery, bClickedYearQuery]).then(function(values) {
      var element = jQuery('#line_chart_div4');
      var chartdata = [['Time', 'A', 'B']];
      for (var i = 0; i < values[0].length; i++) {
        chartdata.push([new Date(values[0][i].timestamp), values[0][i].value, values[1][i].value]);
      }
      var data = new google.visualization.arrayToDataTable(chartdata);

      // Set chart options
      var options = {
         title:'Buttons Clicked this Year',
         width: element.width(),
         height: 400,
         legend: { position: 'bottom' }
      };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.LineChart(element[0]);
      chart.draw(data, options);
    });
  }
}

module.exports = Reporting;
