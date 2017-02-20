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
        $('div.user-image').html('<img src="' + data.user.photoURL + '">');
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
  window.GreenhouseGames.client.firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      window.GreenhouseGames.authHelpers.loginSuccess({user: user});
    } else {
      window.GreenhouseGames.authHelpers.hideAuth();
    }
  });

  $(document).foundation();
});

import './google-analytics';

// facebook
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=1193182344132806";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
