'use strict';

(function () {

  var CONST_QUANTITY_PINS = 5;

  var getPins = function (data) {
    window.pins = data;
  };

  var clearMap = function () {
    var card = document.querySelector('.map__card');
    var mapPins = document.querySelectorAll('.map__pin');

    if (card) {
      window.card.closePopup();
    }

    for (var j = 1; j < mapPins.length; j++) {
      mapPins[j].remove();
    }
  };

  var selectHousingType = document.querySelector('#housing-type');

  var housingTypeHandler = function () {
    var housingType = document.querySelector('#housing-type').value;
    window.selectedTypePins = [];

    clearMap();
    for (var i = 0; i < window.pins.length; i++) {
      if (window.pins[i].offer.type === housingType) {
        window.selectedTypePins.push(window.pins[i]);
      }
    }
    if (housingType === 'any') {
      window.selectedTypePins = window.pins;
    }
    var quantityPins = Math.min(window.selectedTypePins.length, CONST_QUANTITY_PINS);
    window.pin.drawPin(window.selectedTypePins, quantityPins);
  };
  selectHousingType.addEventListener('change', housingTypeHandler);


  window.filters = {
    getPins: getPins,
    housingTypeHandler: housingTypeHandler
  };
})();
