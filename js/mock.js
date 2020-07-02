'use strict';

window.mock = (function () {

  var userDialog = document.querySelector('.setup');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // Массив сгенерированных магов
  var wizards = createWizardsArr();

  // Склеивает имя мага из двух массивов имени и фамилии
  // и меняет местами в зависимости от кол-во символов в имени
  // рандом такой рандом
  function getWizardName(firstNameArr, lastNameArr) {
    var wizardName = [];
    var firstName = window.utils.getRandomElement(firstNameArr);
    var lastName = window.utils.getRandomElement(lastNameArr);

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
        name: getWizardName(window.const.WIZARD_FIRST_NAMES, window.const.WIZARD_LAST_NAMES),
        coatColor: window.utils.getRandomElement(window.const.COAT_COLORS),
        eyesColor: window.utils.getRandomElement(window.const.EYES_COLORS)
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

})();
