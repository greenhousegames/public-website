import utils from './utils.js';

function create() {
  var sprite1, lvl, xp, nextLvl;

  var game = utils.init('e', {
    preload: () => {
      utils.preload(game);
    },
    create: () => {
      utils.create(game);
      xp = 0;
      nextLvl = 2;
      lvl = 1;

      sprite1 = game.add.sprite(game.width/2, game.height/2, 'greenhouse');
      sprite1.anchor.setTo(0.5, 0.5);
      sprite1.inputEnabled = true;
      sprite1.events.onInputDown.add(() => {
        xp++;

        if (xp >= nextLvl) {
          lvl++;
          xp = 0;
          nextLvl = nextLvl * 2;
        }
      });
    },
    update: () => {
    },
    render: () => {
      game.debug.text('Levels: ' + lvl, 32, 32);
      game.debug.text('Experience: ' + xp + ' / ' + nextLvl, 32, 48);
    }
  });
  return game;
}

module.exports = create;
