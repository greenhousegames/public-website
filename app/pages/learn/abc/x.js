import utils from './utils.js';

function create() {
  let sprite1, sprite2;

  const game = utils.init('x', {
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
  
  return game;
}

module.exports = create;
