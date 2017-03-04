import utils from './utils.js';

function create() {
  let sprite1, sprite2;

  const game = utils.init({
    preload: () => {
      utils.preload(game);
    },
    create: () => {
      utils.create(game);

      sprite1 = game.add.sprite(game.width/4, game.height/2, 'greenhouse');
      sprite1.anchor.setTo(0.5, 0.5);

      sprite2 = game.add.sprite(game.width*3/4, game.height/2, 'greenhouse');
      sprite2.anchor.setTo(0.5, 0.5);
      sprite2.inputEnabled = true;
      sprite2.input.enableDrag();
    },
    update: () => {
    },
    render: () => {
    }
  });
  return game;
}

module.exports = create;
