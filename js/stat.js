'use strict';

var USER = 'Вы';

// Свойства облака результатов
var Cloud = {
  X: 100,
  Y: 10,
  WIDTH: 420,
  HEIGHT: 270,
  GAP: 10,
  COLOR: '#ffffff',
  SHADOW: 'rgba(0, 0, 0, 0.7)',

  // Прорисовка облака для результатов
  render: function (ctx) {
    ctx.fillStyle = this.SHADOW;
    ctx.fillRect(this.X + this.GAP, this.Y + this.GAP, this.WIDTH, this.HEIGHT);
    ctx.fillStyle = this.COLOR;
    ctx.fillRect(this.X, this.Y, this.WIDTH, this.HEIGHT);
  }
};

// Свойства вертикального бара результатов
var ResultBar = {
  WIDTH: 40,
  HEIGHT: 150,
  GAP: 50,
  COLOR: {
    player: 'rgba(255, 0, 0, 1)',

    otherPlayers: function () {
      return 'hsl(240, ' + getRandomInt(100) + '%' + ', 50%)';
    }
  }
};

// Настройки и свойства шрифта
var TextSetting = {
  WIDTH: 50,
  HEIGHT: 16,
  GAP: 15,
  FONT: '16px PT Mono',
  COLOR: '#000',
  ALIGN: {
    START: 'start',
    END: 'end',
    CENTER: 'center',
  },
  BASELINE: 'hanging',

  setFontStyle: function (ctx, align) {
    ctx.font = this.FONT;
    ctx.fillStyle = this.COLOR;
    ctx.textBaseline = this.BASELINE;
    ctx.textAlign = align ? align : this.ALIGN.START;
  }
};

var PositionX = {
  CLOUD_CENTER: Cloud.X + (Cloud.WIDTH / 2),
  BAR_START: Cloud.X + ResultBar.GAP,
  BAR_END: ResultBar.WIDTH + ResultBar.GAP,
};

var PositionY = {
  CLOUD_END: Cloud.Y + Cloud.HEIGHT,
};


// Нахождение максимального элемента в массиве
function getMaxElement(arr) {
  return Math.max.apply(null, arr);
}

// Генерация рандомного целого числа
function getRandomInt(int) {
  return Math.floor(Math.random() * int) + 1;
}

// Параметры заливки цветом баров результатов
// (генерация рандомного синего цвета для других пользователей)
var getBarColor = function (name) {
  return name === USER ? ResultBar.COLOR.player : ResultBar.COLOR.otherPlayers();
};

// Отрисовка текста
function renderText(ctx, x, y, text) {
  TextSetting.setFontStyle(ctx, TextSetting.ALIGN.CENTER);
  ctx.fillText(text, x, y);
}

// Поздравление с победой в конце уровня
function congratulateMessage(ctx) {

  // Массив для отрисовки текста, каждый новый индекс отрисовывается как отдельная строка
  var messageArr = [
    'Ура вы победили!',
    'Список результатов:',
  ];

  messageArr.forEach(function (message, index) {
    renderText(ctx, PositionX.CLOUD_CENTER, Cloud.Y + TextSetting.GAP + TextSetting.HEIGHT * index, message);
  });
}

window.renderStatistics = function (ctx, players, times) {
  Cloud.render(ctx);
  congratulateMessage(ctx);

  var maxTime = getMaxElement(times);

  players.forEach(function (player, i) {
    TextSetting.setFontStyle(ctx); // Цвет шрифта и сброс цвета от колонки после итерации
    ctx.fillText(player, PositionX.BAR_START + PositionX.BAR_END * i, PositionY.CLOUD_END - Cloud.GAP - TextSetting.HEIGHT);
    ctx.fillText(Math.floor(times[i]), PositionX.BAR_START + PositionX.BAR_END * i, PositionY.CLOUD_END - (Cloud.GAP * 3) - (TextSetting.HEIGHT * 2) - (ResultBar.HEIGHT * times[i]) / maxTime);
    ctx.fillStyle = getBarColor(player); // На каждой итерации красит колонку в заданный цвет (наследуется шрифтом, поэтому он сбрасывается на 114 строке на черный)
    ctx.fillRect(PositionX.BAR_START + PositionX.BAR_END * i, PositionY.CLOUD_END - (Cloud.GAP * 2) - TextSetting.HEIGHT, ResultBar.WIDTH, (-ResultBar.HEIGHT * times[i]) / maxTime);
  });
};
