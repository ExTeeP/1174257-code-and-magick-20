'use strict';

window.setup = (function () {

  // Валидация имени игрока
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;

  var userDialog = document.querySelector('.setup');
  var userDialogOpen = document.querySelector('.setup-open');
  var userDialogClose = userDialog.querySelector('.setup-close');
  var userNameInput = userDialog.querySelector('.setup-user-name');
  var dialogForm = userDialog.querySelector('.setup-wizard-form');
  var dialogSubmitButton = userDialog.querySelector('.setup-submit');

  function onFormSuccess() {
    userDialog.classList.add('hidden');
    dialogSubmitButton.textContent = 'Сохранить';
    dialogSubmitButton.disabled = false;
  }

  function openPopup() {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onDialogEscPress);
    userDialogClose.addEventListener('keydown', onDialogCloseEnterPress);
  }

  function closePopup() {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onDialogEscPress);
    userDialogClose.removeEventListener('keydown', onDialogCloseEnterPress);
    window.move.resetSetupCoords();
  }

  function onDialogEscPress(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  }

  function onDialogCloseEnterPress(evt) {
    if (evt.key === 'Enter') {
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

  userDialogOpen.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      openPopup();
    }
  });

  userNameInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onDialogEscPress);
  });

  userNameInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onDialogEscPress);
  });

  userNameInput.addEventListener('invalid', function () {

    if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }

  });

  userNameInput.addEventListener('change', function () {
    var valueLength = userNameInput.value.length;

    if (valueLength < MIN_NAME_LENGTH) {
      userNameInput.setCustomValidity('Имя не может состоять из ' + valueLength + ' симв. Введите ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_NAME_LENGTH) {
      userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
    } else {
      userNameInput.setCustomValidity('');
    }

  });

  dialogForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(dialogForm), onFormSuccess, window.error.errorHandler);
    dialogSubmitButton.textContent = 'Данные отправляются...';
    dialogSubmitButton.disabled = true;
  });

})();
