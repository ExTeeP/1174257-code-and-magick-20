'use strict';

window.data = (function () {

  // Количество магов
  var WIZARDS_AMOUNT = 4;
  var wizards = [];

  var userDialog = document.querySelector('.setup');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  function renderWizard(wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  }

  function renderWizards(data) {
    var fragment = document.createDocumentFragment();
    var mixedWizards = window.utils.getShuffleArray(data);

    // Записываем в фрагмент объект заполненный шаблон
    for (var i = 0; i < WIZARDS_AMOUNT; i++) {
      fragment.appendChild(renderWizard(mixedWizards[i]));
    }

    similarListElement.appendChild(fragment);
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  }

  var onSuccess = function (data) {
    wizards = data;
    renderWizards(wizards);
  };

  window.backend.load(onSuccess, window.error.errorHandler);

})();
