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

var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

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

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElem = function (srcArray) {
  return srcArray[getRandomInRange(0, srcArray.length)];
};

var getAvatar = function (i) {
  return 'img/avatars/user' + (i < 10 ? '0' : '') + (i + 1) + '.png';
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
        photos: getArrForRandomLength(PHOTOS),
      },
      location: location
    };
    arrOffers.push(arrObject);
  }
  return arrOffers;
};
getArrForOffers(totalAds);

var mapElement = document.querySelector('.map');
mapElement.classList.remove('map--faded');

// lesson 3 DOM in .map__pin

var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');

var createPin = function (avatar, coordinates, title) {
  var pinElem = pinTemplate.cloneNode(true);
  pinElem.style.left = coordinates.x + 'px';
  pinElem.style.top = coordinates.y + 'px';
  pinElem.querySelector('img').src = avatar;
  pinElem.querySelector('img').alt = title;
  return pinElem;
};
createPin();

// lesson 4 DOM in .map-pins

var createPins = function (pinsData) {
  var fragment = document.createDocumentFragment();
  for (var k = 0; k < pinsData.length; k++) {
    fragment.appendChild(createPins(pinsData[k]));
  }
  return fragment;
};
createPins();

var createFeature = function (adFeature) {
  var featureElement = document.createDocumentFragment();
  for (var j = 0; j < adFeature.offer.features.length; j++) {
    var featureAd = document.createElement('li');
    featureAd.className = 'popup__feature popup__feature--' + adFeature.offer.features[j];
    featureElement.appendChild(featureAd);
  }
  return featureElement;
};

// lesson 5

var createElemAd = function (ad) {
  var adElement = document.querySelector('template').content.querySelector('article.map__card').cloneNode(true);
  adElement.querySelector('.popup__title').textContent = ad.offer.title;
  adElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  adElement.querySelector('.popup__text--price').textContent = ad.offer.price + '=/ночь';
  adElement.querySelector('.popup__type').textContent = TYPES[ad.offer.type];
  adElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  adElement.quertySelector('.popup__features').appendChild(createFeature(ad.offer.features));
  adElement.querySelector('.popup__description').textContent = ad.offer.description;
  adElement.querySelector('.popup__photos').removeChild(adElement.querySelector('.popup__photo'));
  return adElement;
};
createElemAd();
