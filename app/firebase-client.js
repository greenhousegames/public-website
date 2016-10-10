import GameTemplateReporting from '@greenhousegames/game-template/dist/reporting';
import firebase from 'firebase';
import rsvp from 'rsvp';

class FirebaseClient {
  constructor() {
    this.firebase = firebase.initializeApp({
      apiKey: 'AIzaSyDPGXl6Bc8jf_IPlkcVJe6jNlrNz72zaCo',
      authDomain: 'greenhouse-games.firebaseapp.com',
      databaseURL: 'https://greenhouse-games.firebaseio.com',
      storageBucket: 'greenhouse-games.appspot.com',
      messagingSenderId: '832706408675'
    });
  }

  currentUID() {
    return this.firebase.auth().currentUser ? this.firebase.auth().currentUser.uid : null;
  }

  signOut() {
    return this.firebase.auth().signOut();
  }

  signInWithPopup(name) {
    let provider;
    switch (name) {
      case 'google':
        provider = new firebase.auth.GoogleAuthProvider();
        break;
      case 'facebook':
        provider = new firebase.auth.FacebookAuthProvider();
        break;
      case 'twitter':
        provider = new firebase.auth.TwitterAuthProvider();
        break;
      case 'github':
        provider = new firebase.auth.GithubAuthProvider();
        break;
      default:
        console.log('Provider "' + name + '" is not support');
        return;
    }

    return this.firebase.auth().signInWithPopup(provider);
  }

  waitForAuth() {
    const auth = this.firebase.auth();
    const promise = new rsvp.Promise((resolve) => {
      const callback = () => {
        off();
        resolve();
      };
      const off = auth.onAuthStateChanged(callback);
    });
    return promise;
  }

  requireAuth() {
    const promise = new rsvp.Promise((resolve, reject) => {
      this.waitForAuth().then(() => {
        if (!this.firebase.auth().currentUser) {
          this.firebase.auth().signInAnonymously().then(resolve).catch(reject);
        } else {
          resolve();
        }
      }).catch(reject);
    });
    return promise;
  }
}

module.exports = FirebaseClient;
