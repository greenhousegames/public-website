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

if (window.GreenhouseGames.account) {
  initAccountPage();
}

if (window.GreenhouseGames.reporting) {
  initGamePage();
}


/*
 * AUTH HELPERS
 */
function showAuth() {
  if (window.GreenhouseGames.account) {
    jQuery('#' + window.GreenhouseGames.account.sections.loggedOut).hide();
    jQuery('#' + window.GreenhouseGames.account.sections.loggedIn).show();
  }
}

function hideAuth() {
  if (window.GreenhouseGames.account) {
    jQuery('#' + window.GreenhouseGames.account.sections.loggedOut).show();
    jQuery('#' + window.GreenhouseGames.account.sections.loggedIn).hide();
  }
  jQuery('#user_header').text('Login');
}

function loginSuccess(data) {
  if (window.GreenhouseGames.account) {
    jQuery('#' + window.GreenhouseGames.account.user.image).attr('src', data.user.photoURL);
    jQuery('#' + window.GreenhouseGames.account.user.name).text(data.user.displayName);
  }
  jQuery('#user_header').text(data.user.displayName);
  showAuth();
}

function loginError(err) {
  console.log(err);
}

/*
 * PAGE HELPERS
 */
function initAccountPage() {
  jQuery('section.main').addClass('subpage');

  // init buttons
  jQuery('#' + window.GreenhouseGames.account.buttons.logout).click(() => client.signOut().then(hideAuth).catch(hideAuth));
  jQuery('#' + window.GreenhouseGames.account.buttons.twitter).click(() => client.signInWithPopup('twitter').then(loginSuccess).catch(loginError));
  jQuery('#' + window.GreenhouseGames.account.buttons.facebook).click(() => client.signInWithPopup('facebook').then(loginSuccess).catch(loginError));
  jQuery('#' + window.GreenhouseGames.account.buttons.google).click(() => client.signInWithPopup('google'));
  jQuery('#' + window.GreenhouseGames.account.buttons.github).click(() => client.signInWithPopup('github').then(loginSuccess).catch(loginError));
}

function initGamePage() {
  jQuery('section.main').addClass('subpage');

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
