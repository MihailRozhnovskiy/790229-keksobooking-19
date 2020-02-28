'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var xhr = new XMLHttpRequest();

  var loadHandler = function () {
    window.dataLoad = JSON.parse(xhr.responseText);
  };
  xhr.addEventListener('load', loadHandler);

  xhr.open('GET', URL);
  xhr.send();
})();


