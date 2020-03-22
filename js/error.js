'use strict';

(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var openErrorMessage = function (message) {
    var errorMessage = errorTemplate.querySelector('.error__message');
    errorMessage.textContent = message;
    var errorElement = errorTemplate.cloneNode(true);
    main.appendChild(errorElement);

    var buttonErrorMessage = errorElement.querySelector('.error__button');
    buttonErrorMessage.addEventListener('click', buttonCloseErrorMessageHandler);
    document.addEventListener('keydown', escCloseErrorMessageHandler);
    main.addEventListener('click', clickCloseErrorMessageHandler);
  };

  var closeErrorMessage = function () {
    var error = main.querySelector('.error');
    error.remove();
  };

  var buttonCloseErrorMessageHandler = function () {
    closeErrorMessage();
    window.location.reload();
  };

  var escCloseErrorMessageHandler = function (evt) {
    if (evt.key === 'Escape') {
      closeErrorMessage();
    }
  };

  var clickCloseErrorMessageHandler = function () {
    closeErrorMessage();
  };

  window.mistake = {
    openErrorMessage: openErrorMessage
  };
})();
