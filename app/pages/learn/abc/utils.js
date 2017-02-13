function resize(game) {
  var dim = getGameDim();
  if (game.width != dim.width) {
    game.scale.setGameSize(dim.width, dim.height);
    return true;
  } else {
    return false;
  }
}

function preload(game) {
  if (game.width > 1000) {
    game.load.image('greenhouse', '/assets/img/logo-circle-large.png');
  } else if (game.width > 600) {
    game.load.image('greenhouse', '/assets/img/logo-circle-medium.png');
  } else {
    game.load.image('greenhouse', '/assets/img/logo-circle-small.png');
  }
  game.load.image('reload', '/assets/img/restart-game.png');
}

function create(game) {
  resize(game);
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.stage.backgroundColor = '#000000';
  game.add.button(game.width - 16 - 8, game.height - 16 - 8, 'reload', () => game.state.restart());
  game.scale.setResizeCallback(() => {
    if (resize(game)) {
      game.state.restart();
    }
  });
}

function getIconWidth(game) {
  if (game.width > 1000) {
    return 128;
  } else if (game.width > 600) {
    return 64;
  } else {
    return 32;
  }
}

function getGameDim() {
  var width = $('#game-container').width();
  return {
    width: width,
    height: width/(16/9)
  }
}

function init(config) {
  return new Phaser.Game(getGameDim().width, getGameDim().height, Phaser.AUTO, 'learning-game', config);
}

module.exports = {
  resize: resize,
  preload: preload,
  create: create,
  getIconWidth: getIconWidth,
  init: init
};
