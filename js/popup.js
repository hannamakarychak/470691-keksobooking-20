'use strict';
(function () {
  var handleErrorPopupClose = function (evt) {
    var errorPopup = document.querySelector('.error');

    if (evt.button === window.util.LEFT_MOUSE_BUTTON_CODE || evt.key === window.util.ESCAPE_BUTTON_CODE) {
      errorPopup.remove();

      window.removeEventListener('keydown', handleErrorPopupClose);
      window.removeEventListener('mousedown', handleErrorPopupClose);
    }
  };

  var handleSuccessPopupClose = function (evt) {
    var successPopup = document.querySelector('.success');

    if (evt.button === window.util.LEFT_MOUSE_BUTTON_CODE || evt.key === window.util.ESCAPE_BUTTON_CODE) {
      successPopup.remove();

      window.removeEventListener('keydown', handleSuccessPopupClose);
      window.removeEventListener('mousedown', handleSuccessPopupClose);
    }
  };

  var handleErrorPopupOpen = function () {
    var fragment = document.createDocumentFragment();
    var errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorPopupElement = errorPopupTemplate.cloneNode(true);
    var mainPageElement = document.querySelector('main');
    fragment.appendChild(errorPopupElement);
    mainPageElement.appendChild(fragment);

    var errorPopup = document.querySelector('.error');

    if (errorPopup) {
      window.addEventListener('keydown', handleErrorPopupClose);
      window.addEventListener('mousedown', handleErrorPopupClose);
    }
  };

  var handleSuccessPopupOpen = function () {
    var fragment = document.createDocumentFragment();
    var successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
    var successPopupElement = successPopupTemplate.cloneNode(true);
    var mainPageElement = document.querySelector('main');
    fragment.appendChild(successPopupElement);
    mainPageElement.appendChild(fragment);
    window.map.setPageActive(false);
    var successPopup = document.querySelector('.success');

    if (successPopup) {
      window.addEventListener('keydown', handleSuccessPopupClose);
      window.addEventListener('mousedown', handleSuccessPopupClose);
    }
  };

  window.popup = {
    handleErrorPopupOpen: handleErrorPopupOpen,
    handleSuccessPopupOpen: handleSuccessPopupOpen
  };
})();
