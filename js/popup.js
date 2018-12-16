'use strict';

(function () {
  var titleType = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var popupPhoto = document.querySelector('template').content.querySelector('.popup__photo');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapElement = document.querySelector('.map');
  var filterCollection = document.querySelector('.map__filters-container');
  var currentPopup;

  var closeCurrentPopup = function () {
    if (currentPopup) {
      currentPopup.parentElement.removeChild(currentPopup);
      currentPopup = undefined;
    }
  };

  var createFeatureFragment = function (features) {
    var featureFragment = document.createDocumentFragment();
    for (var j = 0; j < features.length; j++) {
      var featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + features[j];
      featureFragment.appendChild(featureItem);
    }
    return featureFragment;
  };

  var createPhotosFragment = function (arrObject) {
    var photosFragment = document.createDocumentFragment();
    for (var t = 0; t < arrObject.length; t++) {
      var popupPhotoItem = popupPhoto.cloneNode(true);
      popupPhotoItem.src = arrObject[t];
      photosFragment.appendChild(popupPhotoItem);
    }
    return photosFragment;
  };


  function createPopup(card) {
    var popup = createElemAd(card);
    closeCurrentPopup();
    currentPopup = popup;
    mapElement.insertBefore(popup, filterCollection);
    popup.classList.remove('hidden');
  }

  var createElemAd = function (firstCard) {
    var adElement = cardTemplate.cloneNode(true);
    adElement.querySelector('.popup__title').textContent = firstCard.offer.title;
    adElement.querySelector('.popup__avatar').src = firstCard.author.avatar;
    adElement.querySelector('.popup__text--address').textContent = firstCard.offer.address;
    adElement.querySelector('.popup__text--price').textContent = firstCard.offer.price + '₽/ночь';
    adElement.querySelector('.popup__type').textContent = titleType[firstCard.offer.type];
    adElement.querySelector('.popup__text--capacity').textContent = firstCard.offer.rooms + ' комнаты для ' + firstCard.offer.guests + ' гостей';
    adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + firstCard.offer.checkin + ', выезд до ' + firstCard.offer.checkout;
    adElement.replaceChild(createFeatureFragment(firstCard.offer.features), adElement.querySelector('.popup__features'));
    adElement.querySelector('.popup__description').textContent = firstCard.description;
    adElement.replaceChild(createPhotosFragment(firstCard.offer.photos), adElement.querySelector('.popup__photos'));
    var closeButton = adElement.querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
      closeCurrentPopup();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        closeCurrentPopup();
      }
    }, true);
    return adElement;
  };

  window.createPopup = createPopup;
  window.closeCurrentPopup = closeCurrentPopup;
})();
