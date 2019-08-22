const toggleButton = document.getElementById('toggle-btn')
const mount = document.getElementById('canvas')

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
    myCanvas.parent(mount)

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

function toggleGame() {
  runGame = !runGame
  toggleButton.innerHTML = runGame ? 'Stop' : 'Start'
}

function clearGame() {
  game.eraseAll()
}

function brushContext() {
  return false
}

function exportData() {
  const obj = {
    gameData: game.getGridData(),
    brushData: brushCreator.getBrushData()
  }
  downloadObjectAsJson(obj, `grid_data_${new Date().toString()}`)
}

function importData(e) {
  const reader = new FileReader()
  reader.onload = function(e) {
    const JSONObj = JSON.parse(e.target.result)
    const { gameData, brushData } = JSONObj

    if (!gameData || !brushData) alert('File data not supported!')

    game.setGridData(gameData)
    brushCreator.setBrushData(brushData)
  }

  try {
    reader.readAsText(e.target.files[0])
  } catch (e) {
    console.log('Unable to read file.')
  }
}

new p5(MainGame)
new p5(Paintbrush)

/* -------------------------------------------------------------------------- */
/*                                  LISTENERS                                 */
/* -------------------------------------------------------------------------- */
document.getElementById('get-file').onclick = function() {
  document.getElementById('my-file').click()
}

document.getElementById('my-file').addEventListener('change', importData)

// reset board when mouse is pressed
// function mousePressed() {
//   game.init()
// }
