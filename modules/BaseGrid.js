function BaseGrid(sketch, needNext = true, width = WIDTH) {
  // Calculate columns and rows
  const columns = Math.floor(sketch.width / width)
  const rows = Math.floor(sketch.height / width)

  this.getRows = () => rows
  this.getColumns = () => columns
  this.getWidth = () => width

  // Wacky way to make a 2D array is JS
  this.data = new Array(columns)
  for (let i = 0; i < columns; i++) {
    this.data[i] = new Array(rows)
  }

  // Going to use multiple 2D arrays and swap them
  if (needNext) {
    this.initNext()
  }

  this.sketch = sketch
}

BaseGrid.prototype.refreshAs = function(arg) {
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
  this.refreshAs(() => Number(Math.floor(this.sketch.random(4)) >= 3))
}

BaseGrid.prototype.draw = function() {
  const width = this.getWidth()

  for (let i = 0; i < this.getColumns(); i++) {
    for (let j = 0; j < this.getRows(); j++) {
      if (this.get(i, j) === 1) this.sketch.fill('#00adb5')
      else this.sketch.fill('#393e46')
      this.sketch.stroke('#252525')
      this.sketch.rect(i * width, j * width, width - 1, width - 1)
    }
  }
}

BaseGrid.prototype.isRowExist = function(x) {
  return !!this.data[x]
}

BaseGrid.prototype.isCellExist = function(x, y) {
  const result = this.get(x, y)
  if (typeof result === 'number') return true
  return false
}

BaseGrid.prototype.get = function(x, y) {
  return this.data[x][y]
}

BaseGrid.prototype.getNext = function(x, y) {
  return this.next[x][y]
}

BaseGrid.prototype.set = function(x, y, val) {
  this.data[x][y] = val
}

BaseGrid.prototype.setNext = function(x, y, val) {
  this.next[x][y] = val
}

BaseGrid.prototype.initNext = function() {
  const rows = this.getRows()
  const columns = this.getColumns()

  this.next = new Array(columns)
  for (i = 0; i < columns; i++) {
    this.next[i] = new Array(rows)
  }
}
