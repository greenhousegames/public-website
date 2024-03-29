import utils from './utils.js';

function create() {
  let sprite1, sprite2, sprite3, sprite4;

  const game = utils.init({
    preload: () => {
      utils.preload(game);
    },
    create: () => {
      utils.create(game);

      sprite1 = game.add.sprite(0, game.height/4, 'greenhouse-square');
      sprite1.anchor.setTo(0, 0.5);
      game.physics.arcade.enable(sprite1);
      sprite1.body.collideWorldBounds = true;
      sprite1.body.velocity.x = 50;

      sprite2 = game.add.sprite(game.width*3/4, game.height/4, 'greenhouse-square');
      sprite2.anchor.setTo(0.5, 0.5);
      game.physics.arcade.enable(sprite2);
      sprite2.body.collideWorldBounds = true;
      sprite2.body.immovable = true;

      sprite3 = game.add.sprite(0, game.height*3/4, 'greenhouse-square');
      sprite3.anchor.setTo(0, 0.5);
      game.physics.arcade.enable(sprite3);
      sprite3.body.collideWorldBounds = true;
      sprite3.body.velocity.x = 50;
      sprite3.body.bounce.setTo(1);

      sprite4 = game.add.sprite(game.width*3/4, game.height*3/4, 'greenhouse-square');
      sprite4.anchor.setTo(0.5, 0.5);
      game.physics.arcade.enable(sprite4);
      sprite4.body.collideWorldBounds = true;
      sprite4.body.immovable = true;
    },
    update: () => {
      game.physics.arcade.collide(sprite1, sprite2);
      game.physics.arcade.collide(sprite1, sprite3);
      game.physics.arcade.collide(sprite1, sprite4);
      game.physics.arcade.collide(sprite2, sprite3);
      game.physics.arcade.collide(sprite2, sprite4);
      game.physics.arcade.collide(sprite3, sprite4);
    },
    render: () => {
    }
  });
  return game;
}

module.exports = create;
