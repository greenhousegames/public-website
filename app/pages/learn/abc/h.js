import utils from './utils.js';

function create() {
  let sprite1, abutton;

  const game = utils.init('h', {
    preload: () => {
      utils.preload(game, ['a']);
    },
    create: () => {
      utils.create(game);

      sprite1 = game.add.sprite(game.width/2, game.height/2, 'greenhouse');
      sprite1.anchor.setTo(0.5, 0.5);
      sprite1.health = 100;

      abutton = game.add.button(0, 0, 'a-button', () => {
        if (sprite1.health > 0) {
          sprite1.health -= 10;

          if (sprite1.health == 0) {
            sprite1.kill();
          }
        }
      });
      utils.alignButtons(game, [abutton]);
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
