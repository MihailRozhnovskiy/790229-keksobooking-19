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
      alert('Статус ответа: ' + xhr.status + '' + xhr.statusText);//Куда выводить? В разметке нет template под такое сообщение.
      //template под "Сообщение об ошибке создания объявления" - есть, а под сообщение об ошибке загрузки данных с сервера - нет.
    }
  };
  xhr.addEventListener('load', loadHandler);

  xhr.open('GET', URL);
  xhr.send();
})();


