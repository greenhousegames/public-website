import utils from './utils.js';

function create() {
  let sprite1, sprite2, sprite3;

  const game = utils.init({
    preload: () => {
      utils.preload(game);
    },
    create: () => {
      utils.create(game);

      sprite1 = game.add.sprite(game.width/2, game.height/2, 'greenhouse-square');
      game.physics.arcade.enable(sprite1);
      sprite1.anchor.setTo(0.5, 0.5);
      sprite1.body.velocity.set(game.rnd.integerInRange(-100, 100), game.rnd.integerInRange(-100, 100));
      sprite1.body.collideWorldBounds = true;
      sprite1.body.bounce.setTo(1);

      sprite2 = game.add.sprite(game.width/4, game.height/2, 'greenhouse-square');
      sprite2.anchor.setTo(0.5, 0.5);
      game.physics.arcade.enable(sprite2);
      sprite2.body.immovable = true;
      sprite2.body.bounce.set(1);

      sprite3 = game.add.sprite(game.width*3/4, game.height/2, 'greenhouse-square');
      sprite3.anchor.setTo(0.5, 0.5);
      game.physics.arcade.enable(sprite3);
      sprite3.body.immovable = true;
      sprite3.body.bounce.set(1);
    },
    update: () => {
      game.physics.arcade.collide(sprite1, sprite2, reset);
      game.physics.arcade.collide(sprite1, sprite3, reset);
    },
    render: () => {
    }
  });
  return game;

  function reset() {
    sprite1.kill();
    game.time.events.add(Phaser.Timer.SECOND, () => {
      sprite1.revive();
      sprite1.position.setTo(game.width/2, game.height/2);
      sprite1.body.velocity.set(game.rnd.integerInRange(-100, 100), game.rnd.integerInRange(-100, 100));
    });
  }
}

module.exports = create;
