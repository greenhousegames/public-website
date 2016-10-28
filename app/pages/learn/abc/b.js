var width = Math.min($('#game-container').width(), 600);
var sprite;

var game = new Phaser.Game(width, width/(16/9), Phaser.AUTO, 'learning-game', {
  preload: () => {
    game.load.image('greenhouse', '/assets/img/logo-circle.png');
  },
  create: () => {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#000000';

    sprite = game.add.sprite(game.width/2, game.height/2, 'greenhouse');
    sprite.anchor.setTo(0.5, 0.5);
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.body.velocity.setTo(200,200);
    sprite.body.collideWorldBounds = true;
    sprite.body.bounce.set(1);
  },
  update: () => {
  },
  render: () => {
    game.debug.spriteInfo(sprite, 32, 32);
  }
});
