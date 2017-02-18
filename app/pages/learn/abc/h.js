import utils from './utils.js';

function create() {
  var sprite1;

  var game = utils.init('h', {
    preload: () => {
      utils.preload(game);
    },
    create: () => {
      utils.create(game);

      sprite1 = game.add.sprite(game.width/2, game.height/2, 'greenhouse');
      sprite1.anchor.setTo(0.5, 0.5);
      sprite1.health = 100;
      sprite1.inputEnabled = true;
      sprite1.events.onInputDown.add(() => {
        sprite1.health -= 10;

        if (sprite1.health == 0) {
          sprite1.kill();
        }
      });
    },
    update: () => {
    },
    render: () => {
      game.debug.text('Health: ' + sprite1.health + ' / 100', 32, 32);
    }
  });
  return game;
}

module.exports = create;
