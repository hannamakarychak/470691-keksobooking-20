'use strict';
(function () {
  var renderFeature = function (featureName) {
    var feature = document.createElement('li');
    feature.classList.add('popup__feature');
    feature.classList.add('popup__feature--' + featureName);
    return feature;
  };

  var closeNotice = function () {
    var mapCardElement = document.querySelector('.map__card');
    if (mapCardElement) {
      mapCardElement.querySelector('.popup__close').removeEventListener('click', handleNoticeClose);
      document.removeEventListener('keydown', handleNoticeClose);
      mapCardElement.remove();
    }
  };

  var handleNoticeClose = function (evt) {
    evt.preventDefault();
    if (evt.button === 0 || evt.key === 'Escape') {
      closeNotice();
    }
  };

  var renderNotice = function (notice) {
    var similarNoticeTemplate = document.querySelector('#card').content.querySelector('.map__card');
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

    if (window.main.features.length === 0) {
      featuresList.style = 'display: none';
    } else {
      for (var featuresIndex = 0; featuresIndex < notice.offer.features.length; featuresIndex++) {
        var featureElement = renderFeature(notice.offer.features[featuresIndex]);
        noticeElement.querySelector('.popup__features').appendChild(featureElement);
      }
    }

    noticeElement.querySelector('.popup__description').textContent = notice.offer.description;

    var photosElement = noticeElement.querySelector('.popup__photos');

    for (var photoIndex = 0; photoIndex < notice.offer.photos.length; photoIndex++) {
      var photoTemplate = photosElement.children[0].cloneNode(true);
      photoTemplate.src = notice.offer.photos[photoIndex];
      photosElement.appendChild(photoTemplate);
      photosElement.children[0].remove();
    }

    window.main.mapPinsElement.appendChild(noticeElement);

    noticeElement.querySelector('.popup__close').addEventListener('click', handleNoticeClose);
    document.addEventListener('keydown', handleNoticeClose);
  };

  window.card = {
    renderNotice: renderNotice,
    closeNotice: closeNotice
  };
})();
