import utils from './utils.js';

function create() {
  var sprite1, abutton, obstacle1, obstacle2;

  var game = utils.init('r', {
    preload: () => {
      utils.preload(game, ['a']);
      game.load.image('obstacle', '/assets/img/learning/obstacle.png');
    },
    create: () => {
      utils.create(game);
      game.physics.arcade.gravity.y = 200;
      game.physics.arcade.checkCollision.left = false;

      sprite1 = game.add.sprite(game.width/4, game.height, 'greenhouse-square');
      game.physics.arcade.enable(sprite1);
      sprite1.body.collideWorldBounds = true;
      sprite1.anchor.setTo(0.5, 1);

      utils.ifBreakpoint(game, 'small', () => obstacle1 = game.add.tileSprite(game.width, game.height, 16, 32, 'obstacle'));
      utils.ifBreakpoint(game, 'medium', () => obstacle1 = game.add.tileSprite(game.width, game.height, 16, 64, 'obstacle'));
      utils.ifBreakpoint(game, 'large', () => obstacle1 = game.add.tileSprite(game.width, game.height, 32, 128, 'obstacle'));
      obstacle1.anchor.setTo(0, 1);
      game.physics.arcade.enable(obstacle1);
      obstacle1.body.immovable = true;
      obstacle1.body.allowGravity = false;
      obstacle1.body.velocity.x = -100;

      utils.ifBreakpoint(game, 'small', () => obstacle2 = game.add.tileSprite(game.width*7/4, game.height, 16, 32, 'obstacle'));
      utils.ifBreakpoint(game, 'medium', () => obstacle2 = game.add.tileSprite(game.width*7/4, game.height, 16, 64, 'obstacle'));
      utils.ifBreakpoint(game, 'large', () => obstacle2 = game.add.tileSprite(game.width*7/4, game.height, 32, 128, 'obstacle'));
      obstacle2.anchor.setTo(0, 1);
      game.physics.arcade.enable(obstacle2);
      obstacle2.body.immovable = true;
      obstacle2.body.allowGravity = false;
      obstacle2.body.velocity.x = -100;

      abutton = game.add.button(0, 0, 'a-button', jump);
      utils.alignButtons(game, [abutton]);
    },
    update: () => {
      game.physics.arcade.collide(sprite1, obstacle1);
      game.physics.arcade.collide(sprite1, obstacle2);

      if (obstacle1.x < 0) {
        obstacle1.x = game.width*5/4;
      }
      if (obstacle2.x < 0) {
        obstacle2.x = game.width*5/4;
      }

      sprite1.body.velocity.x = 0;
      if (sprite1.x > 0 && sprite1.x < game.width/4) {
        sprite1.body.velocity.x = 50;
      }
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
