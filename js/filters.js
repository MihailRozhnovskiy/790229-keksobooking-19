'use strict';

(function () {

  var CONST_QUANTITY_PINS = 5;
  var TIMEOUT = 500;

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

  var mapFilters = document.querySelector('.map__filters');

  var mapFiltersHandler = function () {
    setTimeout(function () {
      var LOW = 10000;
      var HIGH = 50000;
      var housingType = document.querySelector('#housing-type').value;
      var housingPrice = document.querySelector('#housing-price').value;
      var housingRoom = document.querySelector('#housing-rooms').value;
      var housingGuest = document.querySelector('#housing-guests').value;
      var selectedTypePins = [];
      var selectedPricePins = [];
      var selectedRoomPins = [];
      var selectedGuestPins = [];
      var selectedFeaturePins = [];
      window.selectedPins = [];

      clearMap();

      var getSelectedPins = function (housingSpecification, specification, arrSpecification, arrPins) {
        if (housingSpecification === 'any') {
          arrSpecification = arrPins;
        }
        for (var i = 0; i < arrPins.length; i++) {
          if (String(arrPins[i].offer[specification]) === housingSpecification) {
            arrSpecification.push(arrPins[i]);
          }
        }
        window.selectedPins = arrSpecification;
      };
      getSelectedPins(housingType, 'type', selectedTypePins, window.pins);

      if (housingPrice === 'any') {
        selectedPricePins = window.selectedPins;
      }

      for (var j = 0; j < window.selectedPins.length; j++) {
        if ((housingPrice === 'low' && window.selectedPins[j].offer.price < LOW) ||
       (housingPrice === 'high' && window.selectedPins[j].offer.price > HIGH) ||
       (housingPrice === 'middle' && window.selectedPins[j].offer.price >= LOW && window.selectedPins[j].offer.price <= HIGH)) {
          selectedPricePins.push(window.selectedPins[j]);
        }
      }

      window.selectedPins = selectedPricePins;

      getSelectedPins(housingRoom, 'rooms', selectedRoomPins, window.selectedPins);

      getSelectedPins(housingGuest, 'guests', selectedGuestPins, window.selectedPins);

      var getselectedFeaturePin = function (feature, featureValue) {
        if (feature.checked) {
          for (var m = 0; m < window.selectedPins.length; m++) {
            var arrFeatures = window.selectedPins[m].offer.features;
            for (var n = 0; n < arrFeatures.length; n++) {
              if (featureValue === arrFeatures[n]) {
                selectedFeaturePins.push(window.selectedPins[m]);
              }
            }
          }
        }
      };

      var wifi = document.querySelector('#filter-wifi');
      getselectedFeaturePin(wifi, wifi.value);

      var dishwasher = document.querySelector('#filter-dishwasher');
      getselectedFeaturePin(dishwasher, dishwasher.value);

      var parking = document.querySelector('#filter-parking');
      getselectedFeaturePin(parking, parking.value);

      var washer = document.querySelector('#filter-washer');
      getselectedFeaturePin(washer, washer.value);

      var elevator = document.querySelector('#filter-elevator');
      getselectedFeaturePin(elevator, elevator.value);

      var conditioner = document.querySelector('#filter-conditioner');
      getselectedFeaturePin(conditioner, conditioner.value);

      if (selectedFeaturePins.length !== 0) {
        window.selectedPins = selectedFeaturePins;
      }

      var quantityPins = Math.min(window.selectedPins.length, CONST_QUANTITY_PINS);
      window.pin.drawPin(window.selectedPins, quantityPins);
    }, TIMEOUT);
  };
  mapFilters.addEventListener('change', mapFiltersHandler);

  window.filters = {
    getPins: getPins,
    mapFiltersHandler: mapFiltersHandler
  };
})();
