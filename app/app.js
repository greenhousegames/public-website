import GameTemplateReporting from '@greenhousegames/game-template/dist/reporting';
import SmashDotReporting from '@greenhousegames/smash-dot/dist/reporting';
import firebase from 'firebase';
import rsvp from 'rsvp';
import $ from 'jquery';

// Initialize Firebase
const firebaseInst = firebase.initializeApp({
  apiKey: 'AIzaSyDPGXl6Bc8jf_IPlkcVJe6jNlrNz72zaCo',
  authDomain: 'greenhouse-games.firebaseapp.com',
  databaseURL: 'https://greenhouse-games.firebaseio.com',
  storageBucket: 'greenhouse-games.appspot.com',
  messagingSenderId: '832706408675'
});

window.GreenhouseGames = {
  waitForAuth: () => {
    const auth = firebaseInst.auth();
    const promise = new rsvp.Promise((resolve) => {
      const callback = () => {
        off();
        resolve();
      };
      const off = auth.onAuthStateChanged(callback);
    });
    return promise;
  },
  requireAuth: () => {
    const promise = new rsvp.Promise((resolve, reject) => {
      window.GreenhouseGames.waitForAuth().then(() => {
        if (!firebaseInst.auth().currentUser) {
          firebaseInst.auth().signInAnonymously().then(resolve).catch(reject);
        } else {
          resolve();
        }
      }).catch(reject);
    });
    return promise;
  },
  reporting: {
    'game-template': () => new GameTemplateReporting(firebaseInst),
    'smashdot': () => new SmashDotReporting(firebaseInst)
  }
};

window.GreenhouseGames.requireAuth();
$(document).foundation();
