'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var createPin = function (avatar, coordinates, title, index) {
    var pinElem = pinTemplate.cloneNode(true);
    pinElem.style.left = (coordinates.x - PIN_WIDTH / 2) + 'px';
    pinElem.style.top = (coordinates.y - PIN_HEIGHT) + 'px';
    pinElem.querySelector('img').src = avatar;
    pinElem.querySelector('img').alt = title;
    pinElem.addEventListener('click', function (evt) {
      evt.preventDefault();
      var card = window.data[index];
      window.createPopup(card);
    });
    return pinElem;
  };

  var createPins = function (pinsData) {
    var fragment = document.createDocumentFragment();
    for (var k = 0; k < pinsData.length; k++) {
      fragment.appendChild(createPin(pinsData[k].author.avatar, pinsData[k].location, pinsData[k].offer.title, k));
    }
    return fragment;
  };

  window.createPins = createPins;
})();
