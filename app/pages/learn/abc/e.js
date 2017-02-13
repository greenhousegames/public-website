import utils from './utils.js';
var sprite1, lvlText, xpText, lvl, xp, nextLvl;

var game = utils.init({
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

      lvlText.text = 'Levels\n' + lvl;
      xpText.text = 'Experience\n' + xp + ' / ' + nextLvl;
    });

    lvlText = game.add.text(game.width/4, game.height/4, {
      fill: 'white',
      align: 'center'
    });
    lvlText.fill = '#ffffff';
    lvlText.text = 'Levels\n0';
    lvlText.anchor.setTo(0.5, 0.5);

    xpText = game.add.text(game.width*3/4, game.height/4, {
      fill: 'white',
      align: 'center'
    });
    xpText.fill = '#ffffff';
    xpText.text = 'Experience\n0 / 2';
    xpText.anchor.setTo(0.5, 0.5);
  },
  update: () => {
  },
  render: () => {
  }
});
