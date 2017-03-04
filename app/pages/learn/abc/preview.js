function preview(scriptpath, letter) {
  var create = null, game = null, loaded = false, loading = false;

  var loadscript = (cb) => {
    if (!loaded && !loading) {
      loading = true;
      $.getScript(scriptpath)
        .done((script, textStatus) => {
          loaded = true;
          loading = false;
          cb();
        })
        .fail((jqxhr, settings, exception) => {
          loading = false;
        });
    } else {
      cb();
    }
  };

  var load = () => {
    $('#card-letter-' + letter + " a.preview-button").click(() => {
      loadscript(() => {
        if (!create) {
          create = require('pages/learn/abc/' + letter + '.js');
        }

        if (window.GreenhouseGames.learning.letter != letter) {
          if (window.GreenhouseGames.learning.game) {
            window.GreenhouseGames.learning.game.destroy();
          }
        }

        window.GreenhouseGames.learning.game = create();
        window.GreenhouseGames.learning.letter = letter;
      });
    });
  };

  $(document).ready(() => {
    load();
  });
}

module.exports = preview;
