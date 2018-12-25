'use strict';

(function () {
  var LIMIT_LEFT_X = 0;
  var LIMIT_RIGHT_X = 1200;
  var mainPin = window.form.mapMainPin;
  var mainPinStyle = window.form.mapMainPin.style;
  var MAIN_PIN_GAP_Y = window.form.MAIN_PIN_GAP_Y;
  var MAIN_PIN_GAP_X = window.form.MAIN_PIN_GAP_X;
  var LIMIT_TOP_Y = window.form.LIMIT_TOP_Y;
  var LIMIT_BOTTOM_Y = window.form.LIMIT_BOTTOM_Y;

  window.form.mapMainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPinStyle.left = (mainPin.offsetLeft - shift.x) + 'px';
      mainPinStyle.top = (mainPin.offsetTop - shift.y) + 'px';

      window.form.setCoordsToInput();

      var mapMainPinLeftCoord = parseInt(mainPinStyle.left.split('px')[0], 10);
      var mapMainPinTopCoord = parseInt(mainPinStyle.top.split('px')[0], 10);

      if (mapMainPinTopCoord < LIMIT_TOP_Y - MAIN_PIN_GAP_Y) {
        mainPinStyle.top = LIMIT_TOP_Y - MAIN_PIN_GAP_Y + 'px';
      }

      if (mapMainPinTopCoord > LIMIT_BOTTOM_Y - MAIN_PIN_GAP_Y) {
        mainPinStyle.top = LIMIT_BOTTOM_Y - MAIN_PIN_GAP_Y + 'px';
      }

      if (mapMainPinLeftCoord < LIMIT_LEFT_X - MAIN_PIN_GAP_X) {
        mainPinStyle.left = LIMIT_LEFT_X - MAIN_PIN_GAP_X + 'px';
      }

      if (mapMainPinLeftCoord > LIMIT_RIGHT_X - MAIN_PIN_GAP_X) {
        mainPinStyle.left = LIMIT_RIGHT_X - MAIN_PIN_GAP_X + 'px';
      }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      var map = window.card.map;
      if (window.places) {
        if (map.classList.contains('map--faded')) {
          window.form.adForm.classList.remove('ad-form--disabled');
          map.classList.remove('map--faded');
          window.form.setFieldsetsTrigger(false);
          window.pins.init();
          window.pins.setEventForButtons(window.places.slice(0, window.pins.MAX_OF_ELEM));
          window.pins.getAllFilters();
        }
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
