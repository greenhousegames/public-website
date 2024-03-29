import utils from './utils.js';

function create() {
  let sprite1, abutton, bbutton, cbutton;

  const game = utils.init({
    preload: () => {
      utils.preload(game, ['a', 'b', 'c']);
      game.load.atlas('ninja', '/assets/img/learning/ninja/run.png', '/assets/img/learning/ninja/run.json');
    },
    create: () => {
      utils.create(game);
      game.physics.arcade.gravity.y = 200;

      sprite1 = game.add.sprite(game.width/2, game.height, 'ninja', 'Run__000');
      game.physics.arcade.enable(sprite1);
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
      ], 1, false);
      sprite1.animations.add('runloop', [
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
      ], 20, true);

      utils.ifBreakpoint(game, 'small', () => sprite1.scale.setTo(0.25));
      utils.ifBreakpoint(game, 'medium', () => sprite1.scale.setTo(0.5));
      utils.ifBreakpoint(game, 'large', () => sprite1.scale.setTo(0.75));

      abutton = game.add.button(0, 0, 'a-button', () => sprite1.animations.play('run'));
      bbutton = game.add.button(0, 0, 'b-button', () => sprite1.animations.play('runloop'));
      cbutton = game.add.button(0, 0, 'c-button', () => sprite1.animations.stop());
      utils.alignButtons(game, [abutton, bbutton, cbutton]);
    },
    update: () => {
    },
    render: () => {
    }
  });
  return game;
}

module.exports = create;
