'use strict';
(function () {
  var renderPin = function (notice) {
    var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

    var pinElement = similarPinTemplate.cloneNode(true);
    var pinX = notice.location.x - window.main.PIN_WIDTH / 2;
    var pinY = notice.location.y - window.main.PIN_HEIGHT;
    pinElement.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
    var pinUserImage = pinElement.querySelector('img');
    pinUserImage.src = notice.author.avatar;
    pinUserImage.alt = notice.offer.title;

    var handleMapPinClick = function () {
      window.card.closeNotice();

      window.card.renderNotice(notice);
    };

    pinElement.addEventListener('click', handleMapPinClick);

    return pinElement;
  };
  var getPinPosition = function () {
    var pinTop = window.main.pinMain.style.top;
    var pinLeft = window.main.pinMain.style.left;

    return {
      x: parseInt(pinTop, 10),
      y: parseInt(pinLeft, 10)
    };
  };

  window.pin = {
    renderPin: renderPin,
    getPinPosition: getPinPosition
  };
})();
