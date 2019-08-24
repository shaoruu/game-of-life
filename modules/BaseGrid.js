function BaseGrid(sketch, needNext = true) {
  // Calculate columns and rows
  const columns = Math.floor(sketch.width / WIDTH)
  const rows = Math.floor(sketch.height / WIDTH)

  // Wacky way to make a 2D array is JS
  this.data = new Array(columns)
  for (let i = 0; i < columns; i++) {
    this.data[i] = new Array(rows)
  }

  // Going to use multiple 2D arrays and swap them
  if (needNext) {
    this.next = new Array(columns)
    for (i = 0; i < columns; i++) {
      this.next[i] = new Array(rows)
    }
  }

  this.sketch = sketch

  this.getColumns = () => columns
  this.getRows = () => rows
}

BaseGrid.prototype.set = function(arg) {
  const columns = this.getColumns()
  const rows = this.getRows()

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      this.data[i][j] = typeof arg === 'number' ? arg : arg()
      if (this.next) this.next[i][j] = 0
    }
  }
}

BaseGrid.prototype.setRandom = function() {
  this.set(() => Number(Math.floor(this.sketch.random(4)) >= 3))
}

BaseGrid.prototype.draw = function() {
  for (let i = 0; i < this.getColumns(); i++) {
    for (let j = 0; j < this.getRows(); j++) {
      if (this.data[i][j] === 1) this.sketch.fill('#00adb5')
      else this.sketch.fill('#393e46')
      this.sketch.stroke('#252525')
      this.sketch.rect(i * WIDTH, j * WIDTH, WIDTH - 1, WIDTH - 1)
    }
  }
}
