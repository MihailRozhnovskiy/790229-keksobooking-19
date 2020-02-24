'use strict';

(function () {
  var formTitle = document.querySelector('#title');

  var formTitleInputHandler = function () {
    if (formTitle.validity.tooShort) {
      formTitle.setCustomValidity('Минимальная длина — 30 символов');
    } else if (formTitle.validity.tooLong) {
      formTitle.setCustomValidity('Максимальная длина — 100 символов');
    } else if (formTitle.validity.valueMissing) {
      formTitle.setCustomValidity('Обязательное текстовое поле');
    } else {
      formTitle.setCustomValidity('');
    }
  };
  formTitle.addEventListener('invalid', formTitleInputHandler);

  var selectTypeLodging = document.querySelector('#type');
  var formPrice = document.querySelector('#price');

  var compTypeLodgingPriceHandler = function () {
    var typeLodging = document.querySelector('#type').value;
    var price = document.querySelector('#price').value;
    var MIN_PRICE_BUNGALO = 0;
    var MIN_PRICE_FLAT = 1000;
    var MIN_PRICE_HOUSE = 5000;
    var MIN_PRICE_PALACE = 10000;
    var MAX_PRICE = 1000000;
    if (typeLodging === 'bungalo' && price < MIN_PRICE_BUNGALO) {
      formPrice.setCustomValidity('«Бунгало» — минимальная цена за ночь 0');
    } else if (typeLodging === 'flat' && price < MIN_PRICE_FLAT) {
      formPrice.setCustomValidity('«Квартира» — минимальная цена за ночь 1 000');
    } else if (typeLodging === 'house' && price < MIN_PRICE_HOUSE) {
      formPrice.setCustomValidity('«Дом» — минимальная цена за ночь 5 000');
    } else if (typeLodging === 'palace' && price < MIN_PRICE_PALACE) {
      formPrice.setCustomValidity('«Дворец» — минимальная цена за ночь 10 000');
    } else if (price > MAX_PRICE) {
      formPrice.setCustomValidity('Максимальное значение — 1 000 000');
    } else {
      formPrice.setCustomValidity('');
    }
  };
  formPrice.addEventListener('change', compTypeLodgingPriceHandler);
  selectTypeLodging.addEventListener('change', compTypeLodgingPriceHandler);

  var selectRoom = document.querySelector('#room_number');
  var selectGuest = document.querySelector('#capacity');

  var compGuestsRoomsHandler = function () {
    var quantityRoom = document.querySelector('#room_number').value;
    var quantityGuest = document.querySelector('#capacity').value;
    if ((quantityRoom === '1' && quantityGuest !== '1') ||
      (quantityRoom === '2' && quantityGuest !== '1' && quantityGuest !== '2') ||
      (quantityRoom === '3' && quantityGuest !== '1' && quantityGuest !== '2' && quantityGuest !== '3') ||
      (quantityRoom === '100' && quantityGuest !== '0')) {
      selectRoom.setCustomValidity('Количество комнат не соответствует количеству гостей');
    } else {
      selectRoom.setCustomValidity('');
    }
  };
  selectRoom.addEventListener('change', compGuestsRoomsHandler);
  selectGuest.addEventListener('change', compGuestsRoomsHandler);

  var selectTimeIn = document.querySelector('#timein');
  var selectTimeOut = document.querySelector('#timeout');

  var compTimeInTimeOutHandler = function () {
    var timeIn = document.querySelector('#timein').value;
    var timeOut = document.querySelector('#timeout').value;
    if (parseInt(timeOut, 10) < parseInt(timeIn, 10)) {
      selectTimeIn.setCustomValidity('');
    } else {
      selectTimeIn.setCustomValidity('«Время выезда» должно быть не менее чем за час до «Время заезда»');
    }
  };
  selectTimeIn.addEventListener('change', compTimeInTimeOutHandler);
  selectTimeOut.addEventListener('change', compTimeInTimeOutHandler);
})();
