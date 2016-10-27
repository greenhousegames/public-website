import $ from 'jquery';
import FirebaseClient from './firebase-client';

$(document).foundation();

window.GreenhouseGames = {
  client: new FirebaseClient(),
  authHelpers: {
    showAuth: () => {
      $('.show-auth').show();
      $('.hide-auth').hide();
    },
    hideAuth: () => {
      $('.hide-auth').show();
      $('.show-auth').hide();
      $('span.user-name').text('Login');
    },
    loginSuccess: (data) => {
      $('#user_image').attr('src', data.user.photoURL);
      $('#user_name').text(data.user.displayName);
      $('span.user-name').text(data.user.displayName);
      window.GreenhouseGames.authHelpers.showAuth();
    },
    loginError: (err) => {
      console.log(err);
    }
  }
};

window.GreenhouseGames.client.firebase.auth().onAuthStateChanged((user) => {
  if (user && !user.isAnonymous) {
    window.GreenhouseGames.authHelpers.loginSuccess({user: user});
  } else {
    window.GreenhouseGames.authHelpers.hideAuth();
  }
});

// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-85526007-1', 'auto');
ga('send', 'pageview');

/*
function initGamePage() {
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
*/
