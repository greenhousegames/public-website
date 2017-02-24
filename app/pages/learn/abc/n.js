import utils from './utils.js';

function create() {
  let sprite1, weapon, abutton, sound1, sound2;

  const game = utils.init('n', {
    preload: () => {
      utils.preload(game, ['a']);
      game.load.image('bullet', '/assets/img/learning/weapon-bullet.png');
      game.load.audio('fire-sound', ['/assets/sounds/zap.ogg', '/assets/sounds/zap.mp4', '/assets/sounds/zap.mp3']);
      game.load.audio('bullet-killed', ['/assets/sounds/explosion.ogg', '/assets/sounds/explosion.mp4', '/assets/sounds/explosion.mp3']);
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

      abutton = game.add.button(0, 0, 'a-button', fire);
      utils.alignButtons(game, [abutton]);

      sound1 = game.add.audio('fire-sound');
      weapon.onFire.add(() => sound1.play());
      sound2 = game.add.audio('bullet-killed');
      weapon.onKill.add(() => sound2.play());
    },
    update: () => {
    },
    render: () => {
    }
  });
  return game;

  function fire() {
    weapon.fireAngle = game.rnd.integerInRange(-180,180);
    weapon.fire();
  }
}

module.exports = create;
