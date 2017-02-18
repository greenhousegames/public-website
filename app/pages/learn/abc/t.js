import utils from './utils.js';

function create() {
  var sprite1;

  var game = utils.init('t', {
    preload: () => {
      utils.preload(game);
    },
    create: () => {
      utils.create(game);

      sprite1 = game.add.sprite(game.width/2, game.height/2, 'greenhouse');
      sprite1.anchor.setTo(0.5, 0.5);

      game.time.events.loop(Phaser.Timer.SECOND * 3, moveSprite);
    },
    update: () => {
    },
    render: () => {
      game.debug.text("Time left: " + game.time.events.duration.toFixed(0) + ' ms', 32, 32);
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
