import utils from './utils.js';

function create() {
  var sprite1, weapon, abutton, sound;

  var game = utils.init('n', {
    preload: () => {
      utils.preload(game, ['a']);
      game.load.image('bullet', '/assets/img/learning/weapon-bullet.png');
      game.load.audio('fire-sound', ['/assets/sounds/zap1.ogg', '/assets/sounds/zap1.mp4', '/assets/sounds/zap1.mp3']);
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

      sound = game.add.audio('fire-sound');
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
    sound.play();
  }
}

module.exports = create;
