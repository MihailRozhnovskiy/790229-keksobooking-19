'use strict';

(function () {

  var QUANTITY_PINS = 5;
  var TIMEOUT = 500;
  var LOW = 10000;
  var HIGH = 50000;

  var getPins = function (data) {
    window.pins = data;
  };

  var clearMap = function () {
    var card = document.querySelector('.map__card');
    var mapPins = document.querySelectorAll('.map__pin');

    if (card) {
      window.card.closePopup();
    }

    for (var i = 1; i < mapPins.length; i++) {
      mapPins[i].remove();
    }
  };

  var mapFilters = document.querySelector('.map__filters');

  var mapFiltHandler = function () {
    setTimeout(function () {
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
        arrPins.forEach(function (item) {
          if (String(item.offer[specification]) === housingSpecification) {
            arrSpecification.push(item);
          }
        });

        window.selectedPins = arrSpecification;
      };
      getSelectedPins(housingType, 'type', selectedTypePins, window.pins);

      if (housingPrice === 'any') {
        selectedPricePins = window.selectedPins;
      }

      window.selectedPins.forEach(function (item) {
        if ((housingPrice === 'low' && item.offer.price < LOW) ||
          (housingPrice === 'high' && item.offer.price > HIGH) ||
          (housingPrice === 'middle' && item.offer.price >= LOW && item.offer.price <= HIGH)) {
          selectedPricePins.push(item);
        }
      });

      window.selectedPins = selectedPricePins;

      getSelectedPins(housingRoom, 'rooms', selectedRoomPins, window.selectedPins);

      getSelectedPins(housingGuest, 'guests', selectedGuestPins, window.selectedPins);

      var getselectedFeaturePin = function (feature, featureValue) {
        if (feature.checked) {
          window.selectedPins.forEach(function (item) {
            var arrFeatures = item.offer.features;
            arrFeatures.forEach(function (element) {
              if (featureValue === element) {
                selectedFeaturePins.push(item);
              }
            });
          });
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

      var quantityPins = Math.min(window.selectedPins.length, QUANTITY_PINS);
      window.pin.drawMarker(window.selectedPins, quantityPins);
    }, TIMEOUT);
  };
  mapFilters.addEventListener('change', mapFiltHandler);

  window.filters = {
    getPins: getPins,
    mapFiltHandler: mapFiltHandler
  };
})();
