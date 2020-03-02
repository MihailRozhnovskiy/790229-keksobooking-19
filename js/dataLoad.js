'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var xhr = new XMLHttpRequest();

  var loadHandler = function () {
    var data = JSON.parse(xhr.responseText);
    if (xhr.status === 200) {
      window.dataLoad = data;
      window.card.getPins(data);
    } else {
      window.error.openErrorMessage('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
    }
  };
  xhr.addEventListener('load', loadHandler);

  xhr.open('GET', URL);
  xhr.send();
})();


