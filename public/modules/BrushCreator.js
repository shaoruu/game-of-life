function BrushCreator(sketch) {
  this.sketch = sketch
  this.grid = new BaseGrid(sketch, false)

  this.getBrushData = () => this.grid.data
  this.setBrushData = data => (this.grid.data = data)
}

BrushCreator.prototype.init = function() {
  this.grid.set(0)

  const midVal = Math.floor(this.grid.data.length / 2)
  this.grid.data[midVal][midVal] = 1
}

BrushCreator.prototype.draw = function() {
  this.grid.draw()
}

BrushCreator.prototype.paint = function() {
  let i = Math.floor(this.sketch.mouseX / WIDTH)
  let j = Math.floor(this.sketch.mouseY / WIDTH)

  if (i < 0 || i >= this.grid.getColumns() || (j < 0 && j >= this.grid.getRows())) return

  if (this.sketch.mouseIsPressed) {
    if (this.sketch.mouseButton === this.sketch.LEFT) this.grid.data[i][j] = 1
    else this.grid.data[i][j] = 0
  } else if (this.grid.data[i][j] !== 1) {
    this.sketch.push()
    this.sketch.fill('#6d7682')
    this.sketch.rect(i * WIDTH, j * WIDTH, WIDTH - 1, WIDTH - 1)
    this.sketch.pop()
  }
}

BrushCreator.prototype.updateBrush = function() {
  BRUSH_SHAPE.data = []
  const offset = Math.floor(this.grid.getColumns() / 2)

  for (let i = -offset; i <= offset; i++) {
    for (let j = -offset; j <= offset; j++)
      if (this.grid.data[i + offset][j + offset] === 1)
        BRUSH_SHAPE.data.push({ x: i, y: j })
  }
}

BrushCreator.prototype.getBrushShape = function() {
  console.log(this.grid.data)
  return this.grid.data
}
