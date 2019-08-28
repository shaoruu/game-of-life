const BRUSH_SHAPE = {
  data: [
    {
      x: 0,
      y: 0
    }
  ]
}

const GAME_ROW = 29
const GAME_COLUMN = 32

const WIDTH = document.getElementById('canvas').offsetWidth * 0.035

const GAME_WIDTH = GAME_COLUMN * WIDTH
const GAME_HEIGHT = GAME_ROW * WIDTH

const GAME_DEFAULT_INTERVAL = 150

const BRUSH_WIDTH = WIDTH * 5
const BRUSH_HEIGHT = WIDTH * 5

const EMPTY_HOVER_COLOR = '#cfb700'
const GRID_LINE_COLOR = '#252525'
const ALIVE_COLOR = '#DA291C'
const DEAD_COLOR = '#FBE122'
