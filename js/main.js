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
    mock.dataIndex = i - 1;

    mocks.push(mock);
  }
  return mocks;
};

var pins = renderMocks(QUANTITY_MOCKS);

var renderPin = function (mock) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = pinTemplate.cloneNode(true);
  var pinSizeX = (pinElement.firstChild.width) / 2;
  var pinSizeY = (pinElement.firstChild.height) / 2;

  pinElement.style.cssText = 'left: ' + (mock.location.x + pinSizeX) + 'px; top: ' + (mock.location.y + pinSizeY) + 'px;';
  pinElement.firstChild.setAttribute('src', mock.author.avatar);
  pinElement.firstChild.setAttribute('alt', mock.offer.title);
  pinElement.firstChild.setAttribute('data-index', mock.dataIndex);
  return pinElement;
};

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

var drawPin = function () {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }
  mapPins.appendChild(fragment);
};

var formFields = document.querySelectorAll('fieldset');
var buttonPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');


var setFieldsetDisabled = function () {
  for (var i = 0; i < formFields.length; i++) {
    formFields[i].setAttribute('disabled', 'disabled');
  }
  return formFields;
};

setFieldsetDisabled();

var delFieldsetDisabled = function () {
  for (var i = 0; i < formFields.length; i++) {
    formFields[i].removeAttribute('disabled');
  }
  return formFields;
};

var getAddress = function () {
  var address = adForm.querySelector('#address');
  var pinMainTop = buttonPinMain.style.top;
  var pinMainLeft = buttonPinMain.style.left;
  var pinMainSizeX = (buttonPinMain.firstElementChild.width) / 2;
  var pinMainSizeY = (buttonPinMain.firstElementChild.height) / 2;
  var addressValue = parseInt(pinMainLeft, 10) + pinMainSizeX + ', ' + (parseInt(pinMainTop, 10) + pinMainSizeY);
  address.setAttribute('value', addressValue);
  return address;
};

getAddress();

var buttonPinMainPushHandler = function (evt) {
  var map = document.querySelector('.map');
  if (evt.button === 0 || evt.key === 'Enter') {
    drawPin();
    delFieldsetDisabled();
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  }
};

buttonPinMain.addEventListener('mousedown', buttonPinMainPushHandler);
buttonPinMain.addEventListener('keydown', buttonPinMainPushHandler);

var formTitle = document.querySelector('#title');

var formTitleInputHandler = function () {
  if (formTitle.validity.tooShort) {
    formTitle.setCustomValidity('Минимальная длина — 30 символов');
  } else if (formTitle.validity.tooLong) {
    formTitle.setCustomValidity('Максимальная длина — 100 символов');
  } else if (formTitle.validity.valueMissing) {
    formTitle.setCustomValidity('Обязательное текстовое поле');
  } else {
    formTitle.setCustomValidity('');
  }
};
formTitle.addEventListener('invalid', formTitleInputHandler);

var selectTypeLodging = document.querySelector('#type');
var formPrice = document.querySelector('#price');

var compTypeLodgingPriceHandler = function () {
  var typeLodging = document.querySelector('#type').value;
  var price = document.querySelector('#price').value;
  var MIN_PRICE_BUNGALO = 0;
  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_PALACE = 10000;
  var MAX_PRICE = 1000000;
  if (typeLodging === 'bungalo' && price < MIN_PRICE_BUNGALO) {
    formPrice.setCustomValidity('«Бунгало» — минимальная цена за ночь 0');
  } else if (typeLodging === 'flat' && price < MIN_PRICE_FLAT) {
    formPrice.setCustomValidity('«Квартира» — минимальная цена за ночь 1 000');
  } else if (typeLodging === 'house' && price < MIN_PRICE_HOUSE) {
    formPrice.setCustomValidity('«Дом» — минимальная цена за ночь 5 000');
  } else if (typeLodging === 'palace' && price < MIN_PRICE_PALACE) {
    formPrice.setCustomValidity('«Дворец» — минимальная цена за ночь 10 000');
  } else if (price > MAX_PRICE) {
    formPrice.setCustomValidity('Максимальное значение — 1 000 000');
  } else {
    formPrice.setCustomValidity('');
  }
};
formPrice.addEventListener('change', compTypeLodgingPriceHandler);
selectTypeLodging.addEventListener('change', compTypeLodgingPriceHandler);

var selectRoom = document.querySelector('#room_number');
var selectGuest = document.querySelector('#capacity');

var compGuestsRoomsHandler = function () {
  var quantityRoom = document.querySelector('#room_number').value;
  var quantityGuest = document.querySelector('#capacity').value;
  if ((quantityRoom === '1' && quantityGuest !== '1') ||
      (quantityRoom === '2' && quantityGuest !== '1' && quantityGuest !== '2') ||
      (quantityRoom === '3' && quantityGuest !== '1' && quantityGuest !== '2' && quantityGuest !== '3') ||
      (quantityRoom === '100' && quantityGuest !== '0')) {
    selectRoom.setCustomValidity('Количество комнат не соответствует количеству гостей');
  } else {
    selectRoom.setCustomValidity('');
  }
};
selectRoom.addEventListener('change', compGuestsRoomsHandler);
selectGuest.addEventListener('change', compGuestsRoomsHandler);

var selectTimeIn = document.querySelector('#timein');
var selectTimeOut = document.querySelector('#timeout');

var compTimeInTimeOutHandler = function () {
  var timeIn = document.querySelector('#timein').value;
  var timeOut = document.querySelector('#timeout').value;
  if (parseInt(timeOut, 10) < parseInt(timeIn, 10)) {
    selectTimeIn.setCustomValidity('');
  } else {
    selectTimeIn.setCustomValidity('«Время выезда» должно быть не менее чем за час до «Время заезда»');
  }
};
selectTimeIn.addEventListener('change', compTimeInTimeOutHandler);
selectTimeOut.addEventListener('change', compTimeInTimeOutHandler);

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

var escClosePopupHandler = function (evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
};

var closePopupHandler = function () {
  closePopup();
};

var mousedownPinOpenPopupHandler = function (evt) {
  var target = evt.target.getAttribute('data-index');
  if (target) {
    openPopup(target);
    var buttonCloseCard = document.querySelector('.popup__close');
    buttonCloseCard.addEventListener('click', closePopupHandler);
    document.addEventListener('keydown', escClosePopupHandler);
  }
};
map.addEventListener('click', mousedownPinOpenPopupHandler);

var keydownPinOpenPopupHandler = function (evt) {
  var target = evt.target.firstElementChild.getAttribute('data-index');
  if (target && evt.key === 'Enter') {
    openPopup(target);
    var buttonCloseCard = document.querySelector('.popup__close');
    document.addEventListener('keydown', escClosePopupHandler);
    buttonCloseCard.addEventListener('click', closePopupHandler);
  }
};
map.addEventListener('keydown', keydownPinOpenPopupHandler);
