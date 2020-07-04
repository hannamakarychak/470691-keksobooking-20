'use strict';
(function () {
  var userForm = document.querySelector('.ad-form');
  var roomsInputElement = userForm.querySelector('select[name="rooms"]');
  var accomodationSelect = document.querySelector('#type');
  var checkinTime = document.querySelector('#timein');
  var checkoutTime = document.querySelector('#timeout');

  window.map.setPageActive(false);

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

  var handleErrorPopup = function (evt) {
    var errorPopup = document.querySelector('.error');

    if (evt.button === 0 || evt.key === 'Escape') {
      errorPopup.remove();

      window.removeEventListener('keydown', handleErrorPopup);
      window.removeEventListener('mousedown', handleErrorPopup);
    }
  };

  var handleSuccessPopup = function (evt) {
    var successPopup = document.querySelector('.success');

    if (evt.button === 0 || evt.key === 'Escape') {
      successPopup.remove();

      window.removeEventListener('keydown', handleSuccessPopup);
      window.removeEventListener('mousedown', handleSuccessPopup);
    }
  };

  var onDataSaveError = function () {
    var fragment = document.createDocumentFragment();
    var errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorPopupElement = errorPopupTemplate.cloneNode(true);
    var mainPageElement = document.querySelector('main');
    fragment.appendChild(errorPopupElement);
    mainPageElement.appendChild(fragment);

    var errorPopup = document.querySelector('.error');

    if (errorPopup) {
      window.addEventListener('keydown', handleErrorPopup);
      window.addEventListener('mousedown', handleErrorPopup);
    }
  };

  var onDataSaveSuccess = function () {
    var fragment = document.createDocumentFragment();
    var successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
    var successPopupElement = successPopupTemplate.cloneNode(true);
    var mainPageElement = document.querySelector('main');
    fragment.appendChild(successPopupElement);
    mainPageElement.appendChild(fragment);
    window.map.setPageActive(false);
    var successPopup = document.querySelector('.success');

    if (successPopup) {
      window.addEventListener('keydown', handleSuccessPopup);
      window.addEventListener('mousedown', handleSuccessPopup);
    }
  };

  userForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(userForm), onDataSaveSuccess, onDataSaveError);
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
