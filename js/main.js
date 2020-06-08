'use strict';

var types = ['palace', 'flat', 'house', 'bungalo'];
var checkinTimes = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var NUMBER_OF_PINS = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var similarNoticeTemplate = document.querySelector('#card').content.querySelector('.map__card');

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
  var randomLenght = Math.round(Math.random() * (array.length - 1));

  return array.slice(0, randomLenght);
};

var getNotices = function () {
  var notices = [];

  for (var index = 1; index <= NUMBER_OF_PINS; index++) {
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

var renderFeature = function (featureName) {
  var feature = document.createElement('li');
  feature.classList.add('popup__feature');
  feature.classList.add('popup__feature--' + featureName);
  return feature;
};

var renderNotice = function (notice) {
  var noticeElement = similarNoticeTemplate.cloneNode(true);
  noticeElement.querySelector('.popup__avatar').src = notice.author.avatar;
  noticeElement.querySelector('.popup__title').textContent = notice.offer.title;
  noticeElement.querySelector('.popup__text--address').textContent = notice.offer.address;
  noticeElement.querySelector('.popup__text--price').textContent = notice.offer.price + '\u20BD' + ' /ночь';
  noticeElement.querySelector('.popup__type').textContent = notice.offer.type;
  noticeElement.querySelector('.popup__text--capacity').textContent = notice.offer.rooms + ' комнаты для ' + notice.offer.guests + ' гостей';
  noticeElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + notice.offer.checkin + ', выезд до ' + notice.offer.checkout;

  var featuresList = noticeElement.querySelector('.popup__features');
  featuresList.innerHTML = '';

  if (features.length === 0) {
    featuresList.style = 'display: none';
  } else {
    for (var featuresIndex = 0; featuresIndex < notice.offer.features.length; featuresIndex++) {
      var featureElement = renderFeature(notice.offer.features[featuresIndex]);
      noticeElement.querySelector('.popup__features').appendChild(featureElement);
    }
  }

  noticeElement.querySelector('.popup__description').textContent = notice.offer.description;

  // console.log(getNotices());

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
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (x, y, avatar, title) {
  var pinElement = similarPinTemplate.cloneNode(true);
  var pinX = x - PIN_WIDTH / 2;
  var pinY = y - PIN_HEIGHT;
  pinElement.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
  var pinUserImage = pinElement.querySelector('img');
  pinUserImage.src = avatar;
  pinUserImage.alt = title;

  return pinElement;
};

var allNotices = getNotices();
var mapPinsElement = document.querySelector('.map__pins');

var fragment = document.createDocumentFragment();

for (var noticeIndex = 0; noticeIndex < NUMBER_OF_PINS; noticeIndex++) {
  fragment.appendChild(renderNotice(allNotices[noticeIndex]));
  var currentNotice = allNotices[noticeIndex];
  fragment.appendChild(renderPin(currentNotice.location.x, currentNotice.location.y, currentNotice.author.avatar, currentNotice.offer.title));
}

mapPinsElement.appendChild(fragment);
