'use strict';

var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

// Массивы имен, фамилий, цвета глаз и цвета плаща
var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userDialog = document.querySelector('.setup');
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var userNameInput = userDialog.querySelector('.setup-user-name');
var setupWizard = document.querySelector('.setup-player');

// Элементы для настройки цвета у мага
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');

// Скрытые инпуты цвета
var wizardCoatInput = setupWizard.querySelector('.wizard-coat-input');
var wizardEyesInput = setupWizard.querySelector('.wizard-eyes-input');
var wizardFireballInput = setupWizard.querySelector('.wizard-fireball-input');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Массив сгенерированных магов
var wizards = createWizardsArr();

// Возвращает случайное число
function getRandomInt(int) {
  return Math.floor(Math.random() * int);
}

// Возвращает случайный элемент из массива
function getRandomElement(arr) {
  return arr[getRandomInt(arr.length)];
}

// Склеивает имя мага из двух массивов имени и фамилии
// и меняет местами в зависимости от кол-во символов в имени
// рандом такой рандом
function getWizardName(firstNameArr, lastNameArr) {
  var wizardName = [];
  var firstName = getRandomElement(firstNameArr);
  var lastName = getRandomElement(lastNameArr);

  if (firstName.length % 2 === 0) {
    wizardName.push(firstName);
    wizardName.push(lastName);
  } else {
    wizardName.push(lastName);
    wizardName.push(firstName);
  }

  return wizardName.join(' ');
}

// Создание массива магов в котором содержатся объекты
// с внешним видом каждого мага
function createWizardsArr() {
  var wizardsCount = 4;
  var wizardsArr = [];

  for (var i = 0; i < wizardsCount; i++) {
    var wizard = {
      name: getWizardName(WIZARD_FIRST_NAMES, WIZARD_LAST_NAMES),
      coatColor: getRandomElement(COAT_COLORS),
      eyesColor: getRandomElement(EYES_COLORS),
    };
    wizardsArr.push(wizard);
  }

  return wizardsArr;
}

function renderWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

function renderWizards(wizardsArr) {
  var fragment = document.createDocumentFragment();

  // Записываем в фрагмент объект заполненный шаблон
  wizardsArr.forEach(function (wizard) {
    fragment.appendChild(renderWizard(wizard));
  });

  return fragment;
}

similarListElement.appendChild(renderWizards(wizards));

userDialog.querySelector('.setup-similar').classList.remove('hidden');

/* Обработчики открытия и закрытия */

function openPopup() {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onDialogEscPress);
}

function closePopup() {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onDialogEscPress);
}

function onDialogEscPress(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
}

function onDialogCloseEnterOrSpacePress(evt) {
  if (evt.key === 'Enter' || evt.code === 'Space') {
    evt.preventDefault();
    closePopup();
  }
}

userDialogOpen.addEventListener('click', function () {
  openPopup();
});

userDialogClose.addEventListener('click', function () {
  closePopup();
});

userDialogClose.addEventListener('keydown', onDialogCloseEnterOrSpacePress);

userNameInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onDialogEscPress);
});

userNameInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onDialogEscPress);
});

/* /Обработчики открытия и закрытия */
/* Валидация */

userNameInput.addEventListener('invalid', function () {

  if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }

});

userNameInput.addEventListener('input', function () {
  var valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
  } else {
    userNameInput.setCustomValidity('');
  }

});

/* /Валидация */

/* Измение цвета по нажатию */

// Установка цвета на элемент и его передача в скрытый инпут
function setFillInput(colorsArr, element, input) {
  var color = getRandomElement(colorsArr);

  if (element !== wizardFireball) {
    element.style.fill = color;
  } else {
    element.style.background = color;
  }

  input.value = color;

}

// Клики по элементам вызывают смену цвета элемента
wizardCoat.addEventListener('click', function () {
  setFillInput(COAT_COLORS, wizardCoat, wizardCoatInput);
});

wizardEyes.addEventListener('click', function () {
  setFillInput(EYES_COLORS, wizardEyes, wizardEyesInput);
});

wizardFireball.addEventListener('click', function () {
  setFillInput(FIREBALL_COLORS, wizardFireball, wizardFireballInput);
});

/* /Измение цвета по нажатию */
