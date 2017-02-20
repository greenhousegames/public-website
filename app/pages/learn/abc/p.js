import utils from './utils.js';

function create() {
  var sprite1, abutton, obstacles, nextPosition, padding;

  var game = utils.init('p', {
    preload: () => {
      utils.preload(game, ['a', 'b', 'c']);
      game.load.image('obstacle', '/assets/img/learning/obstacle.png');
      game.load.image('greenhouse-small', '/assets/img/learning/logo-circle-small.png');
    },
    create: () => {
      utils.create(game);
      game.physics.arcade.gravity.y = 200;
      game.physics.arcade.checkCollision.up = false;
      game.physics.arcade.checkCollision.down = false;

      utils.ifBreakpoint(game, 'small', () => padding = 80);
      utils.ifBreakpoint(game, 'medium', () => padding = 130);
      utils.ifBreakpoint(game, 'large', () => padding = 180);

      sprite1 = game.add.sprite(game.width/2, game.height/2, 'greenhouse-small');
      game.physics.arcade.enable(sprite1);
      sprite1.body.collideWorldBounds = true;
      sprite1.anchor.setTo(0.5, 1);
      sprite1.body.bounce.x = 1;
      utils.ifBreakpoint(game, 'small', () => sprite1.body.velocity.x = 50);
      utils.ifBreakpoint(game, 'medium', () => sprite1.body.velocity.x = 75);
      utils.ifBreakpoint(game, 'large', () => sprite1.body.velocity.x = 100);

      obstacles = game.add.group();
      var ob = game.add.tileSprite(game.width/2, game.height/2, game.width*3/8, 16, 'obstacle');
      ob.anchor.setTo(0.5, 0);
      initPlatform(ob);
      nextPosition = 1;

      while (addObstacle()) {
      }

      abutton = game.add.button(0, 0, 'a-button', jump);
      utils.alignButtons(game, [abutton]);
    },
    update: () => {
      game.physics.arcade.collide(sprite1, obstacles);

      if (obstacles.getBottom().y > game.height) {
        obstacles.remove(obstacles.getBottom(), true);
      }
      addObstacle();
    },
    render: () => {
    }
  });
  return game;

  function jump() {
    utils.ifBreakpoint(game, 'small', () => sprite1.body.velocity.y = -200);
    utils.ifBreakpoint(game, 'medium', () => sprite1.body.velocity.y = -250);
    utils.ifBreakpoint(game, 'large', () => sprite1.body.velocity.y = -300);
  }

  function addObstacle() {
    var ob1, ob2;

    if (obstacles.getTop().y - padding > 0) {
      if (nextPosition == 1) {
        ob1 = game.add.tileSprite(game.width, obstacles.getTop().y - padding, game.width/4 - 32, 16, 'obstacle');
        ob1.anchor.setTo(1, 0);

        ob2 = game.add.tileSprite(0, obstacles.getTop().y - padding, game.width/4 - 32, 16, 'obstacle');
        ob2.anchor.setTo(0, 0);
        nextPosition = 0;
      } else {
        ob1 = game.add.tileSprite(game.width/2, obstacles.getTop().y - padding, game.width*3/8, 16, 'obstacle');
        ob1.anchor.setTo(0.5, 0);
        nextPosition = 1;
      }

      if (ob1) {
        initPlatform(ob1);
      }

      if (ob2) {
        initPlatform(ob2);
      }

      return true;
    }
  }

  function initPlatform(ob) {
    game.physics.arcade.enable(ob);
    ob.body.immovable = true;
    ob.body.allowGravity = false;
    ob.body.velocity.y = 25;
    obstacles.add(ob);
  }
}

module.exports = create;
