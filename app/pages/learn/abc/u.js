import utils from './utils.js';

function create() {
  let weapon, sprite1, sprite2, abutton, bbutton, cbutton, dbutton, weaponLvl, shieldLvl, health;

  const game = utils.init({
    preload: () => {
      utils.preload(game, ['a','b','c','d']);
      game.load.image('bullet', '/assets/img/learning/weapon-bullet.png');
    },
    create: () => {
      utils.create(game);
      weaponLvl = 1;
      shieldLvl = 1;
      health = 100;

      weapon = game.add.weapon(30, 'bullet');
      weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
      weapon.bulletSpeed = 600;
      weapon.fireRate = 100;
      weapon.fireAngle = 0;

      sprite1 = game.add.sprite(game.width/4, game.height/2, 'greenhouse');
      sprite1.anchor.setTo(0.5, 0.5);

      weapon.trackSprite(sprite1, 0, 0, false);

      sprite2 = game.add.sprite(game.width*3/4, game.height/2, 'greenhouse');
      sprite2.anchor.setTo(0.5, 0.5);
      game.physics.arcade.enable(sprite2);
      sprite2.body.immovable = true;

      abutton = game.add.button(0, 0, 'a-button', () => weapon.fire());
      bbutton = game.add.button(0, 0, 'b-button', () => weaponLvl++);
      cbutton = game.add.button(0, 0, 'c-button', () => shieldLvl++);
      utils.alignButtons(game, [abutton,bbutton,cbutton]);
    },
    update: () => {
      game.physics.arcade.collide(sprite2, weapon.bullets, (sprite, bullet) => {
        if (shieldLvl <= weaponLvl) {
          health -= (weaponLvl - shieldLvl+1)*10;
        }
        if (health <= 0) {
          health = 0;
          sprite2.kill();
        }
        bullet.kill();
      });
    },
    render: () => {
      game.debug.text("Health: " + health, 32, 32);
      game.debug.text("Weapon Level: " + weaponLvl, 32, 48);
      game.debug.text("Shield Level: " + shieldLvl, 32, 64);
    }
  });
  return game;

  function fire() {
    weapon.fire();
  }
}

module.exports = create;
