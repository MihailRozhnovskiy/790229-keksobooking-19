'use strict';

(function () {
  var body = document.querySelector('body');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var buttonErrorMessage = errorTemplate.querySelector('.error__button');

  var openErrorMessage = function (message) {
    var errorMessage = errorTemplate.querySelector('.error__message');
    errorMessage.innerHTML = message;
    var errorElement = errorTemplate.cloneNode(true);
    body.appendChild(errorElement);
  };

  var closeErrorMessage = function () {
    var error = body.querySelector('.error');
    error.remove();
  };

  var closeErrorMessageHandler = function () {
    closeErrorMessage();
  };
  buttonErrorMessage.addEventListener('click', closeErrorMessageHandler);

  window.error = {
    openErrorMessage: openErrorMessage
  };
})();
