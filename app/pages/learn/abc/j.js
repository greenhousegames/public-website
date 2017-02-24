import utils from './utils.js';

function create() {
  let sprite1, abutton;

  const game = utils.init('j', {
    preload: () => {
      utils.preload(game, ['a']);
    },
    create: () => {
      utils.create(game);
      game.physics.arcade.gravity.y = 200;

      sprite1 = game.add.sprite(game.width/2, game.height/2, 'greenhouse');
      game.physics.enable(sprite1, Phaser.Physics.ARCADE);
      sprite1.anchor.setTo(0.5, 0.5);
      sprite1.body.collideWorldBounds = true;
      sprite1.body.bounce.set(0);

      abutton = game.add.button(0, 0, 'a-button', jump);
      utils.alignButtons(game, [abutton]);
    },
    update: () => {
    },
    render: () => {
    }
  });
  return game;

  function jump() {
    if (sprite1.y == (game.height - utils.getIconSize(game)/2)) {
      utils.ifBreakpoint(game, 'small', () => sprite1.body.velocity.y = -200);
      utils.ifBreakpoint(game, 'medium', () => sprite1.body.velocity.y = -250);
      utils.ifBreakpoint(game, 'large', () => sprite1.body.velocity.y = -300);
    }
  }
}

module.exports = create;
