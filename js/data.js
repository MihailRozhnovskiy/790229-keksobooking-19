'use strict';

(function () {
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
      mock.dataIndex = i - 1;

      mocks.push(mock);
    }
    return mocks;
  };
  window.data = renderMocks(QUANTITY_MOCKS);
})();

console.log(window.data);
