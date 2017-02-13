var width = $('#game-container').width();
var sprite1, sprite2, sprite3;

var game = new Phaser.Game(width, width/(16/9), Phaser.AUTO, 'learning-game', {
  preload: () => {
    if (width > 1000) {
      game.load.image('greenhouse', '/assets/img/logo-circle-large.png');
    } else if (width > 600) {
      game.load.image('greenhouse', '/assets/img/logo-circle-medium.png');
    } else {
      game.load.image('greenhouse', '/assets/img/logo-circle-small.png');
    }
    game.load.image('reload', '/assets/img/restart-game.png');
  },
  create: () => {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#000000';
    game.add.button(game.width - 40, game.height - 40, 'reload', () => game.state.restart());

    sprite1 = game.add.sprite(0, game.height/6, 'greenhouse');
    sprite1.anchor.setTo(0, 0.5);

    game.physics.enable(sprite1, Phaser.Physics.ARCADE);
    sprite1.body.collideWorldBounds = true;
    sprite1.body.velocity.x = 100;
    sprite1.body.bounce.set(1);

    sprite2 = game.add.sprite(0, game.height/2, 'greenhouse');
    sprite2.anchor.setTo(0, 0.5);

    game.physics.enable(sprite2, Phaser.Physics.ARCADE);
    sprite2.body.collideWorldBounds = true;
    sprite2.body.velocity.x = 100;
    sprite2.body.bounce.set(0.5);

    sprite3 = game.add.sprite(0, game.height*5/6, 'greenhouse');
    sprite3.anchor.setTo(0, 0.5);

    game.physics.enable(sprite3, Phaser.Physics.ARCADE);
    sprite3.body.collideWorldBounds = true;
    sprite3.body.velocity.x = 100;
  },
  update: () => {
  },
  render: () => {
  }
});
