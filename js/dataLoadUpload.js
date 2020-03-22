'use strict';

(function () {
  var SERVER_OK = 200;
  var xhr = new XMLHttpRequest();

  var loadHandler = function () {
    var data = JSON.parse(xhr.responseText);
    if (xhr.status === SERVER_OK) {
      window.filters.getPins(data);
    } else {
      window.mistake.openErrorMessage('Ошибка! Статус ответа сервера: ' + xhr.status + ' ' + xhr.statusText);
    }
  };
  xhr.addEventListener('load', loadHandler);

  xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
  xhr.send();

  var upload = function (dataUpload, onSuccess) {
    var xhrUp = new XMLHttpRequest();

    var uploadHandler = function () {
      onSuccess(xhrUp.status, xhrUp.statusText);
    };
    xhrUp.addEventListener('load', uploadHandler);

    xhrUp.open('POST', 'https://js.dump.academy/keksobooking');
    xhrUp.send(dataUpload);
  };

  window.data = {
    upload: upload
  };
})();


