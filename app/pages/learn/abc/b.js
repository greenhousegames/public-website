import utils from './utils.js';

function create() {
  let sprite1, sprite2, sprite3;

  const game = utils.init('b', {
    preload: () => {
      utils.preload(game);
    },
    create: () => {
      utils.create(game);

      sprite1 = game.add.sprite(0, game.height/6, 'greenhouse');
      sprite1.anchor.setTo(0, 0.5);

      game.physics.arcade.enable(sprite1);
      sprite1.body.collideWorldBounds = true;
      sprite1.body.velocity.x = 100;
      sprite1.body.bounce.set(1);

      sprite2 = game.add.sprite(0, game.height/2, 'greenhouse');
      sprite2.anchor.setTo(0, 0.5);

      game.physics.arcade.enable(sprite2);
      sprite2.body.collideWorldBounds = true;
      sprite2.body.velocity.x = 100;
      sprite2.body.bounce.set(0.75);

      sprite3 = game.add.sprite(0, game.height*5/6, 'greenhouse');
      sprite3.anchor.setTo(0, 0.5);

      game.physics.arcade.enable(sprite3);
      sprite3.body.collideWorldBounds = true;
      sprite3.body.velocity.x = 100;
    },
    update: () => {
    },
    render: () => {
    }
  });
  return game;
}

module.exports = create;
