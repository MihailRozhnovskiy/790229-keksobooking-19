'use strict';

(function () {
  var pinMain = document.querySelector('.map__pin--main');
  var widthMap = document.querySelector('body').clientWidth;
  var MIN_HEIGHT = 130;
  var MAX_HEIGHT = 630;
  var pinMainSizeX = (pinMain.firstElementChild.width) / 2;
  var pinMainSizeY = (pinMain.firstElementChild.height) / 2;

  var onMouseDownHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var coordinateY = pinMain.offsetTop - shift.y;
      var coordinateX = pinMain.offsetLeft - shift.x;

      if (coordinateY > (MIN_HEIGHT - pinMainSizeY) && coordinateY < (MAX_HEIGHT + pinMainSizeY)) {
        pinMain.style.top = coordinateY + 'px';
      }
      if (coordinateX < (widthMap - pinMainSizeX) && coordinateX > (widthMap - widthMap - pinMainSizeX)) {
        pinMain.style.left = coordinateX + 'px';
      }
      getAddress();
    };

    var onMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMoveHandler);
      document.removeEventListener('mouseup', onMouseUpHandler);
    };

    document.addEventListener('mousemove', onMouseMoveHandler);
    document.addEventListener('mouseup', onMouseUpHandler);
  };
  pinMain.addEventListener('mousedown', onMouseDownHandler);

  var getAddress = function () {
    var address = document.querySelector('#address');
    var pinMainTop = pinMain.style.top;
    var pinMainLeft = pinMain.style.left;
    var addressValue = parseInt(pinMainLeft, 10) + pinMainSizeX + ', ' + (parseInt(pinMainTop, 10) + pinMainSizeY);
    address.setAttribute('value', addressValue);
    return address;
  };
  getAddress();
})();
