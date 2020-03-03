'use strict';

(function () {
  var body = document.querySelector('body');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var openErrorMessage = function (message) {
    var errorMessage = errorTemplate.querySelector('.error__message');
    errorMessage.textContent = message;
    var errorElement = errorTemplate.cloneNode(true);
    body.appendChild(errorElement);

    var buttonErrorMessage = errorElement.querySelector('.error__button');
    buttonErrorMessage.addEventListener('click', closeErrorMessageHandler);
  };

  var closeErrorMessage = function () {
    var error = body.querySelector('.error');
    error.remove();
  };

  var closeErrorMessageHandler = function () {
    closeErrorMessage();
  };

  window.error = {
    openErrorMessage: openErrorMessage
  };
})();
