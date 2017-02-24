import utils from './utils.js';

function create() {
  let sprite1, sprite2;

  const game = utils.init('y', {
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
  return game;
}

module.exports = create;
