'use strict';

(function () {
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var MAX_NUMBER_OF_PINS = 5;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var INITIAL_MAIN_PIN_POSITION = {
    x: 570,
    y: 375
  };

  var pinMain = document.querySelector('.map__pin--main');
  var mapPinsElement = document.querySelector('.map__pins');

  var formFieldset = document.getElementsByTagName('fieldset');

  var priceElement = document.querySelector('#price');

  window.main = {
    features: features,
    MAX_NUMBER_OF_PINS: MAX_NUMBER_OF_PINS,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    INITIAL_MAIN_PIN_POSITION: INITIAL_MAIN_PIN_POSITION,

    pinMain: pinMain,
    mapPinsElement: mapPinsElement,

    formFieldset: formFieldset,

    priceElement: priceElement,

    allNotices: []
  };
})();
