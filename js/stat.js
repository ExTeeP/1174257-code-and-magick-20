'use strict';
window.stat = (function () {

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
  var Bar = {
    WIDTH: 40,
    HEIGHT: 150,
    GAP: 50,
    COLOR: {
      player: 'rgba(255, 0, 0, 1)',

      otherPlayers: function () {
        return 'hsl(240, ' + window.utils.getRandomInt(100) + '%' + ', 50%)';
      }
    }
  };

  // Настройки и свойства шрифта
  var Text = {
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
    },

    render: function (ctx, x, y, text) {
      this.setFontStyle(ctx, this.ALIGN.CENTER);
      ctx.fillText(text, x, y);
    }
  };

  var PositionX = {
    CLOUD_CENTER: Cloud.X + (Cloud.WIDTH / 2),
    BAR_START: Cloud.X + Bar.GAP,
    BAR_END: Bar.WIDTH + Bar.GAP,
  };

  var PositionY = {
    CLOUD_END: Cloud.Y + Cloud.HEIGHT,
  };

  // Параметры заливки цветом баров результатов
  // (генерация рандомного синего цвета для других пользователей)
  function getBarColor(name) {
    return name === window.const.USER ? Bar.COLOR.player : Bar.COLOR.otherPlayers();
  }

  // Поздравление с победой в конце уровня
  function congratulateMessage(ctx) {

    // Массив для отрисовки текста, каждый новый индекс отрисовывается как отдельная строка
    var messageArr = [
      'Ура вы победили!',
      'Список результатов:',
    ];

    messageArr.forEach(function (message, index) {
      Text.render(ctx, PositionX.CLOUD_CENTER, Cloud.Y + Text.GAP + Text.HEIGHT * index, message);
    });
  }

  window.renderStatistics = function (ctx, players, times) {
    Cloud.render(ctx);
    congratulateMessage(ctx);

    var maxTime = window.utils.getMaxElement(times);

    players.forEach(function (player, i) {

      var barCounter = PositionX.BAR_START + PositionX.BAR_END * i;

      Text.setFontStyle(ctx); // Цвет шрифта и сброс цвета от колонки после итерации
      ctx.fillText(player, barCounter, PositionY.CLOUD_END - Cloud.GAP - Text.HEIGHT);
      ctx.fillText(Math.floor(times[i]), barCounter, PositionY.CLOUD_END - (Cloud.GAP * 3) - (Text.HEIGHT * 2) - (Bar.HEIGHT * times[i]) / maxTime);
      ctx.fillStyle = getBarColor(player); // На каждой итерации красит колонку в заданный цвет (наследуется шрифтом, поэтому необходимо сбрасывать)
      ctx.fillRect(barCounter, PositionY.CLOUD_END - (Cloud.GAP * 2) - Text.HEIGHT, Bar.WIDTH, (-Bar.HEIGHT * times[i]) / maxTime);
    });
  };

})();
