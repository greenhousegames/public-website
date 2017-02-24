import utils from './utils.js';

function create() {
  let sprite1, abutton, bbutton, points, jumps, timer;

  const game = utils.init('q', {
    preload: () => {
      utils.preload(game, ['a', 'b']);
    },
    create: () => {
      utils.create(game);
      game.physics.arcade.gravity.y = 200;
      jumps = 0;
      points = 0;

      sprite1 = game.add.sprite(game.width/2, game.height/2, 'greenhouse');
      game.physics.enable(sprite1, Phaser.Physics.ARCADE);
      sprite1.anchor.setTo(0.5, 0.5);
      sprite1.body.collideWorldBounds = true;
      sprite1.body.bounce.set(0);

      abutton = game.add.button(0, 0, 'a-button', jump);
      bbutton = game.add.button(0, 0, 'b-button', startQuest);
      utils.alignButtons(game, [abutton, bbutton]);
    },
    update: () => {
    },
    render: () => {
      game.debug.text('Timer: ' + (timer ? (timer.duration.toFixed(0) + ' ms') : 'press B to start quest'), 32, 32);
      game.debug.text('Jumps: ' + jumps, 32, 48);
      game.debug.text('Points: ' + points, 32, 64);
    }
  });
  return game;

  function startQuest() {
    jumps = 0;
    timer = game.time.create(false);
    timer.add(Phaser.Timer.SECOND * 10, checkPoints);
    timer.start();
  }

  function checkPoints() {
    if (jumps >= 3) {
      points += 10;
    }
    jumps = 0;
    timer = null;
  }

  function jump() {
    if (sprite1.y == (game.height - utils.getIconSize(game)/2)) {
      if (timer) {
        jumps++;
      }
      utils.ifBreakpoint(game, 'small', () => sprite1.body.velocity.y = -200);
      utils.ifBreakpoint(game, 'medium', () => sprite1.body.velocity.y = -250);
      utils.ifBreakpoint(game, 'large', () => sprite1.body.velocity.y = -300);
    }
  }
}

module.exports = create;
