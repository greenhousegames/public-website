import utils from './utils.js';

function create() {
  let sprite1, abutton, bbutton;

  const game = utils.init({
    preload: () => {
      utils.preload(game, ['a', 'b']);
    },
    create: () => {
      utils.create(game);

      sprite1 = game.add.sprite(game.width/2, game.height/2, 'greenhouse');
      sprite1.anchor.setTo(0.5, 0.5);
      sprite1.health = 100;
      sprite1.lives = 3;

      abutton = game.add.button(0, 0, 'a-button', () => {
        if (sprite1.health > 0) {
          sprite1.health -= 10;

          if (sprite1.health == 0) {
            sprite1.kill();
            sprite1.lives--;
          }
        }
      });
      bbutton = game.add.button(0, 0, 'b-button', () => sprite1.lives++);
      utils.alignButtons(game, [abutton, bbutton]);
    },
    update: () => {
      if (!sprite1.alive && sprite1.lives > 0) {
        sprite1.health = 100;
        sprite1.x = game.rnd.integerInRange(0, game.width);
        sprite1.y = game.rnd.integerInRange(0, game.height);
        sprite1.revive();
      }
    },
    render: () => {
      game.debug.text('Lives: ' + sprite1.lives, 32, 32);
      game.debug.text('Health: ' + sprite1.health + ' / 100', 32, 48);
    }
  });
  return game;
}

module.exports = create;
