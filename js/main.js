'use strict';
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var similarNoticeTemplate = document.querySelector('#card').content.querySelector('.map__card');

// for (var i = 0; i < 8; i++) {
//   var noticeElement = similarNoticeTemplate.cloneNode(true);
//   similarNoticeElement.appendChild(noticeElement);
// }

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

var types = ['palace', 'flat', 'house', 'bungalo'];
var checkinTimes = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var getRandomElement = function (array) {
  var randomIndex = Math.round(Math.random() * (array.length - 1));

  return array[randomIndex];
};

var getRandomLengthArray = function (array) {
  var randomLenght = Math.round(Math.random() * (array.length - 1));

  return array.slice(0, randomLenght);
};

var getNotices = function () {
  var notices = [];

  for (var index = 1; index <= 8; index++) {
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
        features: getRandomLengthArray(features),
        description: 'строка с великолепным описанием ' + index,
        photos: getRandomLengthArray(photos)
      },
      location: location
    };

    notices.push(similarNotice);
  }

  return notices;
};

var renderNotice = function (notice) {
  var noticeElement = similarNoticeTemplate.cloneNode(true);
  noticeElement.querySelector('.popup__avatar').src = notice.author.avatar;
  noticeElement.querySelector('.popup__title').textContent = notice.offer.title;
  noticeElement.querySelector('.popup__text--address').textContent = notice.offer.address;
  noticeElement.querySelector('.popup__text--price').textContent = notice.offer.price + '\u20BD' + ' /ночь';
  noticeElement.querySelector('.popup__type').textContent = notice.offer.type;
  noticeElement.querySelector('.popup__text--capacity').textContent =
    notice.offer.rooms + ' комнаты для ' + notice.offer.guests + ' гостей';
  noticeElement.querySelector('.popup__text--time').textContent =
    'Заезд после ' + notice.offer.checkin + ', выезд до ' + notice.offer.checkout;
  // noticeElement.querySelector('.popup__feature').textContent = notice.offer.features; // TODO: ask mentor
  noticeElement.querySelector('.popup__description').textContent = notice.offer.description;

  var photosElement = noticeElement.querySelector('.popup__photos');

  for (var photoIndex = 0; photoIndex < notice.offer.photos.length; photoIndex++) {
    var photoTemplate = photosElement.children[0].cloneNode(true);
    photoTemplate.src = notice.offer.photos[photoIndex];
    photosElement.appendChild(photoTemplate);
    photosElement.children[0].remove();
  }

  noticeElement.style = 'left: ' + notice.location.x + 'px; top: ' + notice.location.y + 'px;';

  return noticeElement;
};

var allNotices = getNotices();
console.log(allNotices);

console.log(renderNotice(allNotices[5]));

var similarListElement = document.querySelector('.map__similar-list');

var fragment = document.createDocumentFragment();
for (var b = 0; b < 8; b++) {
  // fragment.appendChild(renderNotice(allNotices[b]));
  // fragment.appendChild(renderPin(allNotices[b]));
}

similarListElement.appendChild(fragment);
