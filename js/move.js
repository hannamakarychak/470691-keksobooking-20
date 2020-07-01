'use strict';
(function () {
  var MAIN_PIN_HEIGHT = 62;
  var MAIN_PIN_WIDTH = 62;
  var POINTER_HEIGHT = 22;
  var MAP_HEIGHT = 704;
  var MAP_WIDTH = 1200;

  window.main.pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var offsetTop = window.main.pinMain.offsetTop;
      var offsetLeft = window.main.pinMain.offsetLeft;

      var isTouchingTop = offsetTop <= 0 && startCoords.y <= 0;
      var isTouchingBottom = offsetTop >= MAP_HEIGHT - MAIN_PIN_HEIGHT - POINTER_HEIGHT;
      var isTouchingLeft = offsetLeft <= 0 && startCoords.x <= 0;
      var isTouchingRight = offsetLeft >= MAP_WIDTH - MAIN_PIN_WIDTH;

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (isTouchingTop) {
        window.main.pinMain.style.top = 0;
      } else if (isTouchingBottom) {
        window.main.pinMain.style.top = MAP_HEIGHT - MAIN_PIN_HEIGHT - POINTER_HEIGHT - shift.y + 'px';
      } else {
        window.main.pinMain.style.top = window.main.pinMain.offsetTop - shift.y + 'px';
      }

      if (isTouchingLeft) {
        window.main.pinMain.style.left = 0;
      } else if (isTouchingRight) {
        window.main.pinMain.style.left = MAP_WIDTH - MAIN_PIN_WIDTH - shift.x + 'px';
      } else {
        window.main.pinMain.style.left = window.main.pinMain.offsetLeft - shift.x + 'px';
      }

      var activeFormAddress = document.getElementById('address');
      activeFormAddress.value = moveEvt.clientX + ', ' + moveEvt.clientY;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
