'use strict';

(function () {

  var renderCard = function (pin) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);

    var typeLodging = {
      'palace': 'Дворец',
      'flat': 'Квартира',
      'house': 'Дом',
      'bungalo': 'Бунгало'
    };

    var getListFeatures = function (features) {
      var fragment = document.createDocumentFragment();

      features.forEach(function (item) {
        var li = document.createElement('li');
        li.className = 'popup__feature popup__feature--' + item;
        fragment.append(li);
      });
      return fragment;
    };

    var getListPhotos = function (photos) {
      var photoTemplate = document.querySelector('#card').content.querySelector('.popup__photo');
      var photoElement = photoTemplate.cloneNode(true);
      var fragment = document.createDocumentFragment();
      cardElement.querySelector('.popup__photos').innerHTML = '';

      photos.forEach(function (item) {
        photoElement.setAttribute('src', item);
        fragment.append(photoElement);
      });
      return fragment;
    };

    cardElement.querySelector('.popup__title').textContent = pin.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = pin.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = pin.offer.price + ' ₽ /ночь';
    cardElement.querySelector('.popup__type').textContent = typeLodging[pin.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = '';
    cardElement.querySelector('.popup__features').append(getListFeatures(pin.offer.features));
    cardElement.querySelector('.popup__description').textContent = pin.offer.description;
    cardElement.querySelector('.popup__photos').append(getListPhotos(pin.offer.photos));
    cardElement.querySelector('.popup__avatar').setAttribute('src', pin.author.avatar);
    return cardElement;
  };

  var map = document.querySelector('.map');
  var openPopup = function (target) {
    var card = document.querySelector('.map__card');
    if (card) {
      closePopup();
    }
    var filtersContainer = document.querySelector('.map__filters-container');
    map.insertBefore(renderCard(window.selectedPins[target]), filtersContainer);
  };

  var closePopup = function () {
    var card = document.querySelector('.map__card');
    card.remove();
  };

  window.card = {
    openPopup: openPopup,
    closePopup: closePopup,
  };
})();

