'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var chooserAvatar = document.querySelector('#avatar');
  var chooserLodging = document.querySelector('#images');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var previewLodging = document.querySelector('.ad-form__photo');

  var getImg = function () {
    var img = document.createElement('img');
    img.setAttribute('src', '');
    img.setAttribute('width', '70');
    img.setAttribute('height', '70');
    previewLodging.appendChild(img);
  };
  getImg();

  var fileChooserHandler = function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();

      var readerHandler = function () {
        if (evt.target.id === 'avatar') {
          previewAvatar.src = reader.result;
        } else {
          previewLodging.firstChild.src = reader.result;
        }
      };
      reader.readAsDataURL(file);
      reader.addEventListener('load', readerHandler);
    }
  };
  chooserAvatar.addEventListener('change', fileChooserHandler);
  chooserLodging.addEventListener('change', fileChooserHandler);
})();
