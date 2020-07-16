'use strict';
(function () {
  var userForm = document.querySelector('.ad-form');
  var roomsInputElement = userForm.querySelector('select[name="rooms"]');
  var accomodationSelect = document.querySelector('#type');
  var checkinTime = document.querySelector('#timein');
  var checkoutTime = document.querySelector('#timeout');

  window.map.setPageActive(false);

  var handleResetClick = function () {
    window.map.setPageActive(false);
  };

  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', handleResetClick);

  var handleTypeChange = function (evt) {
    var accomodationPrice = {
      bungalo: 0,
      flat: 1000,
      house: 5000,
      palace: 10000
    };

    var type = evt.target.value;
    var minPrice = accomodationPrice[type];

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
    var capacityInputSelect = userForm.querySelector('select[name="capacity"]');
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

  userForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(userForm), window.popup.handleSuccessPopupOpen, window.popup.handleErrorPopupOpen);
  });

  var roomsInputChangeHandler = function () {
    calculateRoomsAndCapacity();
  };

  roomsInputElement.addEventListener('change', roomsInputChangeHandler);

  var handleCheckinTimeChange = function (evt) {
    checkoutTime.value = evt.target.value;
  };

  checkinTime.addEventListener('change', handleCheckinTimeChange);

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
