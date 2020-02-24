'use strict';

(function () {
  var formFields = document.querySelectorAll('fieldset');
  var buttonPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');

  var setFieldsetDisabled = function () {
    for (var i = 0; i < formFields.length; i++) {
      formFields[i].setAttribute('disabled', 'disabled');
    }
    return formFields;
  };

  setFieldsetDisabled();

  var delFieldsetDisabled = function () {
    for (var i = 0; i < formFields.length; i++) {
      formFields[i].removeAttribute('disabled');
    }
    return formFields;
  };

  var getAddress = function () {
    var address = adForm.querySelector('#address');
    var pinMainTop = buttonPinMain.style.top;
    var pinMainLeft = buttonPinMain.style.left;
    var pinMainSizeX = (buttonPinMain.firstElementChild.width) / 2;
    var pinMainSizeY = (buttonPinMain.firstElementChild.height) / 2;
    var addressValue = parseInt(pinMainLeft, 10) + pinMainSizeX + ', ' + (parseInt(pinMainTop, 10) + pinMainSizeY);
    address.setAttribute('value', addressValue);
    return address;
  };

  getAddress();

  var buttonPinMainPushHandler = function (evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      window.pin.drawPin();
      delFieldsetDisabled();
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
    }
  };
  buttonPinMain.addEventListener('mousedown', buttonPinMainPushHandler);
  buttonPinMain.addEventListener('keydown', buttonPinMainPushHandler);

  var escClosePopupHandler = function (evt) {
    if (evt.key === 'Escape') {
      window.card.closePopup();
    }
  };

  var closePopupHandler = function () {
    window.card.closePopup();
  };

  var mousedownPinOpenPopupHandler = function (evt) {
    var target = evt.target.getAttribute('data-index');
    if (target) {
      window.card.openPopup(target);
      var buttonCloseCard = document.querySelector('.popup__close');
      buttonCloseCard.addEventListener('click', closePopupHandler);
      document.addEventListener('keydown', escClosePopupHandler);
    }
  };
  map.addEventListener('click', mousedownPinOpenPopupHandler);

  var keydownPinOpenPopupHandler = function (evt) {
    var target = evt.target.firstElementChild.getAttribute('data-index');
    if (target && evt.key === 'Enter') {
      window.card.openPopup(target);
      var buttonCloseCard = document.querySelector('.popup__close');
      document.addEventListener('keydown', escClosePopupHandler);
      buttonCloseCard.addEventListener('click', closePopupHandler);
    }
  };
  map.addEventListener('keydown', keydownPinOpenPopupHandler);
})();


