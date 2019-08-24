/* -------------------------------------------------------------------------- */
/*                              GAME BUTTON UTILS                             */
/* -------------------------------------------------------------------------- */
function toggleGame() {
  runGame = !runGame
  toggleButton.innerHTML = runGame ? 'Stop' : 'Start'
}

function clearGame() {
  game.eraseAll()
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

/* -------------------------------------------------------------------------- */
/*                             BOUNCY ARROW UTILS                             */
/* -------------------------------------------------------------------------- */
function hideDownArrow() {
  upArrow.style.opacity = 1
  upArrow.style.cursor = 'pointer'
  downArrow.style.opacity = 0
  downArrow.style.cursor = 'default'
}

function hideUpArrow() {
  downArrow.style.opacity = 1
  downArrow.style.cursor = 'pointer'
  upArrow.style.opacity = 0
  upArrow.style.cursor = 'default'
}

function preventDefaults(e) {
  e.preventDefault()
  e.stopPropagation()
}

function checkScroll() {
  const elementTarget = document.getElementById('landing')
  if (window.scrollY >= elementTarget.offsetTop + elementTarget.offsetHeight) hideDownArrow()
  else hideUpArrow()
}

function scrollToGallery() {
  scroll.animateScroll(document.getElementById('gallery-wrapper'))
}

function scrollToTop() {
  scroll.animateScroll(document.getElementById('landing'))
}
