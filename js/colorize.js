'use strict';

window.colorize = (function () {

  var DEFAULT_COAT = 'rgb(101, 137, 164)';
  var DEFAULT_EYES = 'black';
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var coatColor;
  var eyesColor;

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
  function setFill(colorsArr, element, input) {
    var color = window.utils.getRandomElement(colorsArr);

    if (element !== playerFireball) {
      element.style.fill = color;

      switch (element) {
        case playerCoat:
          coatColor = color;
          break;
        case playerEyes:
          eyesColor = color;
          break;
      }

    } else {
      element.style.background = color;
    }

    input.value = color;
  }

  // Клики по элементам вызывают смену цвета элемента
  playerCoat.addEventListener('click', function () {
    setFill(COAT_COLORS, playerCoat, playerCoatInput);
  });

  playerEyes.addEventListener('click', function () {
    setFill(EYES_COLORS, playerEyes, playerEyesInput);
  });

  playerFireball.addEventListener('click', function () {
    setFill(FIREBALL_COLORS, playerFireball, playerFireballInput);
  });

})();
