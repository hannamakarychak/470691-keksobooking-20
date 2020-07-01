'use strict';
(function () {
  var handlePinClick = function (evt) {
    window.backend.load('https://javascript.pages.academy/keksobooking/data', window.main.onSuccess, window.main.onError);
    evt.preventDefault();

    if (evt.button === 0 || evt.key === 'Enter') {
      var map = document.querySelector('.map');
      map.classList.remove('map--faded');
      var form = document.querySelector('.ad-form');
      form.classList.remove('ad-form--disabled');

      var fragment = document.createDocumentFragment();

      for (var noticeIndex = 0; noticeIndex < window.main.NUMBER_OF_PINS; noticeIndex++) {
        var currentNotice = window.main.allNotices[noticeIndex];

        fragment.appendChild(window.pin.renderPin(currentNotice));
      }

      window.main.mapPinsElement.appendChild(fragment);

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
