function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints
  let halfAngle = angle / 2.0
  beginShape()
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2
    let sy = y + sin(a) * radius2
    vertex(sx, sy)
    sx = x + cos(a + halfAngle) * radius1
    sy = y + sin(a + halfAngle) * radius1
    vertex(sx, sy)
  }
  endShape(CLOSE)
}

function radiansToDegrees(radians) {
  var pi = Math.PI
  return radians * (180 / pi)
}

function downloadObjectAsJson(exportObj, exportName) {
  var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj))
  var downloadAnchorNode = document.createElement('a')
  downloadAnchorNode.setAttribute('href', dataStr)
  downloadAnchorNode.setAttribute('download', exportName + '.json')
  document.body.appendChild(downloadAnchorNode) // required for firefox
  downloadAnchorNode.click()
  downloadAnchorNode.remove()
}

function normalizeCoords(x, y, r, c) {
  const returnX = x < 0 ? c + x : x >= c ? x - c : x
  const returnY = y < 0 ? r + y : y >= r ? y - r : y
  return { x: returnX, y: returnY }
}
