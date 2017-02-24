function resize(game) {
  const width = getGameWidth(game.containerId);
  const height = getGameHeight(game.containerId);
  if (game.width != width) {
    game.scale.setGameSize(width, height);
    return true;
  } else {
    return false;
  }
}

function preload(game, buttons) {
  buttons = buttons || [];
  const breakpoint = getBreakpoint(game);
  game.load.image('greenhouse', '/assets/img/learning/logo-circle-' + breakpoint + '.png');
  game.load.image('greenhouse-square', '/assets/img/learning/logo-square-' + breakpoint + '.png');
  buttons.forEach(name => {
    game.load.image(name + '-button', '/assets/img/learning/' + name + '-button-' + breakpoint + '.png');
  });
  game.load.image('reload', '/assets/img/learning/restart-game.png');
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

function getIconSize(game) {
  let size;
  ifBreakpoint(game, 'small', () => size = 32);
  ifBreakpoint(game, 'medium', () => size = 64);
  ifBreakpoint(game, 'large', () => size = 128);
  return size;
}

function getBreakpoint(game) {
  if (game.width > 1000) return 'large';
  else if (game.width > 600) return 'medium';
  else return 'small';
}

function getGameWidth(id) {
  return $('#' + id).width();
}

function getGameHeight(id) {
  return getGameWidth(id)/(16/9);
}

function init(letter, config) {
  const containerId = 'learning-game-' + letter + '-container';
  const width = getGameWidth(containerId);
  const height = getGameHeight(containerId);
  const game = new Phaser.Game(width, height, Phaser.AUTO, 'learning-game-' + letter, config);
  game.containerId = containerId;
  return game;
}

function alignButtons(game, buttons) {
  let padding;
  ifBreakpoint(game, 'small', () => padding = 8);
  ifBreakpoint(game, 'medium', () => padding = 12);
  ifBreakpoint(game, 'large', () => padding = 16);

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].anchor.setTo(0, 1);
    buttons[i].x = padding + (buttons[i].width + padding)*i;
    buttons[i].y = game.height - padding;
  }
}

function ifBreakpoint(game, breakpoint, callback) {
  if (getBreakpoint(game) == breakpoint) {
    callback();
  }
}

module.exports = {
  resize: resize,
  preload: preload,
  create: create,
  getIconSize: getIconSize,
  init: init,
  getBreakpoint: getBreakpoint,
  alignButtons: alignButtons,
  ifBreakpoint: ifBreakpoint
};
