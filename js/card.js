'use strict';

(function () {
  var TYPES = {'palace': 'Дворец', 'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};
  var map = document.querySelector('.map');
  var filterCollection = document.querySelector('.map__filters-container');
  var adElement = document.querySelector('template').content;
  var mapCardPopup = adElement.querySelector('.map__card.popup');
  var mapCardPhotos = adElement.querySelector('.popup__photos');
  var mapCardPhoto = adElement.querySelector('.popup__photo');
  var mapCardAllPhotos;

  var getValueObject = function (object, value) {
    return object[value];
  };

  var createMapCardPhotos = function (j, places) {
    mapCardAllPhotos = adElement.querySelectorAll('.popup__photo');
    for (var index = 0; index < mapCardAllPhotos.length; index++) {
      mapCardAllPhotos[index].remove();
    }
    if (places[j].offer.photos.length !== 0) {
      for (var i = 0; i < places[j].offer.photos.length; i++) {
        var mapCardPhotoX = mapCardPhoto.cloneNode(true);
        mapCardPhotoX.src = places[j].offer.photos[i];
        mapCardPhotos.appendChild(mapCardPhotoX);
      }
    }
  };

  var addMapCardFeatures = function (j, places) {
    var features = places[j].offer.features;
    var featuresList = document.createDocumentFragment();

    for (var i = 0; i < features.length; i++) {
      var feature = document.createElement('li');
      feature.className = 'popup__feature';
      feature.classList.add('popup__feature--' + features[i]);
      feature.textContent = features[i];
      featuresList.appendChild(feature);
    }

    return featuresList;
  };

  var renderCard = function () {
    var card = mapCardPopup.cloneNode(true);
    map.insertBefore(card, filterCollection);
  };

  var createElemAd = function (i, places) {
    deleteMapCard();
    var offer = places[i].offer;
    var author = places[i].author;
    adElement.querySelector('.popup__title').textContent = offer.title;
    adElement.querySelector('.popup__text--address').textContent = offer.address;
    adElement.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
    adElement.querySelector('.popup__type').textContent = getValueObject(TYPES, places[i].offer.type);
    adElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнат для ' + offer.guests + ' гостей';
    adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
    var featuresNode = adElement.querySelector('.popup__features');
    while (featuresNode.firstChild) {
      featuresNode.removeChild(featuresNode.firstChild);
    }
    featuresNode.appendChild(addMapCardFeatures(i, places));
    adElement.querySelector('.popup__description').textContent = offer.description;
    createMapCardPhotos(i, places);
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


