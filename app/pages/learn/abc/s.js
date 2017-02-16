import utils from './utils.js';

function create() {
  var sprite1;

  var game = utils.init('s', {
    preload: () => {
      utils.preload(game);
    },
    create: () => {
      utils.create(game);

      sprite1 = game.add.sprite(game.width/2, game.height/2, 'greenhouse');
      sprite1.anchor.setTo(0.5, 0.5);
    },
    update: () => {
    },
    render: () => {
    }
  });
  return game;
}

module.exports = create;
