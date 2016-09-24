import 'rsvp';
import '@greenhousegames/firebase-waiting-room';
import Game from '@greenhousegames/smash-dot';
import firebase from 'firebase';
import firebaseconfig from '../../config/config-firebase-smashdot';

export default class SmashDotController {
  constructor() {
    const self = this;

    const firebaseInst = firebase.initializeApp(firebaseconfig, 'SmashDot');
    const game = new Game(firebaseInst);
    game.state.start('boot');

    return self;
  }
}
