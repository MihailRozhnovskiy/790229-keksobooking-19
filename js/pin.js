'use strict';

(function () {

  var HALF = 2;
  var renderPin = function (pin, i) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('button.map__pin');
    var pinElement = pinTemplate.cloneNode(true);
    var pinSizeX = (pinElement.firstChild.width) / HALF;
    var pinSizeY = (pinElement.firstChild.height) / HALF;

    pinElement.style.cssText = 'left: ' + (pin.location.x - pinSizeX) + 'px; top: ' + (pin.location.y - pinSizeY) + 'px;';
    pinElement.firstChild.setAttribute('src', pin.author.avatar);
    pinElement.firstChild.setAttribute('alt', pin.offer.title);
    pinElement.firstChild.setAttribute('data-index', i);
    return pinElement;
  };

  var drawPin = function (pins, quantityPins) {
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < quantityPins; i++) {
      fragment.appendChild(renderPin(pins[i], i));
    }
    mapPins.appendChild(fragment);
  };

  window.pin = {
    drawMarker: drawPin
  };
})();
