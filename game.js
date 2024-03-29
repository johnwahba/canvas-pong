// Generated by CoffeeScript 1.7.1
(function() {
  $(document).ready(function() {
    var ComputerPaddle, HumanPaddle, Pong, canvas, computerPaddle, ctx, drawGame, humanPaddle, mouseY, pong;
    HumanPaddle = (function() {
      function HumanPaddle() {
        this.score = 0;
      }

      HumanPaddle.prototype.updatePosition = function() {
        return this.currentPosition = [0, mouseY];
      };

      return HumanPaddle;

    })();
    ComputerPaddle = (function() {
      function ComputerPaddle(pong, speed) {
        this.pong = pong;
        this.speed = speed;
        this.score = 0;
        this.currentPosition = [950, 320];
      }

      ComputerPaddle.prototype.updatePosition = function() {
        if (this.pong.currentPosition[1] > this.currentPosition[1]) {
          return this.currentPosition[1] += this.speed;
        } else if (this.pong.currentPosition[1] < this.currentPosition[1]) {
          return this.currentPosition[1] -= this.speed;
        }
      };

      return ComputerPaddle;

    })();
    Pong = (function() {
      function Pong(currentPosition, leftPaddle, rightPaddle) {
        this.currentPosition = currentPosition;
        this.leftPaddle = leftPaddle;
        this.rightPaddle = rightPaddle;
        this.direction = Math.random() * 2 * Math.PI;
        this.speed = 5;
      }

      Pong.prototype.getDeltaX = function() {
        return Math.sin(this.direction);
      };

      Pong.prototype.getDeltaY = function() {
        return Math.cos(this.direction);
      };

      Pong.prototype.updatePosition = function() {
        this.currentPosition[0] += this.getDeltaX() * this.speed;
        this.currentPosition[1] += this.getDeltaY() * this.speed;
        if (this.currentPosition[1] < 10 || this.currentPosition[1] > 630) {
          this.direction = Math.PI - this.direction;
        }
        if (this.currentPosition[0] < 30) {
          if (this.leftPaddle.currentPosition[1] + 64 > this.currentPosition[1] && this.leftPaddle.currentPosition[1] - 64 < this.currentPosition[1]) {
            this.direction = 2 * Math.PI - this.direction;
            return this.speed *= 1.1;
          } else {
            this.currentPosition = [480, 320];
            this.direction = Math.random() * 2 * Math.PI;
            this.speed = 5;
            return this.rightPaddle.score += 1;
          }
        } else if (this.currentPosition[0] > 940) {
          if (this.rightPaddle.currentPosition[1] + 64 > this.currentPosition[1] && this.rightPaddle.currentPosition[1] - 64 < this.currentPosition[1]) {
            this.direction = 2 * Math.PI - this.direction;
            return this.speed *= 1.1;
          } else {
            this.currentPosition = [480, 320];
            this.direction = Math.random() * 2 * Math.PI;
            this.speed = 5;
            return this.leftPaddle.score += 1;
          }
        }
      };

      return Pong;

    })();
    canvas = $('#game')[0];
    ctx = canvas.getContext('2d');
    canvas.width = 960;
    canvas.height = 640;
    mouseY = 320;
    humanPaddle = new HumanPaddle;
    pong = new Pong([480, 320], humanPaddle);
    computerPaddle = new ComputerPaddle(pong, 3);
    pong.rightPaddle = computerPaddle;
    $('#game').on('mousemove', function(event) {
      return mouseY = event.clientY;
    });
    drawGame = function() {
      canvas.width = canvas.width;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, 960, 640);
      ctx.fillStyle = "white";
      ctx.fillRect(475, 0, 10, 640);
      ctx.font = "bold 60px Arial";
      ctx.fillText(humanPaddle.score, 240, 60);
      ctx.fillText(computerPaddle.score, 720, 60);
      ctx.fillRect(0, humanPaddle.currentPosition[1] - 64, 20, 128);
      ctx.fillRect(940, computerPaddle.currentPosition[1] - 64, 20, 128);
      ctx.fillStyle = "green";
      return ctx.fillRect(pong.currentPosition[0] - 10, pong.currentPosition[1] - 10, 20, 20);
    };
    return setInterval(function() {
      humanPaddle.updatePosition();
      computerPaddle.updatePosition();
      pong.updatePosition();
      return drawGame();
    }, 10);
  });

}).call(this);
