import utils from './utils.js';

function create() {
  var sprite1;

  var game = utils.init('j', {
    preload: () => {
      utils.preload(game);
    },
    create: () => {
      utils.create(game);
      game.physics.arcade.gravity.y = 200;

      sprite1 = game.add.sprite(game.width/2, game.height/2, 'greenhouse');
      game.physics.enable(sprite1, Phaser.Physics.ARCADE);
      sprite1.anchor.setTo(0.5, 0.5);
      sprite1.body.collideWorldBounds = true;
      sprite1.body.bounce.set(0);

      game.input.onDown.add(jump);
    },
    update: () => {
    },
    render: () => {
    }
  });
  return game;

  function jump() {
    if (sprite1.y == (game.height - utils.getIconWidth(game)/2)) {
      switch (utils.getBreakpoint(game)) {
        case 'large':
          sprite1.body.velocity.y = -300;
          break;
        case 'medium':
          sprite1.body.velocity.y = -250;
          break;
        case 'small':
          sprite1.body.velocity.y = -200;
          break;
      }
    }
  }
}

module.exports = create;
