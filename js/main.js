'use strict';

var QUANTITY_MOCKS = 8;

var renderMocks = function (n) {

  var mocks = [];
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var checkinTimes = ['12:00', '13:00', '14:00'];
  var checkoutTimes = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var widthMap = document.querySelector('body').clientWidth;
  var MIN_HEIGHT = 130;
  var MAX_HEIGHT = 630;

  var getItems = function (items) {
    var randomItems = [];

    for (var i = 0; i < items.length; i++) {
      var rand = Math.random();
      if (rand > 0.5) {
        randomItems.push(items[i]);
      }
    }
    return randomItems;
  };

  for (var i = 1; i <= n; i++) {
    var mock = {
      author: {},
      offer: {},
      location: {}
    };

    mock.author.avatar = 'img/avatars/user0' + i + '.png';
    mock.offer.title = 'String title';
    mock.offer.address = '600, 350';
    mock.offer.price = 100 + i;
    mock.offer.type = types[Math.floor(Math.random() * types.length)];
    mock.offer.rooms = i;
    mock.offer.guests = i;
    mock.offer.checkin = checkinTimes[Math.floor(Math.random() * checkinTimes.length)];
    mock.offer.checkout = checkoutTimes[Math.floor(Math.random() * checkoutTimes.length)];
    mock.offer.features = getItems(features);
    mock.offer.description = 'String description';
    mock.offer.photos = getItems(photos);
    mock.location.x = Math.floor(Math.random() * Math.floor(widthMap));
    mock.location.y = Math.floor(MIN_HEIGHT + Math.random() * (MAX_HEIGHT + 1 - MIN_HEIGHT));

    mocks.push(mock);
  }
  return mocks;
};

var pins = renderMocks(QUANTITY_MOCKS);

var map = document.querySelector('.map');
var filtersContainer = document.querySelector('.map__filters-container');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var renderPin = function (mock) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinSizeX = (pinElement.firstChild.width) / 2;
  var pinSizeY = (pinElement.firstChild.height) / 2;

  pinElement.style.cssText = 'left: ' + (mock.location.x + pinSizeX) + 'px; top: ' + (mock.location.y + pinSizeY) + 'px;';
  pinElement.firstChild.setAttribute('src', mock.author.avatar);
  pinElement.firstChild.setAttribute('alt', mock.offer.title);
  return pinElement;
};

var renderCard = function (mock) {
  var cardElement = cardTemplate.cloneNode(true);
  var type = '';
  var counter = 0;
  var COUNT = 6;
  switch (mock.offer.type) {
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
  var getListFeatures = function (items) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < items.length; i++) {
      var li = document.createElement('li');
      li.className = 'popup__feature popup__feature--' + items[i];
      fragment.append(li);
    }
    return fragment;
  };

  var getListPhotos = function (items) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < items.length; i++) {
      var img = document.createElement('img');
      img.setAttribute('src', items[i]);
      fragment.append(img);
    }
    return fragment;
  };

  cardElement.querySelector('.popup__title').textContent = mock.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = mock.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = mock.offer.price + ' ₽ /ночь';
  cardElement.querySelector('.popup__type').textContent = type;
  cardElement.querySelector('.popup__text--capacity').textContent = mock.offer.rooms + ' комнаты для ' + mock.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + mock.offer.checkin + ', выезд до ' + mock.offer.checkout;
  while (counter < COUNT) {
    cardElement.querySelector('.popup__features').removeChild(cardElement.querySelector('.popup__feature'));
    counter++;
  }
  cardElement.querySelector('.popup__features').append(getListFeatures(mock.offer.features));
  cardElement.querySelector('.popup__description').textContent = mock.offer.description;
  cardElement.querySelector('.popup__photos').append(getListPhotos(mock.offer.photos));
  cardElement.querySelector('.popup__avatar').setAttribute('src', mock.author.avatar);
  return cardElement;
};

map.insertBefore(renderCard(pins[0]), filtersContainer);

var drawPin = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }
  mapPins.appendChild(fragment);
};

var openMap = function () {
  drawPin();
  map.classList.remove('map--faded');
};

openMap();

