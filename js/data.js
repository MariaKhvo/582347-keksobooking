'use strict';

(function () {
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
    var index = getRandomInRange(0, srcArray.length - 1);
    return srcArray[index];
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
        x: getRandomInRange(window.MIN_LOCATION_X, window.MAX_LOCATION_X),
        y: getRandomInRange(window.MIN_LOCATION_Y, window.MAX_LOCATION_Y)
      };
      var randomType = getRandomElem(TYPES);
      var arrObject = {
        author: {
          avatar: getAvatar(i + 1)
        },
        offer: {
          title: getRandomElem(TITLES),
          address: location.x + ',' + location.y,
          price: getRandomInRange(1000, 1000000),
          type: randomType,
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
  window.data = getArrForOffers(totalAds);
})();
