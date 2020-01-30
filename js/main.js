'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');


var renderMokiObjects = function (n) {

  var mokiObjects = [];
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var checkinTimes = ['12:00', '13:00', '14:00'];
  var checkoutTimes = ['12:00', '13:00', '14:00'];
  var width = 1200;
  var minHeight = 130;
  var maxHeight = 630;

  for (var i = 1; i <= n; i++) {
    var mokiObject = {
      author: {},
      offer: {},
      location: {}
    };

    mokiObject.author.avatar = 'img/avatars/user0' + i + '.png';
    mokiObject.offer.title = 'String title';
    mokiObject.offer.address = '600, 350';
    mokiObject.offer.price = 100 + i;
    mokiObject.offer.type = types[Math.floor(Math.random() * types.length)];
    mokiObject.offer.rooms = i;
    mokiObject.offer.guests = i;
    mokiObject.offer.checkin = checkinTimes[Math.floor(Math.random() * checkinTimes.length)];
    mokiObject.offer.checkout = checkoutTimes[Math.floor(Math.random() * checkoutTimes.length)];
    mokiObject.offer.features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    mokiObject.offer.description = 'String description';
    mokiObject.offer.photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg'];
    mokiObject.location.x = Math.floor(Math.random() * Math.floor(width));
    mokiObject.location.y = Math.floor(minHeight + Math.random() * (maxHeight + 1 - minHeight));

    mokiObjects.push(mokiObject);
  }
  return mokiObjects;
};

var arrPins = renderMokiObjects(8);

var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

/*
var renderPin = function () {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('.map__pin').style.left = ?????;

};
*/

for (var i = 0; i < arrPins.length; i++) {
  var pinElement = pinTemplate.cloneNode(true);
  mapPins.appendChild(pinElement);
}
