import utils from './utils.js';
var sprite1, sprite2;

function create() {
  var game = utils.init('a', {
    preload: () => {
      utils.preload(game);
    },
    create: () => {
      utils.create(game);

      sprite1 = game.add.sprite(0, game.height/4, 'greenhouse');
      sprite1.anchor.setTo(0, 0.5);

      game.physics.enable(sprite1, Phaser.Physics.ARCADE);
      sprite1.body.collideWorldBounds = true;
      sprite1.body.velocity.x = 50;
      sprite1.body.acceleration.x = 10;

      sprite2 = game.add.sprite(0, game.height*3/4, 'greenhouse');
      sprite2.anchor.setTo(0, 0.5);

      game.physics.enable(sprite2, Phaser.Physics.ARCADE);
      sprite2.body.collideWorldBounds = true;
      sprite2.body.velocity.x = 50;
    },
    update: () => {
    },
    render: () => {
    }
  });
  return game;
}

module.exports = create;
