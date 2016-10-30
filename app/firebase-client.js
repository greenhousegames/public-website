import firebase from 'firebase';
import config from './config';

let staticFirebase = null;

class FirebaseClient {
  constructor() {
    if (!staticFirebase) {
      staticFirebase = firebase.initializeApp(config);
    }
    this.firebase = staticFirebase;
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
    const promise = new Promise((resolve) => {
      const callback = () => {
        off();
        resolve();
      };
      const off = auth.onAuthStateChanged(callback);
    });
    return promise;
  }

  requireAuth() {
    const promise = new Promise((resolve, reject) => {
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
