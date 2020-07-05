'use strict';
var TIMEOUT = 10000;
var POST_URL = 'https://javascript.pages.academy/keksobooking';
var GET_URL = 'https://javascript.pages.academy/keksobooking/data';

(function () {
  window.backend = {};

  var getData = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + '' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  window.backend.load = function (onSuccess, onError) {
    var xhr = getData(onSuccess, onError);
    xhr.open('GET', GET_URL);
    xhr.send();
  };

  window.backend.save = function (data, onSuccess, onError) {
    var xhr = getData(onSuccess, onError);
    xhr.open('POST', POST_URL);
    xhr.send(data);
  };
})();
