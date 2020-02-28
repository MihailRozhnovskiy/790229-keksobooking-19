'use strict';

(function () {
  var renderPin = function (pin) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);
    var pinSizeX = (pinElement.firstChild.width) / 2;
    var pinSizeY = (pinElement.firstChild.height) / 2;

    pinElement.style.cssText = 'left: ' + (pin.location.x + pinSizeX) + 'px; top: ' + (pin.location.y + pinSizeY) + 'px;';
    pinElement.firstChild.setAttribute('src', pin.author.avatar);
    pinElement.firstChild.setAttribute('alt', pin.offer.title);
    pinElement.firstChild.setAttribute('data-index', pin.dataIndex);
    return pinElement;
  };

  var drawPin = function (pins) {
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }
    mapPins.appendChild(fragment);
  };

  window.pin = {
    drawPin: drawPin
  };
})();
