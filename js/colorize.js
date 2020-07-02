'use strict';

(function () {

  // Элементы для настройки цвета у мага
  var player = document.querySelector('.setup-player');
  var playerCoat = player.querySelector('.wizard-coat');
  var playerEyes = player.querySelector('.wizard-eyes');
  var playerFireball = player.querySelector('.setup-fireball-wrap');

  // Скрытые инпуты цвета
  var playerCoatInput = player.querySelector('.wizard-coat-input');
  var playerEyesInput = player.querySelector('.wizard-eyes-input');
  var playerFireballInput = player.querySelector('.wizard-fireball-input');

  // Установка цвета на элемент и его передача в скрытый инпут
  function setFillInput(colorsArr, element, input) {
    var color = window.utils.getRandomElement(colorsArr);

    if (element !== playerFireball) {
      element.style.fill = color;
    } else {
      element.style.background = color;
    }

    input.value = color;

  }

  // Клики по элементам вызывают смену цвета элемента
  playerCoat.addEventListener('click', function () {
    setFillInput(window.const.COAT_COLORS, playerCoat, playerCoatInput);
  });

  playerEyes.addEventListener('click', function () {
    setFillInput(window.const.EYES_COLORS, playerEyes, playerEyesInput);
  });

  playerFireball.addEventListener('click', function () {
    setFillInput(window.const.FIREBALL_COLORS, playerFireball, playerFireballInput);
  });

})();
