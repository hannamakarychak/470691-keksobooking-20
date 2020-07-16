'use strict';
(function () {
  var accomodationTypeFilter = document.querySelector('#housing-type');
  var accomodationPriceFilter = document.querySelector('#housing-price');
  var accomodationRoomsFilter = document.querySelector('#housing-rooms');
  var accomodationGuestsFilter = document.querySelector('#housing-guests');
  var accomodationFeaturesFilter = document.querySelectorAll('#housing-features input');
  var ANY_FILTER_VALUE = 'any';
  var PRICE_LOW = 10000;
  var PRICE_HIGH = 50000;

  var checkPrice = function (price, priceCategory) {
    if (priceCategory === 'low' && price <= PRICE_LOW) {
      return true;
    }

    if (priceCategory === 'middle' && price <= PRICE_HIGH && price >= PRICE_LOW) {
      return true;
    }

    return priceCategory === 'high' && price >= PRICE_HIGH;
  };

  var checkFeatures = function (noticeFeatures, filtersFeatures) {
    for (var i = 0; i < filtersFeatures.length; i++) {
      if (noticeFeatures.indexOf(filtersFeatures[i]) === -1) {
        return false;
      }
    }
    return true;
  };

  var handleFilterChange = window.debounce(function () {
    var checkedAccomodationFeaturesFilters = Array.from(document.querySelectorAll('#housing-features input:checked'));
    var featuresFilterValues = checkedAccomodationFeaturesFilters.map(function (currentFeaturesFilter) {
      return currentFeaturesFilter.value;
    });

    var filters = {
      type: accomodationTypeFilter.value,
      price: accomodationPriceFilter.value,
      rooms: accomodationRoomsFilter.value,
      guests: accomodationGuestsFilter.value,
      features: featuresFilterValues
    };

    var filteredData = window.main.allNotices.filter(function (notice) {
      var isTypeMatch = filters.type === ANY_FILTER_VALUE || notice.offer.type === filters.type;
      var isPriceMatch = filters.price === ANY_FILTER_VALUE || checkPrice(notice.offer.price, filters.price);
      var isRoomMatch = filters.rooms === ANY_FILTER_VALUE || notice.offer.rooms === parseInt(filters.rooms, 10);
      var isGuestsMatch = filters.guests === ANY_FILTER_VALUE || notice.offer.guests === parseInt(filters.guests, 10);
      var isOfferPresent = function () {
        if (notice.offer) {
          return true;
        }
        return false;
      };

      if (isTypeMatch && isPriceMatch && isRoomMatch && isGuestsMatch && checkFeatures(notice.offer.features, filters.features) && isOfferPresent()) {
        return true;
      }

      return false;
    });

    window.card.closeNotice();
    window.map.removePins();
    window.map.renderPins(filteredData);
  });

  accomodationTypeFilter.addEventListener('change', handleFilterChange);
  accomodationPriceFilter.addEventListener('change', handleFilterChange);
  accomodationRoomsFilter.addEventListener('change', handleFilterChange);
  accomodationGuestsFilter.addEventListener('change', handleFilterChange);
  Array.from(accomodationFeaturesFilter).forEach(function (featuresFilter) {
    featuresFilter.addEventListener('change', handleFilterChange);
  });
})();
