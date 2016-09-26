import 'rsvp';
import '@greenhousegames/firebase-waiting-room';
import Game from '@greenhousegames/smash-dot';
import firebase from 'firebase/app';
import firebaseconfig from '../../config/config-firebase-smashdot';
const firebaseInst = firebase.initializeApp(firebaseconfig, 'SmashDot');

class SmashDotController {
  constructor($scope, $timeout) {
    $scope.$on('$destroy', () => {
      angular.element(document.querySelector('.top-menu-bar')).removeClass('ng-hide');
      if (this.game) {
        this.game.destroy();
      }
    });

    $timeout(() => this.boot());

    return this;
  }

  boot() {
    // hide menu bar
    angular.element(document.querySelector('.top-menu-bar')).addClass('ng-hide');

    this.game = new Game(firebaseInst, 'games/smashdot');
    this.game.state.start('boot');
  }
}

SmashDotController.$inject = ['$scope', '$timeout'];

export default SmashDotController;
