import utils from './utils.js';

function create() {
  var sprite1, weapon;

  var game = utils.init('w', {
    preload: () => {
      utils.preload(game);
      game.load.image('bullet', '/assets/img/learning/weapon-bullet.png');
    },
    create: () => {
      utils.create(game);

      weapon = game.add.weapon(30, 'bullet');
      weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
      weapon.bulletSpeed = 600;
      weapon.fireRate = 100;

      sprite1 = game.add.sprite(game.width/2, game.height/2, 'greenhouse');
      sprite1.anchor.setTo(0.5, 0.5);
      game.physics.arcade.enable(sprite1);

      weapon.trackSprite(sprite1, 0, 0, false);

      game.input.onDown.add(fire);
    },
    update: () => {
    },
    render: () => {
    }
  });
  return game;

  function fire() {
    weapon.fireAngle = Phaser.Math.radToDeg(game.physics.arcade.angleToPointer(sprite1));
    weapon.fire();
  }
}

module.exports = create;
