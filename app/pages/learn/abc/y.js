import utils from './utils.js';
var sprite1, sprite2;

var game = utils.init({
  preload: () => {
    utils.preload(game);
  },
  create: () => {
    utils.create(game);

    sprite1 = game.add.sprite(game.width/2, 0, 'greenhouse');
    sprite1.anchor.setTo(0.5, 0);

    sprite2 = game.add.sprite(game.width/2, game.height, 'greenhouse');
    sprite2.anchor.setTo(0.5, 1);
  },
  update: () => {
  },
  render: () => {
  }
});
