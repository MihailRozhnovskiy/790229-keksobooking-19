'use strict';

(function () {
  var pinMain = document.querySelector('.map__pin--main');
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

      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
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
})();
