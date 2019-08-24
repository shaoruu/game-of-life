function GameOfLife(sketch) {
  this.brushTypeIndex = 0
  this.sketch = sketch
  this.grid = new BaseGrid(sketch)

  this.getGridData = () => this.grid.data
  this.setGridData = data => (this.grid.data = data)
}

GameOfLife.prototype.init = function() {
  this.grid.setRandom()
}

GameOfLife.prototype.draw = function() {
  this.grid.draw()
}

GameOfLife.prototype.paint = function() {
  let i = Math.floor(this.sketch.mouseX / WIDTH)
  let j = Math.floor(this.sketch.mouseY / WIDTH)

  if (i < 0 || i >= this.grid.getColumns() || (j < 0 && j >= this.grid.getRows())) return

  if (this.sketch.mouseIsPressed) {
    const BRUSH_DATA = BRUSH_SHAPE.data

    BRUSH_DATA.forEach(({ x, y }) => {
      try {
        const mi = i + x,
          mj = j + y
        if (!this.grid.data[mi] || this.grid.data[mi][mj] === 1) return
        this.grid.data[mi][mj] = 1
      } catch (e) {
        console.log(e)
        return
      }
    })
  } else {
    const BRUSH_DATA = BRUSH_SHAPE.data

    BRUSH_DATA.forEach(({ x, y }) => {
      try {
        const mi = i + x,
          mj = j + y
        if (!this.grid.data[mi] || this.grid.data[mi][mj] === 1) return
        this.sketch.push()
        this.sketch.fill('#6d7682')
        this.sketch.rect(mi * WIDTH, mj * WIDTH, WIDTH - 1, WIDTH - 1)
        this.sketch.pop()
      } catch (e) {
        console.log(e)
        return
      }
    })
  }
}

GameOfLife.prototype.generate = function() {
  const columns = this.grid.getColumns()
  const rows = this.grid.getRows()

  // Loop through every spot in our 2D array and check spots neighbors
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      // Add up all the states in a 3x3 surrounding grid
      let neighbors = 0
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          let mx = x + i
          let my = y + j

          if (mx < 0) mx = columns - 1
          else if (mx >= columns) mx = 0

          if (my < 0) my = rows - 1
          else if (my >= rows) my = 0

          neighbors += this.grid.data[mx][my]
        }
      }

      // A little trick to subtract the current cell's state since
      // we added it in the above loop
      neighbors -= this.grid.data[x][y]
      // Rules of Life
      if (this.grid.data[x][y] == 1 && neighbors < 2) this.grid.next[x][y] = 0
      // Loneliness
      else if (this.grid.data[x][y] == 1 && neighbors > 3) this.grid.next[x][y] = 0
      // Overpopulation
      else if (this.grid.data[x][y] == 0 && neighbors == 3) this.grid.next[x][y] = 1
      // Reproduction
      else this.grid.next[x][y] = this.grid.data[x][y] // Stasis
    }
  }

  // Swap!
  let temp = this.grid.data
  this.grid.data = this.grid.next
  this.grid.next = temp
}

GameOfLife.prototype.eraseAll = function() {
  this.grid.set(0)
}