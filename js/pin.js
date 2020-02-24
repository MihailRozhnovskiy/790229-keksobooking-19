'use strict';

(function () {
  var pins = window.data;

  var renderPin = function (mock) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);
    var pinSizeX = (pinElement.firstChild.width) / 2;
    var pinSizeY = (pinElement.firstChild.height) / 2;

    pinElement.style.cssText = 'left: ' + (mock.location.x + pinSizeX) + 'px; top: ' + (mock.location.y + pinSizeY) + 'px;';
    pinElement.firstChild.setAttribute('src', mock.author.avatar);
    pinElement.firstChild.setAttribute('alt', mock.offer.title);
    pinElement.firstChild.setAttribute('data-index', mock.dataIndex);
    return pinElement;
  };

  var drawPin = function () {
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }
    mapPins.appendChild(fragment);
  };

  window.pin = {
    drawPin: drawPin()
  };

})();
