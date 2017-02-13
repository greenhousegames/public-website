import utils from './utils.js';
var sprite1, sprite2;

var game = utils.init({
  preload: () => {
    utils.preload(game);
  },
  create: () => {
    utils.create(game);

    sprite1 = game.add.sprite(0, game.height/2, 'greenhouse');
    sprite1.anchor.setTo(0, 0.5);

    sprite2 = game.add.sprite(game.width, game.height/2, 'greenhouse');
    sprite2.anchor.setTo(1, 0.5);
  },
  update: () => {
  },
  render: () => {
  }
});
