'use strict';
(function () {
  var getLocation = function () {
    var x = Math.round(Math.random() * 1200);
    var maxY = 630;
    var minY = 130;
    var y = Math.floor(Math.random() * (maxY - minY + 1) + minY);

    return {
      x: x,
      y: y
    };
  };

  var getRandomElement = function (array) {
    var randomIndex = Math.round(Math.random() * (array.length - 1));

    return array[randomIndex];
  };

  var getRandomLengthArray = function (array) {
    var randomLength = Math.round(Math.random() * (array.length - 1));

    return array.slice(0, randomLength);
  };

  var getNotices = function () {
    var types = ['palace', 'flat', 'house', 'bungalo'];
    var checkinTimes = ['12:00', '13:00', '14:00'];
    var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
    var notices = [];

    for (var index = 1; index <= window.main.NUMBER_OF_PINS; index++) {
      var location = getLocation();
      var similarNotice = {
        author: {
          avatar: 'img/avatars/user0' + index + '.png'
        },
        offer: {
          title: 'Super Hotel - ' + index,
          address: location.x + ', ' + location.y,
          price: 77777,
          type: getRandomElement(types),
          rooms: 2,
          guests: 2,
          checkin: getRandomElement(checkinTimes),
          checkout: getRandomElement(checkinTimes),
          features: getRandomLengthArray(window.main.features),
          description: 'строка с великолепным описанием ' + index,
          photos: getRandomLengthArray(photos)
        },
        location: location
      };

      notices.push(similarNotice);
    }

    return notices;
  };

  window.data = {
    getNotices: getNotices
  };
})();
