import utils from './utils.js';

function create() {
  let sprite1, abutton, obstacle;

  const game = utils.init({
    preload: () => {
      utils.preload(game, ['a']);
      game.load.image('obstacle', '/assets/img/learning/obstacle.png');
    },
    create: () => {
      utils.create(game);
      game.physics.arcade.gravity.y = 200;
      game.physics.arcade.checkCollision.right = false;

      sprite1 = game.add.sprite(0, game.height, 'greenhouse-square');
      sprite1.anchor.setTo(0, 1);
      game.physics.arcade.enable(sprite1);
      utils.ifBreakpoint(game, 'small', () => sprite1.body.velocity.x = 50);
      utils.ifBreakpoint(game, 'medium', () => sprite1.body.velocity.x = 75);
      utils.ifBreakpoint(game, 'large', () => sprite1.body.velocity.x = 100);
      sprite1.body.collideWorldBounds = true;

      utils.ifBreakpoint(game, 'small', () => obstacle = game.add.tileSprite(game.width/2, game.height, 16, 32, 'obstacle'));
      utils.ifBreakpoint(game, 'medium', () => obstacle = game.add.tileSprite(game.width/2, game.height, 16, 64, 'obstacle'));
      utils.ifBreakpoint(game, 'large', () => obstacle = game.add.tileSprite(game.width/2, game.height, 32, 128, 'obstacle'));
      obstacle.anchor.setTo(0.5, 1);
      game.physics.arcade.enable(obstacle);
      obstacle.body.immovable = true;
      obstacle.body.allowGravity = false;

      abutton = game.add.button(0, 0, 'a-button', jump);
      utils.alignButtons(game, [abutton]);
    },
    update: () => {
      game.physics.arcade.collide(sprite1, obstacle);
    },
    render: () => {
    }
  });
  return game;

  function jump() {
    if (sprite1.y == game.height) {
      utils.ifBreakpoint(game, 'small', () => sprite1.body.velocity.y = -200);
      utils.ifBreakpoint(game, 'medium', () => sprite1.body.velocity.y = -250);
      utils.ifBreakpoint(game, 'large', () => sprite1.body.velocity.y = -300);
    }
  }
}

module.exports = create;
