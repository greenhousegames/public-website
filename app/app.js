import $ from 'jquery';
import './reporting';

$(document).foundation();

if (window.GreenhouseGames.reporting) {
  var Reporting = require('reporting/' + window.GreenhouseGames.reporting + '.js');
  var report = new Reporting();
  report.loadCharts(() => {
    $(document).ready(() => {
      report.draw();

      $(window).resize(() => {
        report.draw();
      });
    });
  });
}
