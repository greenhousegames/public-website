var width = Math.min($('#game-container').width(), 600);
var sprite1, sprite2;

var game = new Phaser.Game(width, width/(16/9), Phaser.AUTO, 'learning-game', {
  preload: () => {
    game.load.image('greenhouse', '/assets/img/logo-circle.png');
  },
  create: () => {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#000000';

    sprite1 = game.add.sprite(0, game.height/2, 'greenhouse');
    sprite1.anchor.setTo(0.5, 0.5);
    game.physics.enable(sprite1, Phaser.Physics.ARCADE);
    sprite1.body.velocity.x = 100;

    sprite2 = game.add.sprite(game.width, game.height/2, 'greenhouse');
    sprite2.anchor.setTo(0.5, 0.5);
    game.physics.enable(sprite2, Phaser.Physics.ARCADE);
    sprite2.body.velocity.x = -100;
  },
  update: () => {
     game.physics.arcade.collide(sprite1, sprite2);
  },
  render: () => {
  }
});
