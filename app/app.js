import FirebaseReporting from 'firebase-reporting';
import firebase from 'firebase';

// Initialize Firebase
const firebaseInst = firebase.initializeApp({
  apiKey: 'AIzaSyDPGXl6Bc8jf_IPlkcVJe6jNlrNz72zaCo',
  authDomain: 'greenhouse-games.firebaseapp.com',
  databaseURL: 'https://greenhouse-games.firebaseio.com',
  storageBucket: 'greenhouse-games.appspot.com',
  messagingSenderId: '832706408675'
});

window.GreenhouseGames = {
  reporting: new FirebaseReporting({
    firebase: firebaseInst.database().ref('reporting')
  })
};

$(document).foundation();
