'use strict';

window.utils = (function () {
  return {

    // Рандомное число из промежутка или рандомное число
    getRandomInt: function (min, max) {
      if (max !== undefined) {
        return Math.round(Math.random() * (max - min) + min);
      }

      return Math.floor(Math.random() * min);
    },

    // Возвращает случайный элемент из массива
    getRandomElement: function (arr) {
      return arr[this.getRandomInt(arr.length)];
    },

    // Нахождение максимального элемента в массиве
    getMaxElement: function (arr) {
      return Math.max.apply(null, arr);
    },

  };

})();
