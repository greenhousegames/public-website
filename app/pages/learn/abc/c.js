import utils from './utils.js';

function create() {
  var sprite1, sprite2, sprite3, sprite4, sprite5, sprite6;

  var game = utils.init('c', {
    preload: () => {
      utils.preload(game);
    },
    create: () => {
      utils.create(game);

      sprite1 = game.add.sprite(0, game.height/6, 'greenhouse');
      setSprite(sprite1, game);
      sprite1.body.velocity.x = 100;
      sprite1.anchor.setTo(0, 0.5);

      sprite2 = game.add.sprite(game.width, game.height/6, 'greenhouse');
      setSprite(sprite2, game);
      sprite2.body.velocity.x = -100;
      sprite2.anchor.setTo(1, 0.5);

      sprite3 = game.add.sprite(0, game.height*3/6, 'greenhouse');
      setSprite(sprite3, game);
      sprite3.body.velocity.x = 100;
      sprite3.anchor.setTo(0, 0.5);

      sprite4 = game.add.sprite(game.width, game.height*3/6, 'greenhouse');
      setSprite(sprite4, game);
      sprite4.body.velocity.x = -100;
      sprite4.anchor.setTo(1, 0.5);

      sprite5 = game.add.sprite(0, game.height*5/6, 'greenhouse');
      setSprite(sprite5, game);
      sprite5.body.velocity.x = 100;
      sprite5.anchor.setTo(0, 0.5);
      sprite5.body.bounce.set(1);

      sprite6 = game.add.sprite(game.width, game.height*5/6, 'greenhouse');
      setSprite(sprite6, game);
      sprite6.body.velocity.x = -100;
      sprite6.anchor.setTo(1, 0.5);
      sprite6.body.bounce.set(1);
    },
    update: () => {
      game.physics.arcade.collide(sprite3, sprite4);
      game.physics.arcade.collide(sprite5, sprite6);
    }
  });

  return game;
}

function setSprite(sprite, game) {
  game.physics.enable(sprite, Phaser.Physics.ARCADE);
  sprite.body.collideWorldBounds = true;
}

module.exports = create;
