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
        $('div.user-image').html('<img alt="User Profile Image" src="' + data.user.photoURL + '">');
        $('.user-image-guest').addClass('hidden');
        $('.user-name').text(data.user.displayName);
      } else {
        $('div.user-image').html('');
        $('.user-image-guest').removeClass('hidden');
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

  // FOUNADTION
  $(document).foundation();
});

import './google-analytics';
