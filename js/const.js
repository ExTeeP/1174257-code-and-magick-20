'use strict';

window.const = (function () {

  // Количество магов
  var WIZARDS_AMOUNT = 4;

  // Работа с запросами
  var TIMEOUT_IN_MS = 10000;
  var LOAD_URL = 'https://javascript.pages.academy/code-and-magick/data';
  var SEND_URL = 'https://javascript.pages.academy/code-and-magick';

  // Положение модального окна
  var DEFAULT_SETUP_TOP = '80px';
  var DEFAULT_SETUP_LEFT = '50%';

  // Имя игрока в статистике
  var USER = 'Вы';

  // Валидация имени игрока
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;

  return {
    MIN_NAME_LENGTH: MIN_NAME_LENGTH,
    MAX_NAME_LENGTH: MAX_NAME_LENGTH,
    USER: USER,
    DEFAULT_SETUP_TOP: DEFAULT_SETUP_TOP,
    DEFAULT_SETUP_LEFT: DEFAULT_SETUP_LEFT,
    TIMEOUT_IN_MS: TIMEOUT_IN_MS,
    LOAD_URL: LOAD_URL,
    SEND_URL: SEND_URL,
    WIZARDS_AMOUNT: WIZARDS_AMOUNT
  };

})();
