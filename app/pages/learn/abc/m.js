import utils from './utils.js';

function create() {
  let sprite1, abutton, bbutton, cbutton, dbutton;

  const game = utils.init('m', {
    preload: () => {
      utils.preload(game, ['a','b','c','d']);
    },
    create: () => {
      utils.create(game);

      sprite1 = game.add.sprite(game.width/2, game.height/2, 'greenhouse');
      sprite1.anchor.setTo(0.5, 0.5);
      game.physics.arcade.enable(sprite1);

      abutton = game.add.button(0, 0, 'a-button', () => sprite1.body.velocity.x = 100);
      bbutton = game.add.button(0, 0, 'b-button', () => sprite1.body.velocity.x = -100);
      cbutton = game.add.button(0, 0, 'c-button', () => sprite1.body.velocity.y = -100);
      dbutton = game.add.button(0, 0, 'd-button', () => sprite1.body.velocity.y = 100);
      utils.alignButtons(game, [abutton, bbutton, cbutton, dbutton]);
    },
    update: () => {
      if (sprite1.body.velocity.x > 0) {
        sprite1.body.velocity.x--;
      } else if (sprite1.body.velocity.x < 0) {
        sprite1.body.velocity.x++;
      }
      if (sprite1.body.velocity.y > 0) {
        sprite1.body.velocity.y--;
      } else if (sprite1.body.velocity.y < 0) {
        sprite1.body.velocity.y++;
      }
    },
    render: () => {
    }
  });
  return game;
}

module.exports = create;
