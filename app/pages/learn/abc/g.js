import utils from './utils.js';

function create() {
  let sprite1, sprite2, sprite3;

  const game = utils.init('g', {
    preload: () => {
      utils.preload(game);
    },
    create: () => {
      utils.create(game);
      game.physics.arcade.gravity.y = 100;

      sprite1 = game.add.sprite(game.width/6, game.height/2, 'greenhouse');
      sprite2 = game.add.sprite(game.width/2, game.height/2, 'greenhouse');
      sprite3 = game.add.sprite(game.width*5/6, game.height/2, 'greenhouse');

      game.physics.arcade.enable( [ sprite1, sprite2, sprite3 ]);

      sprite1.anchor.setTo(0.5, 0.5);
      sprite1.body.allowGravity = false;
      sprite1.body.collideWorldBounds = true;

      sprite2.anchor.setTo(0.5, 0.5);
      sprite2.body.collideWorldBounds = true;
      sprite2.body.bounce.set(0);

      sprite3.anchor.setTo(0.5, 0.5);
      sprite3.body.collideWorldBounds = true;
      sprite3.body.bounce.set(1);
    },
    update: () => {
    },
    render: () => {
    }
  });
  return game;
}

module.exports = create;
