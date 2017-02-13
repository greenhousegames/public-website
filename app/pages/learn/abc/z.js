import utils from './utils.js';
var sprite1, sprite2, sprite3;

var game = utils.init({
  preload: () => {
    utils.preload(game);
  },
  create: () => {
    utils.create(game);

    sprite1 = game.add.sprite(game.width/2 - utils.getIconWidth(game)/2, game.height/2, 'greenhouse');
    sprite1.anchor.setTo(0.5, 0.5);

    sprite2 = game.add.sprite(game.width/2, game.height/2, 'greenhouse');
    sprite2.anchor.setTo(0.5, 0.5);

    sprite3 = game.add.sprite(game.width/2 + utils.getIconWidth(game)/2, game.height/2, 'greenhouse');
    sprite3.anchor.setTo(0.5, 0.5);
  },
  update: () => {
  },
  render: () => {
  }
});
