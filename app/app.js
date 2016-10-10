import $ from 'jquery';
import './reporting';
import FirebaseClient from './firebase-client';

$(document).foundation();

if (window.GreenhouseGames.account) {
  jQuery('section.main').addClass('subpage');

  var client = new FirebaseClient();
  initAuth();

  // init buttons
  jQuery('#' + window.GreenhouseGames.account.buttons.logout).click(() => client.signOut().then(hideAuth).catch(hideAuth));
  jQuery('#' + window.GreenhouseGames.account.buttons.twitter).click(() => client.signInWithPopup('twitter').then(loginSuccess).catch(loginError));
  jQuery('#' + window.GreenhouseGames.account.buttons.facebook).click(() => client.signInWithPopup('facebook').then(loginSuccess).catch(loginError));
  jQuery('#' + window.GreenhouseGames.account.buttons.google).click(() => client.signInWithPopup('google').then(loginSuccess).catch(loginError));
  jQuery('#' + window.GreenhouseGames.account.buttons.github).click(() => client.signInWithPopup('github').then(loginSuccess).catch(loginError));

  function initAuth() {
    client.waitForAuth().then((user) => {
      if (user && !user.isAnonymous) {
        // show user info and logout button
        loginSuccess({user: user});
      } else {
        // show login buttons
        hideAuth();
      }
    });
  }

  function showAuth() {
    jQuery('#' + window.GreenhouseGames.account.sections.loggedOut).hide();
    jQuery('#' + window.GreenhouseGames.account.sections.loggedIn).show();
  }

  function hideAuth() {
    jQuery('#' + window.GreenhouseGames.account.sections.loggedOut).show();
    jQuery('#' + window.GreenhouseGames.account.sections.loggedIn).hide();
  }

  function loginSuccess(data) {
    jQuery('#' + window.GreenhouseGames.account.user.image).attr('src', data.user.photoURL);
    jQuery('#' + window.GreenhouseGames.account.user.name).text(data.user.displayName);

    showAuth();
  }

  function loginError(err) {
    console.log(err);
  }
}

if (window.GreenhouseGames.reporting) {
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
