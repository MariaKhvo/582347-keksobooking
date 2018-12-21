'use strict';

(function () {
  var LOW_HOUSIN_PRICE = 0;
  var MID_HOUSING_PRICE = 10000;
  var HIGH_HOUSING_PRICE = 50000;

  window.compare = {
    getNewPlaces: function (evt, max) {
      var filteredPins = {};
      var selects = evt.currentTarget.querySelectorAll('.map__filter');
      var checkboxes = evt.currentTarget.querySelectorAll('[name=features]');

      selects.forEach(function (select) {
        if (select.value !== 'any') {
          filteredPins[select.name] = select.value;
        }
      });

      filteredPins.checkboxes = [];
      checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
          filteredPins.checkboxes.push(checkbox.value);
        }
      });

      var filteredHousingType = function (element, index, places) {
        return filteredPins['housing-type'] ? filteredPins['housing-type'] === places[index].offer.type : true;
      };

      var filteredHousingPrice = function (element, index, places) {
        var valuePrice = true;

        switch (filteredPins['housing-price']) {
          case 'low':
            valuePrice = places[index].offer.price > LOW_HOUSIN_PRICE && places[index].offer.price < MID_HOUSING_PRICE;
            break;
          case 'middle':
            valuePrice = places[index].offer.price >= MID_HOUSING_PRICE && places[index].offer.price <= HIGH_HOUSING_PRICE;
            break;
          case 'high':
            valuePrice = places[index].offer.price > HIGH_HOUSING_PRICE;
            break;
        }

        return valuePrice;
      };

      var filteredHousingRooms = function (element, index, places) {
        return filteredPins['housing-rooms'] ? parseInt(filteredPins['housing-rooms'], 10) === places[index].offer.rooms : true;
      };

      var filteredHousingGuests = function (element, index, places) {
        return filteredPins['housing-guests'] ? parseInt(filteredPins['housing-guests'], 10) === places[index].offer.guests : true;
      };

      var filteredFeatures = function (element, index, places) {
        var isfeatures;
        var counter = 0;

        if (filteredPins.checkboxes.length > 0) {

          for (var k = 0; k < places.length; k++) {
            places[index].offer.features.forEach(function (feature) {
              if (filteredPins.checkboxes[k] === feature) {
                counter++;
              }
            });
          }

          if (counter === filteredPins.checkboxes.length) {
            isfeatures = places[index];
          }

        } else {
          isfeatures = true;
        }
        return isfeatures;
      };

      var filteredAd = function (element, index, places) {
        return filteredHousingType(element, index, places) && filteredHousingPrice(element, index, places) && filteredHousingRooms(element, index, places) && filteredHousingGuests(element, index, places) && filteredFeatures(element, index, places) ? true : false;
      };

      return window.places.filter(filteredAd).slice(0, max);
    }
  };
})();

