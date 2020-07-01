'use strict';
(function () {
  var onError = function (message) {
    alert.error(message);
  };

  var onDataLoadSuccess = function (data) {
    var fragment = document.createDocumentFragment();

    for (var noticeIndex = 0; noticeIndex < window.main.NUMBER_OF_PINS; noticeIndex++) {
      var currentNotice = data[noticeIndex];

      fragment.appendChild(window.pin.renderPin(currentNotice));
    }

    window.main.mapPinsElement.appendChild(fragment);
  };

  var handlePinClick = function (evt) {
    evt.preventDefault();

    if (evt.button === 0 || evt.key === 'Enter') {
      window.backend.load('https://javascript.pages.academy/keksobooking/data', onDataLoadSuccess, onError);

      var map = document.querySelector('.map');
      map.classList.remove('map--faded');
      var form = document.querySelector('.ad-form');
      form.classList.remove('ad-form--disabled');

      for (var fieldsetInd = 0; fieldsetInd < window.main.formFieldset.length - 1; fieldsetInd++) {
        window.main.formFieldset[fieldsetInd].removeAttribute('disabled');
      }

      var mainPinClicked = true;
    }

    if (mainPinClicked) {
      window.main.pinMain.removeEventListener('mousedown', handlePinClick);
      window.main.pinMain.removeEventListener('keydown', handlePinClick);
    }

    var priceElement = document.querySelector('#price');
    priceElement.value = 1000;
  };

  window.main.pinMain.addEventListener('mousedown', handlePinClick);
  window.main.pinMain.addEventListener('keydown', handlePinClick);

  window.map = {};
})();
