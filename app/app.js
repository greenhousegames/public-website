import $ from 'jquery';
import FirebaseClient from './firebase-client';

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
    },
    loginSuccess: (data) => {
      if (data.user && !data.user.isAnonymous) {
        $('img.user-image').attr('src', data.user.photoURL);
        $('img.user-image').show();
        $('.user-image-guest').hide();
        $('.user-name').text(data.user.displayName);
      } else {
        $('img.user-image').attr('src', '');
        $('img.user-image').hide();
        $('.user-image-guest').show();
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
    console.log(user);
    if (user) {
      window.GreenhouseGames.authHelpers.loginSuccess({user: user});
    } else {
      window.GreenhouseGames.authHelpers.hideAuth();
    }
  });
});

import './google-analytics';
