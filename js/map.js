'use strict';
(function () {
  var onDataLoadError = function (message) {
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

  var setPageActive = function (isActive) {
    var map = document.querySelector('.map');
    var form = document.querySelector('.ad-form');

    if (isActive) {
      map.classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');
    } else {
      map.classList.add('map--faded');

      form.classList.add('ad-form--disabled');
      form.reset();

      var mapPinList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var index = 0; index < mapPinList.length; index++) {
        mapPinList[index].remove();
      }
      window.card.closeNotice();

      window.main.pinMain.style.left = window.main.INITIAL_MAIN_PIN_POSITION.x + 'px';
      window.main.pinMain.style.top = window.main.INITIAL_MAIN_PIN_POSITION.y + 'px';
      window.main.pinMain.addEventListener('mousedown', handlePinClick);
      window.main.pinMain.addEventListener('keydown', handlePinClick);
    }

    for (var fieldsetInd = 0; fieldsetInd < window.main.formFieldset.length - 1; fieldsetInd++) {
      if (isActive) {
        window.main.formFieldset[fieldsetInd].removeAttribute('disabled');
      } else {
        window.main.formFieldset[fieldsetInd].setAttribute('disabled', true);
      }
    }
  };

  var handlePinClick = function (evt) {
    evt.preventDefault();

    if (evt.button === 0 || evt.key === 'Enter') {
      window.backend.load(onDataLoadSuccess, onDataLoadError);

      setPageActive(true);

      window.main.pinMain.removeEventListener('mousedown', handlePinClick);
      window.main.pinMain.removeEventListener('keydown', handlePinClick);
    }

    var priceElement = document.querySelector('#price');
    priceElement.value = 1000;
  };

  window.main.pinMain.addEventListener('mousedown', handlePinClick);
  window.main.pinMain.addEventListener('keydown', handlePinClick);

  window.map = {
    setPageActive: setPageActive
  };
})();
