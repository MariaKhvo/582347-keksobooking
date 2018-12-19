'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var mapForm = document.querySelector('.map__filters');
  var adFormElements = adForm.querySelectorAll('fieldset');
  var mapElements = mapForm.querySelectorAll('select');
  var mapPinsBlock = document.querySelector('.map__pins');
  var pinMain = mapPinsBlock.querySelector('.map__pin--main');
  var mapElement = document.querySelector('.map');

  var setDisabledFormElements = function (formElements, status) {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = status;
    }
  };
  setDisabledFormElements(adFormElements, true);
  setDisabledFormElements(mapElements, true);

  var activePage = function () {
    setDisabledFormElements(adFormElements, false);
    setDisabledFormElements(mapElements, false);
    adForm.classList.remove('ad-form--disabled');
    mapElement.classList.remove('map--faded');
    pinMain.removeEventListener('mouseup', activePage);
    mapPinsBlock.appendChild(window.createPins(window.data));
  };

  window.setupDragndrop(activePage);
})();
