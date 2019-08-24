const importBtn = document.getElementById('get-file')
const importRoot = document.getElementById('my-file')
const downArrow = document.getElementById('down-arrow')
const upArrow = document.getElementById('up-arrow')
const toggleButton = document.getElementById('toggle-btn')
const frameRange = document.getElementById('frame-range')
const brushGallery = document.getElementById('brush-gallery')
const patternGallery = document.getElementById('pattern-gallery')

/* -------------------------------------------------------------------------- */
/*                            GAME BUTTON LISTENERS                           */
/* -------------------------------------------------------------------------- */
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  importBtn.addEventListener(eventName, preventDefaults, false)
})

importRoot.onchange = function(e) {
  importData(e)
}

importBtn.onclick = function() {
  importRoot.click()
}

importBtn.ondrop = function(e) {
  let dt = e.dataTransfer
  let files = dt.files

  importBtn.classList.remove('hovered')

  importData({ target: { files } })
}

importBtn.ondragover = function(e) {
  importBtn.classList.add('hovered')
  e.preventDefault()
}

importBtn.ondragleave = function(e) {
  importBtn.classList.remove('hovered')
}

frameRange.onchange = function(e) {
  const newInterval = 300 - e.target.value
  clearInterval(gameLoopInterval)
  gameLoopInterval = setInterval(drawGame, newInterval)
}

/* -------------------------------------------------------------------------- */
/*                                BOUNCY ARROWS                               */
/* -------------------------------------------------------------------------- */
const scroll = new SmoothScroll('div', {
  easing: 'easeInCubic',
  speed: 300,
  speedAsDuration: true
})

downArrow.onclick = function() {
  scrollToGallery()
  hideDownArrow()
}

upArrow.onclick = function() {
  scrollToTop()
  hideUpArrow()
}

window.onscroll = function() {
  checkScroll()
}

/* -------------------------------------------------------------------------- */
/*                                   GALLERY                                  */
/* -------------------------------------------------------------------------- */
GALLERY_DATA.brushes.forEach(({ name, data }) => {
  const id = name.replace(' ', '-')
  const canvasId = id + '-canvas'

  const temp = sketch => {
    sketch.setup = () => {
      const canvas = sketch.createCanvas(100, 100)
      canvas.parent(canvasId)
      canvas.class('brush-canvas')

      const grid = new BaseGrid(sketch, false)
      grid.data = JSON.parse(JSON.stringify(data))

      grid.draw()
    }
  }

  const newDiv = document.createElement('div')
  newDiv.id = id

  newDiv.onclick = function() {
    brushCreator.setBrushData(JSON.parse(JSON.stringify(data)))
    scrollToTop()
  }

  newDiv.classList.add('brush-item')
  newDiv.classList.add('ripple')

  const newDivCanvas = document.createElement('div')
  newDivCanvas.id = canvasId

  const newDivTitle = document.createElement('p')
  newDivTitle.innerHTML = name.toUpperCase()

  newDiv.appendChild(newDivCanvas)
  newDiv.appendChild(newDivTitle)
  brushGallery.appendChild(newDiv)

  new p5(temp)
})

GALLERY_DATA.patterns.forEach(({ name, data }) => {
  const id = name.replace(' ', '-')
  const canvasId = id + '-canvas'

  const temp = sketch => {
    sketch.setup = () => {
      const canvas = sketch.createCanvas(GAME_WIDTH * 0.3, GAME_HEIGHT * 0.3)
      canvas.parent(canvasId)
      canvas.class('brush-canvas')

      const grid = new BaseGrid(sketch, false, WIDTH * 0.3)
      grid.data = JSON.parse(JSON.stringify(data))

      grid.draw()
    }
  }

  const newDiv = document.createElement('div')
  newDiv.id = id

  newDiv.onclick = function() {
    game.setGridData(JSON.parse(JSON.stringify(data)))
    scrollToTop()
  }

  newDiv.classList.add('pattern-item')
  newDiv.classList.add('ripple')

  const newDivCanvas = document.createElement('div')
  newDivCanvas.id = canvasId

  const newDivTitle = document.createElement('p')
  newDivTitle.innerHTML = name.toUpperCase()

  newDiv.appendChild(newDivCanvas)
  newDiv.appendChild(newDivTitle)
  patternGallery.appendChild(newDiv)

  new p5(temp)
})
