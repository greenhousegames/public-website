import utils from './utils.js';

function create() {
  var sprite1;

  var game = utils.init('d', {
    preload: () => {
      utils.preload(game);
    },
    create: () => {
      utils.create(game);

      sprite1 = game.add.sprite(game.width/4, game.height/2, 'greenhouse');
      sprite1.anchor.setTo(0.5, 0.5);

      sprite1 = game.add.sprite(game.width*3/4, game.height/2, 'greenhouse');
      sprite1.anchor.setTo(0.5, 0.5);
      sprite1.inputEnabled = true;
      sprite1.input.enableDrag();
    },
    update: () => {
    },
    render: () => {
    }
  });
  return game;
}

module.exports = create;
