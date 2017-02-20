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
        $('img.user-image').attr('src', data.user.photoURL);
        $('img.user-image').removeClass('hidden');
        $('.user-image-guest').addClass('hidden');
        $('.user-name').text(data.user.displayName);
      } else {
        $('img.user-image').attr('src', '');
        $('img.user-image').addClass('hidden');
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
  window.GreenhouseGames.client.firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      window.GreenhouseGames.authHelpers.loginSuccess({user: user});
    } else {
      window.GreenhouseGames.authHelpers.hideAuth();
    }
  });
});

import './google-analytics';
