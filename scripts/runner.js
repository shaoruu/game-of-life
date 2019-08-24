let game
let runGame
let brushCreator

const Paintbrush = sketch => {
  sketch.setup = () => {
    const brushCanvas = sketch.createCanvas(100, 100)
    brushCanvas.parent('brush-canvas')
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
    const myCanvas = sketch.createCanvas(640, 580)
    myCanvas.parent(document.getElementById('canvas'))
    myCanvas.attribute('oncontextmenu', 'return false;')

    game = new GameOfLife(sketch)

    runGame = false
    game.init()
  }

  sketch.draw = () => {
    sketch.background('#222831')
    if (runGame) game.generate()

    game.draw()
    game.paint()
  }
}

new p5(MainGame)
new p5(Paintbrush)
