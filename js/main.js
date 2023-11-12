import { Background } from './background.js'
import { InputHandler } from './inputHandler.js'
import { Player } from './player.js'

window.addEventListener('load', function (e) {
  const canvas = this.document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = 1000
  canvas.height = 500

  class Game {
    constructor(width, height) {
      this.width = width
      this.height = height
      this.groundHeight = 70
      this.speed = 0
      this.player = new Player(this)
      this.input = new InputHandler(this)
      this.background = new Background(this)
    }
    update(deltaTime) {
      this.background.update()
      this.player.update(this.input, deltaTime)
    }
    draw(context) {
      this.background.draw(context)
      this.player.draw(context)
    }
  }

  const game = new Game(canvas.width, canvas.height)
  let lastTime = 0

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.update(deltaTime)
    game.draw(ctx)
    requestAnimationFrame(animate)
  }
  animate(0)
})
