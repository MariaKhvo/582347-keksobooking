'use strict';

var totalAds = 8;

var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var CHECKINS = [
  '12:00',
  '13:00',
  '14:00'
];

var CHECKOUT = [
  '12:00',
  '13:00',
  '14:00'
];

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElem = function (srcArray) {
  return srcArray[getRandomInRange(0, srcArray.length)];
};

var getAvatar = function (i) {
  return 'img/avatars/user' + (i < 10 ? '0' : '') + i + '.png';
};

var getArrForRandomLength = function (srcArray) {
  var randomLength = getRandomInRange(0, srcArray.length, true);
  return srcArray.slice(0, randomLength);
};

var getArrForOffers = function (numbers) {
  var arrOffers = [];
  for (var i = 0; i < numbers; i++) {
    var location = {
      x: getRandomInRange(300, 900),
      y: getRandomInRange(130, 630)
    };

    var arrObject = {
      author: {
        avatar: getAvatar(i + 1)
      },
      offer: {
        title: getRandomElem(TITLES),
        address: location.x + ',' + location.y,
        price: getRandomInRange(1000, 1000000),
        type: getRandomElem(TYPES),
        rooms: getRandomInRange(1, 5),
        guests: getRandomInRange(1, 12),
        checkin: getRandomElem(CHECKINS),
        checkout: getRandomElem(CHECKOUT),
        features: getArrForRandomLength(FEATURES),
        description: '',
        photos: PHOTOS,
      },
      location: location
    };
    arrOffers.push(arrObject);
  }
  return arrOffers;
};


var mapElement = document.querySelector('.map');
mapElement.classList.remove('.map--faded');

// lesson 3 DOM in .map__pin

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var createPin = function (avatar, coordinates, title) {
  var pinElem = pinTemplate.cloneNode(true);
  pinElem.style.left = (coordinates.x - PIN_WIDTH / 2) + 'px';
  pinElem.style.top = (coordinates.y - PIN_HEIGHT) + 'px';
  pinElem.querySelector('img').src = avatar;
  pinElem.querySelector('img').alt = title;
  return pinElem;
};


// lesson 4 DOM in .map-pins

var mapPinsBlock = document.querySelector('.map__pins');

var createPins = function (pinsData) {
  var fragment = document.createDocumentFragment();
  for (var k = 0; k < pinsData.length; k++) {
    fragment.appendChild(createPin(pinsData[k].author.avatar, pinsData[k].location, pinsData[k].offer.title));
  }
  return fragment;
};

mapPinsBlock.appendChild(createPins(getArrForOffers(totalAds)));


// lesson 5

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var popupPhoto = document.querySelector('template').content.querySelector('.popup__photo');
var filterCollection = document.querySelector('.map__filters-container');


var createFeatureFragment = function (arrObject) {
  var featureFragment = document.createDocumentFragment();
  for (var j = 0; j < arrObject.offer.features.length; j++) {
    var featureItem = document.createElement('li');
    featureItem.className = 'popup__feature popup__feature--' + arrObject.offer.features[j];
    featureFragment.appendChild(featureItem);
  }
  return featureFragment;
};

var createPhotosFragment = function (arrObject) {
  var photosFragment = document.createDocumentFragment();
  for (var t = 0; t < arrObject.offer.photos.length; t++) {
    var popupPhotoItem = popupPhoto.cloneNode(true);
    popupPhotoItem.src = arrObject.offer.photos[t];
    photosFragment.appendChild(popupPhotoItem);
  }
  return photosFragment;
};

var createElemAd = function (firstCard) {
  var adElement = cardTemplate.cloneNode(true);
  adElement.querySelector('.popup__title').textContent = firstCard[0].offer.title;
  adElement.querySelector('.popup__text--address').textContent = firstCard[0].offer.address;
  adElement.querySelector('.popup__text--price').textContent = firstCard[0].offer.price + '₽/ночь';
  adElement.querySelector('.popup__type').textContent = TYPES[firstCard[0].offer.type];
  adElement.querySelector('.popup__text--capacity').textContent = firstCard[0].offer.rooms + ' комнаты для ' + firstCard[0].offer.guests + ' гостей';
  adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + firstCard[0].offer.checkin + ', выезд до ' + firstCard[0].offer.checkout;
  adElement.querySelector('.popup__features').appendChild(createFeatureFragment(firstCard[0]));
  adElement.querySelector('.popup__description').textContent = firstCard[0].description;
  adElement.querySelector('.popup__photos').appendChild(createPhotosFragment(firstCard[0]));
  return adElement;
};

// mapElement.appendChild(createElemAd(getArrForOffers(totalAds)));
mapElement.insertBefore(createElemAd(getArrForOffers(totalAds)), filterCollection);
