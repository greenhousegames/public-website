import utils from './utils.js';

function create() {
  var sprite1;

  var game = utils.init('k', {
    preload: () => {
      utils.preload(game);
    },
    create: () => {
      utils.create(game);

      sprite1 = game.add.sprite(game.width/2, game.height/2, 'greenhouse');
      game.physics.enable(sprite1, Phaser.Physics.ARCADE);
      sprite1.anchor.setTo(0.5, 0.5);
      sprite1.body.velocity.set(game.rnd.integerInRange(-100, 100), game.rnd.integerInRange(-100, 100));
      sprite1.inputEnabled = true;
      sprite1.input.enableDrag();
      sprite1.checkWorldBounds = true;
      sprite1.events.onOutOfBounds.add(reset);
    },
    update: () => {
    },
    render: () => {
      game.debug.spriteInfo(sprite1, 32, 32);
    }
  });
  return game;

  function reset() {
    sprite1.kill();
    game.time.events.add(Phaser.Timer.SECOND * 3, () => {
      sprite1.revive();
      sprite1.position.setTo(game.width/2, game.height/2);
      sprite1.body.velocity.set(game.rnd.integerInRange(-100, 100), game.rnd.integerInRange(-100, 100));
    });
  }
}

module.exports = create;
