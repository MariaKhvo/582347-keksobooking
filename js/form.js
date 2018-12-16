'use strict';

(function () {
  var rooms = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var submitButton = document.querySelector('.ad-form__submit');

  submitButton.addEventListener('click', function () {

    if (rooms.value === '1' && capacity.value > '1') {
      capacity.setCustomValidity('Выбрано слишком много гостей');
    } else if (rooms.value === '1' && capacity.value === '0') {
      capacity.setCustomValidity('Выберите количество гостей');
    } else if (rooms.value === '2' && capacity.value > '2') {
      capacity.setCustomValidity('Выбрано слишком много гостей');
    } else if (rooms.value === '2' && capacity.value === '0') {
      capacity.setCustomValidity('Выберите количество гостей');
    } else if (rooms.value === '3' && capacity.value > '3') {
      capacity.setCustomValidity('Выбрано слишком много гостей');
    } else if (rooms.value === '3' && capacity.value === '0') {
      capacity.setCustomValidity('Выберите количество гостей');
    } else if (rooms.value === '0' && capacity.value < '100') {
      capacity.setCustomValidity('Выберите количество гостей');
    } else {
      capacity.setCustomValidity('');
    }
  });
})();
