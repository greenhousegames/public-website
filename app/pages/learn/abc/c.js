import utils from './utils.js';
var sprite1, sprite2, sprite3, sprite4;

var game = utils.init({
  preload: () => {
    utils.preload(game);
  },
  create: () => {
    utils.create(game);

    sprite1 = game.add.sprite(0, 0, 'greenhouse');
    setSprite(sprite1, game);
    sprite1.body.velocity.set(150);

    sprite2 = game.add.sprite(0, game.height/2, 'greenhouse');
    setSprite(sprite2, game);
    sprite2.body.velocity.set(100);

    sprite3 = game.add.sprite(game.width, game.height/2, 'greenhouse');
    setSprite(sprite3, game);
    sprite3.body.velocity.set(100);

    sprite4 = game.add.sprite(game.width, game.height, 'greenhouse');
    setSprite(sprite4, game);
    sprite4.body.velocity.set(150);
  },
  update: () => {
    game.physics.arcade.collide(sprite1, sprite2);
    game.physics.arcade.collide(sprite1, sprite3);
    game.physics.arcade.collide(sprite1, sprite4);
    game.physics.arcade.collide(sprite2, sprite3);
    game.physics.arcade.collide(sprite2, sprite4);
    game.physics.arcade.collide(sprite3, sprite4);
  },
  render: () => {
  }
});

function setSprite(sprite, game) {
  sprite.anchor.setTo(0.5, 0.5);
  game.physics.enable(sprite, Phaser.Physics.ARCADE);
  sprite.body.bounce.set(1);
  sprite.body.collideWorldBounds = true;
  sprite.body.setCircle(utils.getIconWidth(game)/2);
}
