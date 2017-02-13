import utils from './utils.js';
var sprite1;

var game = utils.init({
  preload: () => {
    utils.preload(game);
  },
  create: () => {
    utils.create(game);

    sprite1 = game.add.sprite(game.width/2, game.height/2, 'greenhouse');
    sprite1.anchor.setTo(0.5, 0.5);
    sprite1.inputEnabled = true;
    sprite1.input.enableDrag();
  },
  update: () => {
  },
  render: () => {
  }
});
