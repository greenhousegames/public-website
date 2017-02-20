import utils from './utils.js';

function create() {
  var sprite1, abutton;

  var game = utils.init('f', {
    preload: () => {
      utils.preload(game, ['a']);
      game.load.atlas('ninja', '/assets/img/learning/ninja/run.png', '/assets/img/learning/ninja/run.json');
    },
    create: () => {
      utils.create(game);
      game.physics.arcade.gravity.y = 200;

      sprite1 = game.add.sprite(game.width/2, game.height, 'ninja', 'Run__000');
      game.physics.enable(sprite1, Phaser.Physics.ARCADE);
      sprite1.anchor.setTo(0.5, 1);
      sprite1.body.collideWorldBounds = true;
      sprite1.body.bounce.set(0);
      sprite1.animations.add('run', [
        'Run__001',
        'Run__002',
        'Run__003',
        'Run__004',
        'Run__005',
        'Run__006',
        'Run__007',
        'Run__008',
        'Run__009',
        'Run__000'
      ], 10, false, false);

      utils.ifBreakpoint(game, 'small', () => sprite1.scale.setTo(0.25));
      utils.ifBreakpoint(game, 'medium', () => sprite1.scale.setTo(0.5));
      utils.ifBreakpoint(game, 'large', () => sprite1.scale.setTo(0.75));

      abutton = game.add.button(0, 0, 'a-button', run);
      utils.alignButtons(game, [abutton]);
    },
    update: () => {
    },
    render: () => {
    }
  });
  return game;

  function run() {
    sprite1.animations.play('run');
  }
}

module.exports = create;
