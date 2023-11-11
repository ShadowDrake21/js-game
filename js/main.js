import { InputHandler } from './inputHandler.js'
import { Player } from './player.js'

window.addEventListener('load', function (e) {
  const canvas = this.document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = 1000
  canvas.height = 600

  class Game {
    constructor(width, height) {
      this.width = width
      this.height = height
      this.groundHeight = 70
      this.player = new Player(this)
      this.input = new InputHandler(this)
    }
    update() {
      this.player.update(this.input)
    }
    draw(context) {
      this.player.draw(context)
    }
  }

  const game = new Game(canvas.width, canvas.height)

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.update()
    game.draw(ctx)
    requestAnimationFrame(animate)
  }
  animate()
})
