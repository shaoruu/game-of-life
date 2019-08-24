let game
let runGame
let brushCreator

const Paintbrush = sketch => {
  sketch.setup = () => {
    const brushCanvas = sketch.createCanvas(BRUSH_WIDTH, BRUSH_HEIGHT)
    brushCanvas.parent('brush-canvas')
    brushCanvas.class('brush-canvas')
    brushCanvas.attribute('oncontextmenu', 'return false;')

    brushCreator = new BrushCreator(sketch)

    brushCreator.init()
  }

  sketch.draw = () => {
    sketch.background('#222831')
    brushCreator.draw()
    brushCreator.paint()
    brushCreator.updateBrush()
  }
}

const MainGame = sketch => {
  sketch.setup = () => {
    const myCanvas = sketch.createCanvas(GAME_WIDTH, GAME_HEIGHT)
    myCanvas.parent(document.getElementById('canvas'))
    myCanvas.id('game')
    myCanvas.attribute('oncontextmenu', 'return false;')

    game = new GameOfLife(sketch)

    runGame = false
    game.init()
  }

  sketch.draw = () => {
    game.sketch.background('#222831')

    game.draw()
    game.paint()
  }
}

const drawGame = () => {
  if (runGame) game.generate()
}

let gameLoopInterval = setInterval(drawGame, GAME_DEFAULT_INTERVAL)

new p5(MainGame)
new p5(Paintbrush)
