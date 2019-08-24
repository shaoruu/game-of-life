const importBtn = document.getElementById('get-file')
const importRoot = document.getElementById('my-file')
const downArrow = document.getElementById('down-arrow')
const upArrow = document.getElementById('up-arrow')
const toggleButton = document.getElementById('toggle-btn')

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

/* -------------------------------------------------------------------------- */
/*                                BOUNCY ARROWS                               */
/* -------------------------------------------------------------------------- */
const scroll = new SmoothScroll('div', {
  easing: 'easeInCubic',
  speed: 400,
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
