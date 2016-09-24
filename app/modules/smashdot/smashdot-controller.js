import 'rsvp';
import '@greenhousegames/firebase-waiting-room';
import Game from '@greenhousegames/smash-dot';
import firebase from 'firebase/app';
import firebaseconfig from '../../config/config-firebase-smashdot';
const firebaseInst = firebase.initializeApp(firebaseconfig, 'SmashDot');

class SmashDotController {
  constructor($scope, $timeout) {
    $scope.$on('$destroy', () => {
      if (this.game) {
        this.game.destroy();
      }
    });

    $timeout(() => this.boot());

    return this;
  }

  boot() {
    this.game = new Game(firebaseInst);
    this.game.state.start('boot');
  }
}

SmashDotController.$inject = ['$scope', '$timeout'];

export default SmashDotController;
