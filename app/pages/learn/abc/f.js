var width = Math.min($('#game-container').width(), 600);
var sprite, filter, background;

var game = new Phaser.Game(width, width/(16/9), Phaser.AUTO, 'learning-game', {
  preload: () => {
    game.load.image('greenhouse', '/assets/img/logo-circle-large.png');
    game.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/Marble.js');
  },
  create: () => {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#000000';

    sprite = game.add.sprite(game.width/2, game.height/2, 'greenhouse');
    sprite.anchor.setTo(0.5, 0.5);

    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.body.allowRotation = false;

    filter = game.add.filter('Marble', game.width, game.height);
	  filter.alpha = 0.1;

    background = game.add.sprite(0, 0);
  	background.width = game.width;
  	background.height = game.height;
  	background.filters = [filter];
  },
  update: () => {
    filter.update();
  },
  render: () => {
  }
});
