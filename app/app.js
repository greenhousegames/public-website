import $ from 'jquery';
import './reporting';
import FirebaseClient from './firebase-client';

$(document).foundation();

const client = new FirebaseClient();
client.firebase.auth().onAuthStateChanged((user) => {
  if (user && !user.isAnonymous) {
    loginSuccess({user: user});
  } else {
    hideAuth();
  }
});

if (!window.GreenhouseGames.root) {
  jQuery('section.main').addClass('subpage');
}

if (window.GreenhouseGames.account) {
  initAccountPage();
}

if (window.GreenhouseGames.reporting) {
  initGamePage();
}

// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-85526007-1', 'auto');
ga('send', 'pageview');

/*
 * AUTH HELPERS
 */
function showAuth() {
  jQuery('.show-auth').show();
  jQuery('.hide-auth').hide();
}

function hideAuth() {
  jQuery('.hide-auth').show();
  jQuery('.show-auth').hide();
  jQuery('span.user-name').text('Login');
}

function loginSuccess(data) {
  if (window.GreenhouseGames.account) {
    jQuery('#' + window.GreenhouseGames.account.user.image).attr('src', data.user.photoURL);
    jQuery('#' + window.GreenhouseGames.account.user.name).text(data.user.displayName);
  }
  jQuery('span.user-name').text(data.user.displayName);
  showAuth();
}

function loginError(err) {
  console.log(err);
}

/*
 * PAGE HELPERS
 */
function initAccountPage() {
  // init buttons
  jQuery('#' + window.GreenhouseGames.account.buttons.logout).click(() => client.signOut().then(hideAuth).catch(hideAuth));
  jQuery('#' + window.GreenhouseGames.account.buttons.twitter).click(() => client.signInWithPopup('twitter').then(loginSuccess).catch(loginError));
  jQuery('#' + window.GreenhouseGames.account.buttons.facebook).click(() => client.signInWithPopup('facebook').then(loginSuccess).catch(loginError));
  jQuery('#' + window.GreenhouseGames.account.buttons.google).click(() => client.signInWithPopup('google'));
  jQuery('#' + window.GreenhouseGames.account.buttons.github).click(() => client.signInWithPopup('github').then(loginSuccess).catch(loginError));
}

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
