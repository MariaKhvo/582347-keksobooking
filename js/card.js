'use strict';

(function () {
  var AccomodationType = {'PALACE': 'Дворец', 'FLAT': 'Квартира', 'HOUSE': 'Дом', 'BUNGALO': 'Бунгало'};
  var map = document.querySelector('.map');
  var filterCollection = document.querySelector('.map__filters-container');
  var adElement = document.querySelector('template').content;
  var mapCardPopup = adElement.querySelector('.map__card.popup');
  var mapCardPhotos = adElement.querySelector('.popup__photos');
  var mapCardPhoto = adElement.querySelector('.popup__photo');

  var getValueObject = function (object, value) {
    return object[value];
  };

  var createPhotosFragment = function (index, places) {
    var mapCardAllPhotos = adElement.querySelectorAll('.popup__photo');
    for (var i = 0; i < mapCardAllPhotos.length; i++) {
      mapCardAllPhotos[i].remove();
    }
    if (places[index].offer.photos.length !== 0) {
      for (var k = 0; k < places[index].offer.photos.length; k++) {
        var mapCardPhotoItem = mapCardPhoto.cloneNode(true);
        mapCardPhotoItem.src = places[index].offer.photos[k];
        mapCardPhotos.appendChild(mapCardPhotoItem);
      }
    }
  };

  var addMapCardFeatures = function (index, places) {
    var features = places[index].offer.features;
    var featuresList = document.createDocumentFragment();
    for (var j = 0; j < features.length; j++) {
      var featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + features[j];
      featuresList.appendChild(featureItem);
    }
    return featuresList;
  };

  var renderCard = function () {
    var card = mapCardPopup.cloneNode(true);
    map.insertBefore(card, filterCollection);
  };

  var createElemAd = function (index, places) {
    deleteMapCard();
    var offer = places[index].offer;
    var author = places[index].author;
    adElement.querySelector('.popup__title').textContent = offer.title;
    adElement.querySelector('.popup__text--address').textContent = offer.address;
    adElement.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
    adElement.querySelector('.popup__type').textContent = getValueObject(AccomodationType, places[index].offer.type);
    adElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнат для ' + offer.guests + ' гостей';
    adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
    var featuresNode = adElement.querySelector('.popup__features');
    while (featuresNode.firstChild) {
      featuresNode.removeChild(featuresNode.firstChild);
    }
    featuresNode.appendChild(addMapCardFeatures(index, places));
    adElement.querySelector('.popup__description').textContent = offer.description;
    createPhotosFragment(index, places);
    adElement.querySelector('.popup__avatar').src = author.avatar;
    renderCard();
    var closeCurrentPopup = document.querySelector('.map__card .popup__close');
    closeCurrentPopup.addEventListener('click', deleteMapCard);
    document.addEventListener('keydown', window.util.onPopupEscPress);
  };

  var deleteMapCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.parentNode.removeChild(mapCard);
      document.removeEventListener('keydown', window.util.onPopupEscPress);
    }
  };

  window.card = {
    map: map,
    init: createElemAd,
    delete: deleteMapCard
  };
})();
