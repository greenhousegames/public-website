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
    $('#card-letter-' + letter).hover(() => {
      if (Foundation.MediaQuery.current != "small") {
        loadscript(() => {
          if (!create) {
            create = require('pages/learn/abc/' + letter + '.js');
          }

          if (!game) {
            game = create();
            $('#learning-game-' + letter).show();
          }
        });
      }
    }, () => {
      $('#learning-game-' + letter).fadeOut({
        complete: () => {
          if (game) {
            game.destroy();
            game = null;
          }
        }
      });
    });
  };

  $(document).ready(() => {
    load();
  });
}

module.exports = preview;
