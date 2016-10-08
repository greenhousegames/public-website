import $ from 'jquery';
import './reporting';

$(document).foundation();

if (window.GreenhouseGames.reporting) {
  $(document).ready(() => {
    var Reporting = require('reporting/' + window.GreenhouseGames.reporting + '.js');
    new Reporting();
  });
}
