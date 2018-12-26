'use strict';

(function () {
  var MAX_PRICES = [1000, 0, 5000, 10000];
  var DATA_ROOMS = {
    one: [2],
    two: [2, 1],
    three: [2, 1, 0],
    hundred: [3]
  };
  var MAIN_PIN_GAP_X = 32;
  var MAIN_PIN_GAP_Y = 84;
  var LIMIT_TOP_Y = 130;
  var LIMIT_BOTTOM_Y = 630;

  var adFormFieldsets = document.querySelectorAll('.ad-form fieldset');
  var adForm = document.querySelector('.ad-form');

  var setFieldsetsTrigger = function (triggerBoolean) {
    for (var i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].disabled = triggerBoolean;
    }
  };
  setFieldsetsTrigger(true);

  var inputAdType = document.querySelector('#type');
  var inputAdPrice = document.querySelector('#price');

  var setInputPrice = function () {
    for (var i = 0; i < MAX_PRICES.length; i++) {
      if (inputAdType.selectedIndex === i) {
        inputAdPrice.placeholder = MAX_PRICES[i];
        inputAdPrice.min = MAX_PRICES[i];
      }
    }
  };

  inputAdType.addEventListener('change', function () {
    setInputPrice();
  });

  var inputAdTimein = document.querySelector('#timein');
  var inputAdTimeout = document.querySelector('#timeout');

  var changeInputAdTime = function (timein, timeout) {
    if (timein.selectedIndex !== timeout.selectedIndex) {
      timeout.selectedIndex = timein.selectedIndex;
    }
  };

  inputAdTimein.addEventListener('change', function () {
    changeInputAdTime(inputAdTimein, inputAdTimeout);
  });
  inputAdTimeout.addEventListener('change', function () {
    changeInputAdTime(inputAdTimeout, inputAdTimein);
  });

  var inputAdRooms = document.querySelector('#room_number');
  var inputAdGuests = document.querySelector('#capacity');

  inputAdRooms.addEventListener('change', function (evt) {
    for (var j = 0; j < inputAdGuests.length; j++) {
      inputAdGuests[j].disabled = true;
    }
    var selectedRooms = evt.target.selectedIndex;
    var availableGuests = Object.values(DATA_ROOMS)[selectedRooms];
    for (var i = 0; i < availableGuests.length; i++) {
      inputAdGuests[availableGuests[i]].disabled = false;
      inputAdGuests.selectedIndex = availableGuests[0];
    }
  });

  var getMainPinXY = function (position, gap) {
    return Number.parseInt(position.split('px', 1), 10) + gap;
  };

  var mapMainPin = document.querySelector('.map__pin--main');
  var inputAddress = document.querySelector('#address');
  var setCoordsToInput = function () {
    var yMainPin = getMainPinXY(mapMainPin.style.top, MAIN_PIN_GAP_Y);
    if (yMainPin > LIMIT_BOTTOM_Y) {
      yMainPin = LIMIT_BOTTOM_Y;
    } else if (yMainPin < LIMIT_TOP_Y) {
      yMainPin = LIMIT_TOP_Y;
    }
    inputAddress.value = getMainPinXY(mapMainPin.style.left, MAIN_PIN_GAP_X) + ', ' + yMainPin;
  };

  setCoordsToInput();

  var success = document.querySelector('.success');
  var closeSuccessMessage = function () {
    success.classList.add('hidden');
    success.removeEventListener('click', onSuccessMessageClick);
    document.removeEventListener('keydown', onSuccessEscPress);
  };

  var onSuccessMessageClick = function () {
    closeSuccessMessage();
  };

  var onSuccessEscPress = function (evt) {
    if (window.util.isEscPressed(evt)) {
      closeSuccessMessage();
    }
  };

  var onSuccessUpload = function () {
    success.classList.remove('hidden');
    success.addEventListener('click', onSuccessMessageClick);
    document.addEventListener('keydown', onSuccessEscPress);
  };

  var errorMessage = document.querySelector('.error');
  var errorButton = errorMessage.querySelector('.error__button');
  var closeErrorMessage = function () {
    errorMessage.classList.add('hidden');
    errorMessage.removeEventListener('click', onErrorMessageClick);
    document.removeEventListener('keydown', onErrorEscPress);
  };

  var onErrorMessageClick = function () {
    closeErrorMessage();
  };

  var onErrorEscPress = function (evt) {
    if (window.util.isEscPressed(evt)) {
      closeSuccessMessage();
    }
  };

  var onErrorsUpload = function () {
    errorMessage.classList.remove('hidden');
    errorMessage.addEventListener('click', onErrorMessageClick);
    errorButton.addEventListener('click', onErrorMessageClick);
    document.addEventListener('keydown', onErrorEscPress);
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), onSuccessUpload, onErrorsUpload);
    adForm.reset();
    resetAdForm();
    resetFilterForm();
    evt.preventDefault();
  });

  var resetAdForm = function () {
    setFieldsetsTrigger(true);
    adForm.classList.add('ad-form--disabled');
    window.card.map.classList.add('map--faded');
    window.pins.delete();
    mapMainPin.style.left = '570px';
    mapMainPin.style.top = '375px';
    setCoordsToInput();
    window.card.delete();
  };

  var resetFilterForm = function () {
    var mapFilters = document.querySelectorAll('.map__filter');
    var mapCheckboxes = document.querySelectorAll('.map__checkbox');

    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].value = 'any';
    }
    for (var j = 0; j < mapCheckboxes.length; j++) {
      mapCheckboxes[j].checked = false;
    }
  };

  var adFormResetButton = document.querySelector('.ad-form__reset');
  adFormResetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    adForm.reset();
    resetAdForm();
    resetFilterForm();
  });

  window.form = {
    adForm: adForm,
    setFieldsetsTrigger: setFieldsetsTrigger,
    setCoordsToInput: setCoordsToInput,
    mapMainPin: mapMainPin,
    MAIN_PIN_GAP_X: MAIN_PIN_GAP_X,
    MAIN_PIN_GAP_Y: MAIN_PIN_GAP_Y,
    LIMIT_TOP_Y: LIMIT_TOP_Y,
    LIMIT_BOTTOM_Y: LIMIT_BOTTOM_Y
  };
})();
