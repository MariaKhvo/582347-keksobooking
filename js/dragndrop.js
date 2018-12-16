'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var mapPinsBlock = document.querySelector('.map__pins');
  var pinMain = mapPinsBlock.querySelector('.map__pin--main');
  var addressInput = document.querySelector('[name="address"]');

  addressInput.disabled = false;

  var onPinMainMouseDown = function (evt) {
    evt.preventDefault();
    var pinCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onDocumentMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: pinCoordinates.x - moveEvt.clientX,
        y: pinCoordinates.y - moveEvt.clientY
      };
      pinCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var pinMainY = pinMain.offsetTop - shift.y;
      var pinMainX = pinMain.offsetLeft - shift.x;

      if (pinMainY < (window.MIN_LOCATION_Y - PIN_HEIGHT)) {
        pinMainY = window.MIN_LOCATION_Y - PIN_HEIGHT;
      } else if (pinMainY > (window.MAX_LOCATION_Y - PIN_HEIGHT)) {
        pinMainY = window.MAX_LOCATION_Y - PIN_HEIGHT;
      }
      if (pinMainX < (window.MIN_LOCATION_X - PIN_WIDTH / 2)) {
        pinMainX = window.MIN_LOCATION_X - PIN_WIDTH / 2;
      } else if (pinMainX > (window.MAX_LOCATION_X - PIN_WIDTH / 2)) {
        pinMainX = window.MAX_LOCATION_X - PIN_WIDTH / 2;
      }
      pinMain.style.top = pinMainY + 'px';
      pinMain.style.left = pinMainX + 'px';
      addressInput.value = Math.floor((pinMain.offsetLeft + PIN_WIDTH / 2)) + ', ' + Math.floor((pinMain.offsetTop + PIN_HEIGHT));
    };
    var onDocumentMouseUp = function (upEvt) {
      upEvt.preventDefault();
      addressInput.value = Math.floor((pinMain.offsetLeft + PIN_WIDTH / 2)) + ', ' + Math.floor((pinMain.offsetTop + PIN_HEIGHT));
      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('mouseup', onDocumentMouseUp);
    };
    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
  };

  function setup(activePage) {
    pinMain.addEventListener('mousedown', onPinMainMouseDown);
    pinMain.addEventListener('mouseup', activePage);
  }

  window.setupDragndrop = setup;
})();
