var width = Math.min($('#game-container').width(), 600);
var sprite1, sprite2, sprite3;

var game = new Phaser.Game(width, width/(16/9), Phaser.AUTO, 'learning-game', {
  preload: () => {
    game.load.image('greenhouse', '/assets/img/logo-circle.png');
  },
  create: () => {
    game.stage.backgroundColor = '#000000';

    sprite1 = game.add.sprite(game.width/4, game.height/4, 'greenhouse');
    sprite1.anchor.setTo(0.5, 0.5);

    sprite2 = game.add.sprite(game.width/2, game.height/2, 'greenhouse');
    sprite2.anchor.setTo(0.5, 0.5);

    sprite3 = game.add.sprite(game.width*3/4, game.height*3/4, 'greenhouse');
    sprite3.anchor.setTo(0.5, 0.5);
  },
  update: () => {
  },
  render: () => {
  }
});
