var width = Math.min($('#game-container').width(), 600);
var sprite1, sprite2, sprite3;

var game = new Phaser.Game(width, width/(16/9), Phaser.AUTO, 'learning-game', {
  preload: () => {
    game.load.image('greenhouse', '/assets/img/logo-circle.png');
  },
  create: () => {
    game.stage.backgroundColor = '#000000';
    game.physics.startSystem(Phaser.Physics.ARCADE);

    sprite1 = game.add.sprite(game.width/4, 0, 'greenhouse');
    sprite1.anchor.setTo(0.5, 0.5);
    game.physics.enable(sprite1, Phaser.Physics.ARCADE);
    sprite1.body.gravity.y = 10;

    sprite2 = game.add.sprite(game.width/2, 0, 'greenhouse');
    sprite2.anchor.setTo(0.5, 0.5);
    game.physics.enable(sprite2, Phaser.Physics.ARCADE);
    sprite2.body.gravity.y = 100;

    sprite3 = game.add.sprite(game.width*3/4, 0, 'greenhouse');
    sprite3.anchor.setTo(0.5, 0.5);
    game.physics.enable(sprite3, Phaser.Physics.ARCADE);
    sprite3.body.gravity.y = 50;
  },
  update: () => {
  },
  render: () => {
  }
});
