import { Background } from './background.js'
import { Digger, Hand, Raven } from './enemies.js'
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
      this.maxSpeed = 3
      this.player = new Player(this)
      this.input = new InputHandler(this)
      this.background = new Background(this)
      this.time = 0
      this.maxTime = 10000
      this.gameOver = false
      this.enemies = []
      this.enemyTimer = 0
      this.enemyInterval = 1500
      this.player.currentState = this.player.states[0]
      this.player.currentState.enter()
    }
    update(deltaTime) {
      this.time += deltaTime
      if (this.time > this.maxTime) {
        // this.gameOver = true
      }
      this.background.update()
      this.player.update(this.input.pressedKeys, deltaTime)

      // enemies hanler
      if (this.enemyTimer > this.enemyInterval) {
        this.enemyAddition()
        this.enemyTimer = 0
      } else {
        this.enemyTimer += deltaTime
      }
      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime)
      })
      this.enemies = this.enemies.filter((enemy) => !enemy.deletionMark)
      console.log(this.player.currentState)
    }
    draw(context) {
      this.background.draw(context)
      this.player.draw(context)
      this.enemies.forEach((enemy) => {
        enemy.draw(context)
      })
    }
    enemyAddition() {
      if (this.speed > 2 && Math.random() < 0.6) {
        this.enemies.push(new Digger(this))
      } else if (this.speed > 2 && Math.random() > 0.5) {
        this.enemies.push(new Hand(this))
      }
      if (Math.random() > 0.6) this.enemies.push(new Raven(this))
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
    if (!game.gameOver) {
      requestAnimationFrame(animate)
    }
  }
  animate(0)
})
