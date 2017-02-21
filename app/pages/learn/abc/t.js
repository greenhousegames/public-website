import utils from './utils.js';

function create() {
  var sprite1, abutton, bbutton, timer;

  var game = utils.init('t', {
    preload: () => {
      utils.preload(game, ['a','b']);
    },
    create: () => {
      utils.create(game);

      sprite1 = game.add.sprite(game.width/2, game.height/2, 'greenhouse');
      sprite1.anchor.setTo(0.5, 0.5);

      timer = game.time.create(false);
      timer.loop(Phaser.Timer.SECOND * 3, moveSprite);
      timer.start();

      abutton = game.add.button(0, 0, 'a-button', () => timer.pause());
      bbutton = game.add.button(0, 0, 'b-button', () => timer.resume());
      utils.alignButtons(game, [abutton,bbutton]);
    },
    update: () => {
    },
    render: () => {
      game.debug.text("Time left: " + timer.duration.toFixed(0) + ' ms', 32, 32);
    }
  });
  return game;

  function moveSprite() {
    var width = utils.getIconWidth(game);
    sprite1.x = game.rnd.integerInRange(width/2, game.width - width/2);
    sprite1.y = game.rnd.integerInRange(width/2, game.height - width/2);
  }
}

module.exports = create;
