'use strict';
(function () {
  var userForm = document.querySelector('.ad-form');
  var roomsInputElement = userForm.querySelector('select[name="rooms"]');
  var accomodationSelect = document.querySelector('#type');
  var formFilters = document.querySelector('.map__filters');
  var formAddress = document.getElementById('address');
  var checkinTime = document.querySelector('#timein');
  var checkoutTime = document.querySelector('#timeout');

  for (var fieldsetIndex = 0; fieldsetIndex < window.main.formFieldset.length - 1; fieldsetIndex++) {
    window.main.formFieldset[fieldsetIndex].setAttribute('disabled', true);
  }
  var PIN_DISABLED_WIDTH = 65;
  var PIN_DISABLED_HEIGHT = 65;
  formFilters.classList.add('ad-form--disabled');

  var initialPinPosition = window.pin.getPinPosition();

  var pinDisabledX = Math.round(initialPinPosition.x + PIN_DISABLED_WIDTH / 2);
  var pinDisabledY = Math.round(initialPinPosition.y + PIN_DISABLED_HEIGHT / 2);

  formAddress.value = pinDisabledX + ', ' + pinDisabledY;

  var handleTypeChange = function (evt) {
    var PRICE_BUNGALO = 0;
    var PRICE_FLAT = 1000;
    var PRICE_HOUSE = 5000;
    var PRICE_PALACE = 10000;

    var type = evt.target.value;
    var minPrice;
    if (type === 'bungalo') {
      minPrice = PRICE_BUNGALO;
    }
    if (type === 'flat') {
      minPrice = PRICE_FLAT;
    }
    if (type === 'house') {
      minPrice = PRICE_HOUSE;
    }
    if (type === 'palace') {
      minPrice = PRICE_PALACE;
    }

    window.main.priceElement.min = minPrice;
    window.main.priceElement.placeholder = minPrice;
    window.main.priceElement.value = minPrice;
  };

  accomodationSelect.addEventListener('change', handleTypeChange);

  var setDisabledValue = function (elements, values) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = values.indexOf(elements[i].value) > -1;
    }
  };

  var calculateRoomsAndCapacity = function () {
    var capacityInputSelect = window.main.userForm.querySelector('select[name="capacity"]');
    var capacityOptionOptions = capacityInputSelect.querySelectorAll('option');
    var roomsInputValue = roomsInputElement.value;

    switch (roomsInputValue) {
      case '1':
        setDisabledValue(capacityOptionOptions, ['0', '2', '3']);
        capacityOptionOptions[0].selected = true;
        break;
      case '2':
        setDisabledValue(capacityOptionOptions, ['0', '3']);
        capacityOptionOptions[1].selected = true;
        break;
      case '3':
        setDisabledValue(capacityOptionOptions, ['0']);
        capacityOptionOptions[2].selected = true;
        break;
      case '100':
        setDisabledValue(capacityOptionOptions, ['1', '2', '3']);
        capacityOptionOptions[3].selected = true;
        break;
    }
  };

  var roomsInputChangeHandler = function () {
    calculateRoomsAndCapacity();
  };

  roomsInputElement.addEventListener('change', roomsInputChangeHandler);

  var handleCheckinTimeChange = function (evt) {
    checkoutTime.value = evt.target.value;
  };

  window.main.checkinTime.addEventListener('change', handleCheckinTimeChange);

  var handleCheckoutTimeChange = function (evt) {
    checkinTime.value = evt.target.value;
  };

  checkoutTime.addEventListener('change', handleCheckoutTimeChange);

  window.form = {
    handleTypeChange: handleTypeChange,
    setDisabledValue: setDisabledValue,
    calculateRoomsAndCapacity: calculateRoomsAndCapacity,
    roomsInputChangeHandler: roomsInputChangeHandler
  };
})();
