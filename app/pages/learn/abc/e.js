import utils from './utils.js';

function create() {
  let weapon, sprite1, xp, abutton, bbutton, multiplier;

  const game = utils.init('e', {
    preload: () => {
      utils.preload(game, ['a','b']);
      game.load.image('bullet', '/assets/img/learning/weapon-bullet.png');
    },
    create: () => {
      utils.create(game);
      xp = 0;
      multiplier = 0;

      weapon = game.add.weapon(30, 'bullet');
      weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
      weapon.bulletSpeed = 600;
      weapon.fireRate = 100;

      utils.ifBreakpoint(game, 'small', () => multiplier = 1);
      utils.ifBreakpoint(game, 'medium', () => multiplier = 2);
      utils.ifBreakpoint(game, 'large', () => multiplier = 3);

      sprite1 = game.add.sprite(game.width/2, game.height/2, 'greenhouse');
      sprite1.anchor.setTo(0.5, 0.5);
      sprite1.width = 32;
      sprite1.height = 32;

      weapon.trackSprite(sprite1, 0, 0, false);

      abutton = game.add.button(0, 0, 'a-button', () => {
        xp++;
        sprite1.width = 32 + xp*multiplier;
        sprite1.height = 32 + xp*multiplier;

        if (xp == 10) {
          bbutton.revive();
        }
      });
      bbutton = game.add.button(0, 0, 'b-button', fire);
      bbutton.kill();
      utils.alignButtons(game, [abutton, bbutton]);
    },
    update: () => {
    },
    render: () => {
      game.debug.text('Experience: ' + xp, 32, 32);
    }
  });
  return game;

  function fire() {
    weapon.fireAngle = game.rnd.integerInRange(-180,180);
    weapon.fire();
  }
}

module.exports = create;
