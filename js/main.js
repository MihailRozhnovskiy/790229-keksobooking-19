'use strict';

var renderMocks = function (n) {

  var mocks = [];
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var checkinTimes = ['12:00', '13:00', '14:00'];
  var checkoutTimes = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var width = 1200;
  var minHeight = 130;
  var maxHeight = 630;

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
    mock.location.x = Math.floor(Math.random() * Math.floor(width));
    mock.location.y = Math.floor(minHeight + Math.random() * (maxHeight + 1 - minHeight));

    mocks.push(mock);
  }
  return mocks;
};

var pins = renderMocks(8);

var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (mock) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinSizeX = (pinElement.firstChild.width) / 2;
  var pinSizeY = (pinElement.firstChild.height) / 2;

  pinElement.style.cssText = 'left: ' + (mock.location.x + pinSizeX) + 'px; top: ' + (mock.location.y + pinSizeY) + 'px;';
  pinElement.firstChild.setAttribute('src', mock.author.avatar);
  pinElement.firstChild.setAttribute('alt', mock.offer.title);
  return pinElement;
};

var drawPin = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }
  mapPins.appendChild(fragment);
};

var openMap = function () {
  drawPin();
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
};

openMap();


