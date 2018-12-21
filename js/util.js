'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;
  window.util = {
    onPopupEscPress: function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        window.card.delete();
      }
    },
    debounce: function (fun) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
    }
  };
})();

