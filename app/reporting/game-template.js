import GameReporting from '@greenhousegames/game-template/dist/reporting';
import FirebaseClient from '../firebase-client';
import rsvp from 'rsvp';

class Reporting extends FirebaseClient {
  constructor() {
    super();

    // Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(() => {
      this.requireAuth().then(() => this.draw()).catch((err) => console.log(err));
    });
  }

  draw() {
    var reporting = new GameReporting(this.firebase);

    var gamesPlayedQuery = reporting.where().sum('played').select(1);
    var usersPlayedQuery = reporting.where('users').sum('played').count();
    var lastPlayedQuery = reporting.where().last('endedAt').select(1);
    var aClickedQuery = reporting.where().sum('aclicked').value();
    var bClickedQuery = reporting.where().sum('bclicked').value();

    var queryStartTime = new Date();
    queryStartTime.setMinutes(0);
    queryStartTime.setSeconds(0);
    queryStartTime.setMilliseconds(0);
    var queryEndTime = new Date();
    queryEndTime.setTime(queryStartTime.getTime());
    queryEndTime.setHours(queryStartTime.getHours() + 1);
    var aClickedThisHourQuery = reporting.where().sum('aclicked').during(queryStartTime.getTime(), queryEndTime.getTime(), 'minute').valuesAsArray();
    var bClickedThisHourQuery = reporting.where().sum('bclicked').during(queryStartTime.getTime(), queryEndTime.getTime(), 'minute').valuesAsArray();

    queryStartTime.setHours(0);
    queryEndTime.setTime(queryStartTime.getTime());
    queryEndTime.setDate(queryStartTime.getDate() + 1);
    var aClickedTodayQuery = reporting.where().sum('aclicked').during(queryStartTime.getTime(), queryEndTime.getTime(), 'hour').valuesAsArray();
    var bClickedTodayQuery = reporting.where().sum('bclicked').during(queryStartTime.getTime(), queryEndTime.getTime(), 'hour').valuesAsArray();

    queryStartTime.setDate(1);
    queryEndTime.setTime(queryStartTime.getTime());
    queryEndTime.setMonth(queryStartTime.getMonth() + 1);
    var aClickedMonthQuery = reporting.where().sum('aclicked').during(queryStartTime.getTime(), queryEndTime.getTime(), 'day').valuesAsArray();
    var bClickedMonthQuery = reporting.where().sum('bclicked').during(queryStartTime.getTime(), queryEndTime.getTime(), 'day').valuesAsArray();

    queryStartTime.setMonth(1);
    queryEndTime.setTime(queryStartTime.getTime());
    queryEndTime.setFullYear(queryStartTime.getFullYear() + 1);
    var aClickedYearQuery = reporting.where().sum('aclicked').during(queryStartTime.getTime(), queryEndTime.getTime(), 'week').valuesAsArray();
    var bClickedYearQuery = reporting.where().sum('bclicked').during(queryStartTime.getTime(), queryEndTime.getTime(), 'week').valuesAsArray();

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
      // Create the data table.
      var data = new google.visualization.arrayToDataTable([
        ['Button', 'Times Clicked'],
        ['A', values[0]],
        ['B', values[1]]
      ]);

      // Set chart options
      var options = {
         title:'Buttons Clicked',
         width: 600,
         height: 400
      };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.PieChart(document.getElementById('pie_chart_div'));
      chart.draw(data, options);
    });

    rsvp.all([aClickedThisHourQuery, bClickedThisHourQuery]).then(function(values) {
      // Create the data table.
      var chartdata = [['Time', 'A', 'B']];
      for (var i = 0; i < values[0].length; i++) {
        chartdata.push([new Date(values[0][i].timestamp), values[0][i].value, values[1][i].value]);
      }
      var data = new google.visualization.arrayToDataTable(chartdata);

      // Set chart options
      var options = {
         title:'Buttons Clicked this Hour',
         width: 600,
         height: 400,
         legend: { position: 'bottom' }
      };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.LineChart(document.getElementById('line_chart_div'));
      chart.draw(data, options);
    });

    rsvp.all([aClickedTodayQuery, bClickedTodayQuery]).then(function(values) {
      // Create the data table.
      var chartdata = [['Time', 'A', 'B']];
      for (var i = 0; i < values[0].length; i++) {
        chartdata.push([new Date(values[0][i].timestamp), values[0][i].value, values[1][i].value]);
      }
      var data = new google.visualization.arrayToDataTable(chartdata);

      // Set chart options
      var options = {
         title:'Buttons Clicked Today',
         width: 600,
         height: 400,
         legend: { position: 'bottom' }
      };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.LineChart(document.getElementById('line_chart_div2'));
      chart.draw(data, options);
    });

    rsvp.all([aClickedMonthQuery, bClickedMonthQuery]).then(function(values) {
      // Create the data table.
      var chartdata = [['Time', 'A', 'B']];
      for (var i = 0; i < values[0].length; i++) {
        chartdata.push([new Date(values[0][i].timestamp), values[0][i].value, values[1][i].value]);
      }
      var data = new google.visualization.arrayToDataTable(chartdata);

      // Set chart options
      var options = {
         title:'Buttons Clicked this Month',
         width: 600,
         height: 400,
         legend: { position: 'bottom' }
      };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.LineChart(document.getElementById('line_chart_div3'));
      chart.draw(data, options);
    });

    rsvp.all([aClickedYearQuery, bClickedYearQuery]).then(function(values) {
      // Create the data table.
      var chartdata = [['Time', 'A', 'B']];
      for (var i = 0; i < values[0].length; i++) {
        chartdata.push([new Date(values[0][i].timestamp), values[0][i].value, values[1][i].value]);
      }
      var data = new google.visualization.arrayToDataTable(chartdata);

      // Set chart options
      var options = {
         title:'Buttons Clicked this Year',
         width: 600,
         height: 400,
         legend: { position: 'bottom' }
      };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.LineChart(document.getElementById('line_chart_div4'));
      chart.draw(data, options);
    });
  }
}

module.exports = Reporting;
