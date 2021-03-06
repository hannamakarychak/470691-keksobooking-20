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
    if (evt.button === window.util.LEFT_MOUSE_BUTTON_CODE || evt.key === window.util.ESCAPE_BUTTON_CODE) {
      closeNotice();
    }
  };

  var renderNotice = function (notice) {
    var similarNoticeTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var noticeElement = similarNoticeTemplate.cloneNode(true);

    var popupAvatar = noticeElement.querySelector('.popup__avatar');
    if (notice.author.avatar === '') {
      popupAvatar.style = 'display: none';
    } else {
      popupAvatar.src = notice.author.avatar;
    }

    var popupTitle = noticeElement.querySelector('.popup__title');
    if (notice.offer.title === '') {
      popupTitle.style = 'display: none';
    } else {
      popupTitle.textContent = notice.offer.title;
    }

    var popupTextAddress = noticeElement.querySelector('.popup__text--address');
    if (notice.offer.address === '') {
      popupTextAddress.style = 'display: none';
    } else {
      popupTextAddress.textContent = notice.offer.address;
    }

    var popupTextPrice = noticeElement.querySelector('.popup__text--price');
    if (notice.offer.price === null) {
      popupTextPrice.style = 'display: none';
    } else {
      popupTextPrice.textContent = notice.offer.price + '\u20BD' + ' /ночь';
    }

    var popupType = noticeElement.querySelector('.popup__type');
    if (notice.offer.type === '') {
      popupType.style = 'display: none';
    } else {
      popupType.textContent = notice.offer.type;
    }

    var popupTextCapacity = noticeElement.querySelector('.popup__text--capacity');
    if (notice.offer.rooms === null || notice.offer.rooms === undefined || notice.offer.guests === null || notice.offer.guests === undefined) {
      popupTextCapacity.style = 'display: none';
    } else {
      popupTextCapacity.textContent = notice.offer.rooms + ' комнаты для ' + notice.offer.guests + ' гостей';
    }
    noticeElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + notice.offer.checkin + ', выезд до ' + notice.offer.checkout;

    var featuresList = noticeElement.querySelector('.popup__features');
    featuresList.innerHTML = '';

    if (notice.offer.features.length === 0) {
      featuresList.style = 'display: none';
    } else {
      for (var featuresIndex = 0; featuresIndex < notice.offer.features.length; featuresIndex++) {
        var featureElement = renderFeature(notice.offer.features[featuresIndex]);
        noticeElement.querySelector('.popup__features').appendChild(featureElement);
      }
    }

    var popupDescription = noticeElement.querySelector('.popup__description');
    if (notice.offer.description === '') {
      popupDescription.style = 'display: none';
    } else {
      popupDescription.textContent = notice.offer.description;
    }

    var photosElement = noticeElement.querySelector('.popup__photos');

    if (notice.offer.photos.length === 0) {
      photosElement.style = 'display: none';
    } else {
      for (var photoIndex = 0; photoIndex < notice.offer.photos.length; photoIndex++) {
        var photoTemplate = photosElement.children[0].cloneNode(true);
        photoTemplate.src = notice.offer.photos[photoIndex];
        photosElement.appendChild(photoTemplate);
        photosElement.children[0].remove();
      }
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
