'use strict';
(function () {
  var PIN_DISABLED_WIDTH = 65;
  var PIN_DISABLED_HEIGHT = 65;
  var formAddress = document.getElementById('address');

  var renderPins = function (data) {
    var fragment = document.createDocumentFragment();

    for (var noticeIndex = 0; noticeIndex < data.length; noticeIndex++) {
      if (noticeIndex > window.main.MAX_NUMBER_OF_PINS - 1) {
        break;
      }

      var currentNotice = data[noticeIndex];

      fragment.appendChild(window.pin.renderPin(currentNotice));
    }

    window.main.mapPinsElement.appendChild(fragment);
  };

  var removePins = function () {
    var mapPinList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var index = 0; index < mapPinList.length; index++) {
      mapPinList[index].remove();
    }
  };

  var onDataLoadError = function () {};

  var onDataLoadSuccess = function (data) {
    window.main.allNotices = data;

    renderPins(data);
  };

  var setPageActive = function (isActive) {
    var map = document.querySelector('.map');
    var form = document.querySelector('.ad-form');
    var submitButton = document.querySelector('.ad-form__submit');
    var resetButton = document.querySelector('.ad-form__reset');

    if (isActive) {
      map.classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');

      var initialPinPosition = window.pin.getPinPosition();

      var pinDisabledX = Math.round(initialPinPosition.x + PIN_DISABLED_WIDTH / 2);
      var pinDisabledY = Math.round(initialPinPosition.y + PIN_DISABLED_HEIGHT / 2);

      submitButton.removeAttribute('disabled');
      resetButton.removeAttribute('disabled');

      formAddress.value = pinDisabledX + ', ' + pinDisabledY;
    } else {
      map.classList.add('map--faded');

      form.classList.add('ad-form--disabled');
      form.reset();
      removePins();
      window.card.closeNotice();

      submitButton.setAttribute('disabled', true);
      resetButton.setAttribute('disabled', true);

      window.main.pinMain.style.left = window.main.INITIAL_MAIN_PIN_POSITION.x + 'px';
      window.main.pinMain.style.top = window.main.INITIAL_MAIN_PIN_POSITION.y + 'px';
      window.main.pinMain.addEventListener('mousedown', handlePinClick);
      window.main.pinMain.addEventListener('keydown', handlePinClick);

      initialPinPosition = window.pin.getPinPosition();

      pinDisabledX = Math.round(initialPinPosition.x + PIN_DISABLED_WIDTH / 2);
      pinDisabledY = Math.round(initialPinPosition.y + PIN_DISABLED_HEIGHT / 2);

      formAddress.value = pinDisabledX + ', ' + pinDisabledY;
    }

    var filters = document.querySelectorAll('.map__filter');
    for (var filtersIndex = 0; filtersIndex < filters.length; filtersIndex++) {
      if (isActive) {
        filters[filtersIndex].removeAttribute('disabled');
      } else {
        filters[filtersIndex].setAttribute('disabled', true);
      }
    }

    var filterFeatures = document.querySelectorAll('.map__checkbox');
    for (var filterFeaturesIndex = 0; filterFeaturesIndex < filterFeatures.length; filterFeaturesIndex++) {
      if (isActive) {
        filterFeatures[filterFeaturesIndex].removeAttribute('disabled');
      } else {
        filterFeatures[filterFeaturesIndex].setAttribute('disabled', true);
      }
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

    if (evt.button === window.util.LEFT_MOUSE_BUTTON_CODE || evt.key === window.util.ENTER_BUTTON_CODE) {
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
    setPageActive: setPageActive,
    renderPins: renderPins,
    removePins: removePins
  };
})();
