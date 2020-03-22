'use strict';

(function () {

  var LEFT_MOUSE_BUTTON = 0;
  var formFields = document.querySelectorAll('fieldset');
  var formFilters = document.querySelectorAll('.map__filters select');
  var buttonPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');

  var setFieldsetDisabled = function () {
    formFields.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
    formFilters.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
  };

  setFieldsetDisabled();

  var delFieldsetDisabled = function () {
    formFields.forEach(function (item) {
      item.removeAttribute('disabled');
    });
    formFilters.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  var buttonPinMainPushHandler = function (evt) {
    if (evt.button === LEFT_MOUSE_BUTTON || evt.key === 'Enter') {
      window.filters.mapFiltHandler();
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

  window.map = {
    setFieldsetDisabled: setFieldsetDisabled
  };
})();


