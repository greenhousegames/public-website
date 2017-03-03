import $ from 'jquery';
import FirebaseClient from './firebase-client';

window.GreenhouseGames = {
  client: new FirebaseClient(),
  authHelpers: {
    showAuth: () => {
      $('.show-auth').removeClass('hidden');
      $('.hide-auth').addClass('hidden');
    },
    hideAuth: () => {
      $('.hide-auth').removeClass('hidden');
      $('.show-auth').addClass('hidden');
    },
    loginSuccess: (data) => {
      if (data.user && !data.user.isAnonymous) {
        $('a.account-link').html('<div class="thumbnail-image user-image"></div>' + data.user.displayName);
        $('div.user-image').html('<img alt="User Profile Image" src="' + data.user.photoURL + '">');
        $('.user-name').text(data.user.displayName);
      } else {
        $('a.account-link').html('<i class="material-icons">person</i>Guest');
        $('div.user-image').html('<i class="material-icons">person</i>');
        $('.user-name').text('Guest');
      }

      window.GreenhouseGames.authHelpers.showAuth();
    },
    loginError: (err) => {
      console.log(err);
    }
  }
};

$(document).ready(() => {
  // AUTH
  window.GreenhouseGames.client.firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      window.GreenhouseGames.authHelpers.loginSuccess({user: user});
    } else {
      window.GreenhouseGames.authHelpers.hideAuth();
    }
  });

  // HEADER
  $('#header-logout-button').click(() => {
    window.GreenhouseGames.client.signOut().then(window.GreenhouseGames.authHelpers.hideAuth).catch(window.GreenhouseGames.authHelpers.hideAuth);
  });

  // ACCOUNT
  $('#logout_button').click(() => window.GreenhouseGames.client.signOut().then(window.GreenhouseGames.authHelpers.hideAuth));
  $('#twitterLogin_button').click(() => window.GreenhouseGames.client.signInWithPopup('twitter').then(window.GreenhouseGames.authHelpers.loginSuccess).catch(window.GreenhouseGames.authHelpers.loginError));
  $('#facebookLogin_button').click(() => window.GreenhouseGames.client.signInWithPopup('facebook').then(window.GreenhouseGames.authHelpers.loginSuccess).catch(window.GreenhouseGames.authHelpers.loginError));
  $('#guestLogin_button').click(() => window.GreenhouseGames.client.signInAnonymously().then(window.GreenhouseGames.authHelpers.loginSuccess).catch(window.GreenhouseGames.authHelpers.loginError));

  // FOUNADTION
  $(document).foundation();
});

import './google-analytics';
