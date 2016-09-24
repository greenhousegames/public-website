import 'rsvp';
import '@greenhousegames/firebase-waiting-room';
import Game from '@greenhousegames/smash-dot';
import firebase from 'firebase/app';
import firebaseconfig from '../../config/config-firebase-smashdot';
const firebaseInst = firebase.initializeApp(firebaseconfig, 'SmashDot');

export default class SmashDotController {
  constructor() {
    const self = this;

    const game = new Game(firebaseInst);
    game.state.start('boot');

    return self;
  }
}
