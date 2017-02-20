import utils from './utils.js';

function create() {
  var sprite1, xp, abutton, multiplier;

  var game = utils.init('e', {
    preload: () => {
      utils.preload(game, ['a']);
    },
    create: () => {
      utils.create(game);
      xp = 0;
      multiplier = 0;

      utils.ifBreakpoint(game, 'small', () => multiplier = 1);
      utils.ifBreakpoint(game, 'medium', () => multiplier = 2);
      utils.ifBreakpoint(game, 'large', () => multiplier = 3);

      sprite1 = game.add.sprite(game.width/2, game.height/2, 'greenhouse');
      sprite1.anchor.setTo(0.5, 0.5);
      sprite1.width = 32;
      sprite1.height = 32;

      abutton = game.add.button(0, 0, 'a-button', () => {
        xp++;
        sprite1.width = 32 + xp*multiplier;
        sprite1.height = 32 + xp*multiplier;
      });
      utils.alignButtons(game, [abutton]);
    },
    update: () => {
    },
    render: () => {
      game.debug.text('Experience: ' + xp, 32, 32);
    }
  });
  return game;
}

module.exports = create;
