import utils from './utils.js';
var sprite1, sprite2, sprite3, sprite4;

var game = utils.init({
  preload: () => {
    utils.preload(game);
  },
  create: () => {
    utils.create(game);

    sprite1 = game.add.sprite(0, game.height/4, 'greenhouse');
    setSprite(sprite1, game);
    sprite1.body.velocity.x = 100;

    sprite2 = game.add.sprite(game.width, game.height/4, 'greenhouse');
    setSprite(sprite2, game);
    sprite2.body.velocity.x = -100;

    sprite3 = game.add.sprite(0, game.height*3/4, 'greenhouse');
    setSprite(sprite3, game);
    sprite3.body.velocity.x = 100;

    sprite4 = game.add.sprite(game.width, game.height*3/4, 'greenhouse');
    setSprite(sprite4, game);
    sprite4.body.velocity.x = -100;
  },
  update: () => {
    game.physics.arcade.collide(sprite1, sprite2);
  }
});

function setSprite(sprite, game) {
  sprite.anchor.setTo(0.5, 0.5);
  game.physics.enable(sprite, Phaser.Physics.ARCADE);
  sprite.body.bounce.set(1);
  sprite.body.collideWorldBounds = true;
  sprite.body.setCircle(utils.getIconWidth(game)/2);
}
