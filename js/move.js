'use strict';

window.move = (function () {

  var setup = document.querySelector('.setup');
  var handle = setup.querySelector('.upload');
  var isDragged = false;

  function onClickPreventDefault(clickEvt) {
    clickEvt.preventDefault();
    handle.removeEventListener('click', onClickPreventDefault);
    isDragged = false;
  }

  handle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      isDragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      if (isDragged) {
        handle.addEventListener('click', onClickPreventDefault);
      }
    }

    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  });


  return {
    resetSetupCoords: function () {
      setup.style.top = window.const.DEFAULT_SETUP_TOP;
      setup.style.left = window.const.DEFAULT_SETUP_LEFT;
    }
  };

})();
