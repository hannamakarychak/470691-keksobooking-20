'use strict';
(function () {
  var handlePinClick = function (evt) {
    evt.preventDefault();

    if (evt.button === 0 || evt.key === 'Enter') {
      var map = document.querySelector('.map');
      map.classList.remove('map--faded');
      var form = document.querySelector('.ad-form');
      form.classList.remove('ad-form--disabled');

      var allNotices = window.data.getNotices();

      var fragment = document.createDocumentFragment();

      for (var noticeIndex = 0; noticeIndex < window.main.NUMBER_OF_PINS; noticeIndex++) {
        var currentNotice = allNotices[noticeIndex];

        fragment.appendChild(window.pin.renderPin(currentNotice));
      }

      window.main.mapPinsElement.appendChild(fragment);

      for (var fieldsetInd = 0; fieldsetInd < window.main.formFieldset.length - 1; fieldsetInd++) {
        window.main.formFieldset[fieldsetInd].removeAttribute('disabled');
      }

      var currentPinPosition = window.pin.getPinPosition();
      var currentPinX = Math.round(currentPinPosition.x + window.main.PIN_WIDTH / 2);
      var currentPinY = Math.round(currentPinPosition.y + window.main.PIN_HEIGHT);

      var activeFormAddress = document.getElementById('address');
      activeFormAddress.value = currentPinX + ', ' + currentPinY;

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
