'use strict';

(function () {
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var NUMBER_OF_PINS = 8;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinMain = document.querySelector('.map__pin--main');
  var mapPinsElement = document.querySelector('.map__pins');

  var formFieldset = document.getElementsByTagName('fieldset');

  var priceElement = document.querySelector('#price');

  window.main = {
    features: features,
    NUMBER_OF_PINS: NUMBER_OF_PINS,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,

    pinMain: pinMain,
    mapPinsElement: mapPinsElement,

    formFieldset: formFieldset,

    priceElement: priceElement,

    allNotices: [],

    onError: onError,
    onSuccess: onSuccess
  };

  var onError = function (message) {
    alert.error(message);
  };

  var onSuccess = function (data) {
    window.main.allNotices = data;
  };
})();
