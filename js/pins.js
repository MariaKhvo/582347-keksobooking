'use strict';

(function () {
  var GAP_X = 25;
  var GAP_Y = 70;
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  var REMOVE_ERROR_TIME = 5000;
  var MAX_OF_ELEM = 5;

  var initPlaces = function () {
    renderPlaces(window.places.slice(0, MAX_OF_ELEM));
  };

  var mapPins = document.querySelector('.map__pins');

  var renderPlaces = function (places) {
    for (var i = 0; i < places.length; i++) {
      var pin = document.createElement('button');
      var img = document.createElement('img');
      pin.type = 'button';
      pin.classList.add('map__pin');
      pin.style.left = places[i].location.x - GAP_X + 'px';
      pin.style.top = places[i].location.y - GAP_Y + 'px';
      pin.setAttribute('data-index', i);

      img.src = places[i].author.avatar;
      img.width = PIN_WIDTH;
      img.height = PIN_HEIGHT;
      img.draggable = false;
      img.alt = places[i].offer.title;

      mapPins.appendChild(pin);
      pin.appendChild(img);
    }
    allMapPinButtons = document.querySelectorAll('button[type="button"].map__pin');
  };

  var deleteAllPins = function () {
    var allPins = document.querySelectorAll('button[type="button"].map__pin');
    for (var i = 0; i < allPins.length; i++) {
      allPins[i].remove();
    }
  };

  var allMapPinButtons;

  var setEventForButtons = function (places) {
    for (var i = 0; i < places.length; i++) {
      allMapPinButtons[i].addEventListener('click', function (index) {
        var target = index.target;
        if (target.tagName === 'IMG') {
          target = target.parentNode;
        }
        var dataIndex = target.getAttribute('data-index');
        window.card.init(dataIndex, places);
      });
    }
  };

  var getAllFilters = function () {
    var allFilters = document.querySelectorAll('.map__filters');
    for (var i = 0; i < allFilters.length; i++) {
      allFilters[i].addEventListener('change', function (evt) {
        window.util.debounce(updatePlaces(evt));
      });
    }
  };

  var updatePlaces = function (evt) {
    deleteAllPins();
    var newPlaces = window.filter.getNewPlaces(evt, MAX_OF_ELEM);
    renderPlaces(newPlaces);
    setEventForButtons(newPlaces);
    window.card.delete();
  };

  var successElement = function (places) {
    window.places = places;
  };

  var errorElement = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
    setTimeout(function () {
      node.remove();
    }, REMOVE_ERROR_TIME);
  };

  window.backend.load(successElement, errorElement);
  window.pins = {
    init: initPlaces,
    setEventForButtons: setEventForButtons,
    getAllFilters: getAllFilters,
    delete: deleteAllPins,
    MAX_OF_ELEM: MAX_OF_ELEM
  };
})();
