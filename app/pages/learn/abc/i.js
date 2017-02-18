import utils from './utils.js';

function create() {
  var sprite1, sprite2, sprite3;

  var game = utils.init('i', {
    preload: () => {
      utils.preload(game);
    },
    create: () => {
      utils.create(game);

      sprite1 = game.add.sprite(game.width/2, game.height/2, 'greenhouse-square');
      sprite1.anchor.setTo(0.5, 0.5);
      game.physics.enable(sprite1, Phaser.Physics.ARCADE);
      sprite1.body.immovable = true;
      sprite1.body.bounce.set(1);

      sprite2 = game.add.sprite(0, game.height/2, 'greenhouse-square');
      sprite2.anchor.setTo(0.5, 0.5);
      game.physics.enable(sprite2, Phaser.Physics.ARCADE);
      sprite2.body.collideWorldBounds = true;
      sprite2.body.bounce.set(1);
      sprite2.body.velocity.x = -50;
      sprite2.body.velocity.y = -50;

      sprite3 = game.add.sprite(game.width, game.height/2, 'greenhouse-square');
      sprite3.anchor.setTo(0.5, 0.5);
      game.physics.enable(sprite3, Phaser.Physics.ARCADE);
      sprite3.body.collideWorldBounds = true;
      sprite3.body.bounce.set(1);
      sprite3.body.velocity.x = 50;
      sprite3.body.velocity.y = 50;
    },
    update: () => {
      game.physics.arcade.collide(sprite1, sprite2);
      game.physics.arcade.collide(sprite1, sprite3);
      game.physics.arcade.collide(sprite2, sprite3);
    },
    render: () => {
    }
  });
  return game;
}

module.exports = create;
