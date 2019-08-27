function BrushCreator(sketch) {
  this.sketch = sketch
  this.grid = new BaseGrid(sketch, false)

  this.getBrushData = () => this.grid.data
  this.setBrushData = data => (this.grid.data = data)
}

BrushCreator.prototype.init = function() {
  this.grid.refreshAs(0)

  const midVal = Math.floor(this.grid.data.length / 2)
  this.grid.set(midVal, midVal, 1)
}

BrushCreator.prototype.draw = function() {
  this.grid.draw()
}

BrushCreator.prototype.paint = function() {
  let i = Math.floor(this.sketch.mouseX / WIDTH)
  let j = Math.floor(this.sketch.mouseY / WIDTH)

  if (i < 0 || i >= this.grid.getColumns() || (j < 0 && j >= this.grid.getRows())) return

  if (this.sketch.mouseIsPressed) {
    if (!this.grid.isCellExist(i, j)) return

    const isLeft = this.sketch.mouseButton === this.sketch.LEFT
    const type = isLeft ? 1 : 0

    this.grid.set(i, j, type)
  } else if (this.grid.get(i, j) !== 1) {
    this.sketch.push()
    this.sketch.fill(EMPTY_HOVER_COLOR)
    this.sketch.rect(i * WIDTH, j * WIDTH, WIDTH - 1, WIDTH - 1)
    this.sketch.pop()
  }
}

BrushCreator.prototype.updateBrush = function() {
  BRUSH_SHAPE.data = []
  const offset = Math.floor(this.grid.getColumns() / 2)

  for (let i = -offset; i <= offset; i++) {
    for (let j = -offset; j <= offset; j++)
      if (this.grid.get(i + offset, j + offset)) BRUSH_SHAPE.data.push({ x: i, y: j })
  }
}
