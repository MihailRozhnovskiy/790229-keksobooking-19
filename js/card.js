'use strict';

(function () {
  var pins = window.data;

  var renderCard = function (mock) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);

    var getTypeLodging = function (typeLodging) {
      var type = '';
      switch (typeLodging) {
        case 'palace':
          type = 'Дворец';
          break;
        case 'flat':
          type = 'Квартира';
          break;
        case 'house':
          type = 'Дом';
          break;
        default:
          type = 'Бунгало';
      }
      return type;
    };

    var getListFeatures = function (features) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < features.length; i++) {
        var li = document.createElement('li');
        li.className = 'popup__feature popup__feature--' + features[i];
        fragment.append(li);
      }
      return fragment;
    };

    var getListPhotos = function (photos) {
      var photoTemplate = document.querySelector('#card').content.querySelector('.popup__photo');
      var photoElement = photoTemplate.cloneNode(true);
      var fragment = document.createDocumentFragment();
      cardElement.querySelector('.popup__photos').innerHTML = '';

      for (var i = 0; i < photos.length; i++) {
        photoElement.setAttribute('src', photos[i]);
        fragment.append(photoElement);
      }
      return fragment;
    };

    cardElement.querySelector('.popup__title').textContent = mock.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = mock.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = mock.offer.price + ' ₽ /ночь';
    cardElement.querySelector('.popup__type').textContent = getTypeLodging(mock.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = mock.offer.rooms + ' комнаты для ' + mock.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + mock.offer.checkin + ', выезд до ' + mock.offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = '';
    cardElement.querySelector('.popup__features').append(getListFeatures(mock.offer.features));
    cardElement.querySelector('.popup__description').textContent = mock.offer.description;
    cardElement.querySelector('.popup__photos').append(getListPhotos(mock.offer.photos));
    cardElement.querySelector('.popup__avatar').setAttribute('src', mock.author.avatar);
    return cardElement;
  };

  var map = document.querySelector('.map');
  var openPopup = function (target) {
    var card = document.querySelector('.map__card');
    if (card) {
      closePopup();
    }
    var filtersContainer = document.querySelector('.map__filters-container');
    map.insertBefore(renderCard(pins[target]), filtersContainer);
  };

  var closePopup = function () {
    var card = document.querySelector('.map__card');
    card.remove();
  };

  window.card = {
    openPopup: openPopup,
    closePopup: closePopup
  };
})();

