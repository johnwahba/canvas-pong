$(document).ready ()->

  class HumanPaddle
    constructor:()->
      @score = 0

    updatePosition: ()->
      @currentPosition = [0, mouseY]

  class ComputerPaddle
    constructor:(@pong, @speed)->
      @score = 0
      @currentPosition = [950, 320]

    updatePosition:()->
      if @pong.currentPosition[1] > @currentPosition[1]
        @currentPosition[1] += @speed
      else if @pong.currentPosition[1] < @currentPosition[1]
        @currentPosition[1] -= @speed






  class Pong
    constructor: (@currentPosition, @leftPaddle, @rightPaddle)->
      @direction = Math.random() * 2 * Math.PI
      @speed = 5

    getDeltaX: ()->
      Math.sin(@direction) 

    getDeltaY: ()->
      Math.cos(@direction)

    updatePosition: ()->
      @currentPosition[0] += @getDeltaX() * @speed
      @currentPosition[1] += @getDeltaY() * @speed
      if @currentPosition[1] < 10 || @currentPosition[1] > 630
        @direction = Math.PI - @direction
      if @currentPosition[0] < 30 
        if @leftPaddle.currentPosition[1] + 64 > @currentPosition[1] && @leftPaddle.currentPosition[1] - 64 < @currentPosition[1] 
          @direction = 2 * Math.PI - @direction
          @speed *= 1.1
        else
          @currentPosition = [480,320]
          @direction = Math.random() * 2 * Math.PI
          @speed = 5
          @rightPaddle.score += 1
      else if @currentPosition[0] > 940
        if @rightPaddle.currentPosition[1] + 64 > @currentPosition[1] && @rightPaddle.currentPosition[1] - 64 < @currentPosition[1] 
          @direction = 2 * Math.PI - @direction
          @speed *= 1.1
        else
          @currentPosition = [480,320]
          @direction = Math.random() * 2 * Math.PI
          @speed = 5
          @leftPaddle.score += 1


  canvas = $('#game')[0]
  ctx = canvas.getContext('2d')
  canvas.width = 960
  canvas.height = 640
  mouseY = 320 

  humanPaddle = new HumanPaddle
  pong = new Pong([480,320], humanPaddle)
  computerPaddle = new ComputerPaddle(pong, 3)
  pong.rightPaddle = computerPaddle

  $('#game').on 'mousemove', (event)->
    mouseY = event.clientY


  drawGame = ()->
    canvas.width = canvas.width
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,960,640)
    ctx.fillStyle = "white"
    ctx.fillRect(475,0, 10, 640)
    #scores
    ctx.font = "bold 60px Arial";
    ctx.fillText humanPaddle.score, 240, 60
    ctx.fillText computerPaddle.score, 720, 60

    #paddles
    ctx.fillRect 0, humanPaddle.currentPosition[1] - 64, 20, 128 
    ctx.fillRect 940, computerPaddle.currentPosition[1] - 64, 20, 128 

    #pong
    ctx.fillStyle = "green"
    ctx.fillRect( pong.currentPosition[0] - 10 , pong.currentPosition[1] - 10 , 20, 20 )



  setInterval ()->
    humanPaddle.updatePosition()
    computerPaddle.updatePosition()
    pong.updatePosition()
    drawGame()
  , 10

  #board is 620 pixels wide with 10 px deadspace



  #draw line and board
