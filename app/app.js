import FirebaseReporting from 'firebase-reporting';
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
  requireAuth() {
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
  reporting: (game) => {
    const reporting = new FirebaseReporting({
      firebase: firebaseInst.database().ref('reporting').child(game)
    });

    reporting.addFilter('modes', ['mode']);
    reporting.addFilter('users', ['uid']);
    reporting.addFilter('users-modes', ['mode', 'uid']);

    reporting.addMetric('endedAt', ['first', 'last']);
    reporting.addMetric('played', ['sum']);
    reporting.addMetric('classic-score', ['max']);
    reporting.addMetric('battle-score', ['max']);
    reporting.addMetric('survival-duration', ['min']);
    reporting.addMetric('win', ['sum']);
    reporting.addMetric('loss', ['sum']);
    reporting.addMetric('tie', ['sum']);

    return reporting;
  }
};

$(document).foundation();
