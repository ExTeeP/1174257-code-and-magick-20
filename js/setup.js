'use strict';

// Массивы имен, фамилий, цвета глаз и цвета плаща
var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

// Массив сгенерированных магов
var wizards = createWizardsArr();

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

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

var fragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
