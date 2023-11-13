import { Waiting, Walking, Running } from './statesForPlayer.js'

export class Player {
  constructor(game) {
    this.game = game
    this.width = 128
    this.height = 126
    this.x = 0
    this.y = this.game.height - this.height - this.game.groundHeight
    this.velocityY = 0
    this.weight = 1
    this.image = document.getElementById('player')
    this.frameX = 0
    this.frameY = 0
    this.maxFrame
    this.speed = 0
    this.maxSpeed = 5
    this.fpsNum = 15
    this.frameInterval = 1000 / this.fpsNum
    this.frameTimer = 0
    this.states = [
      new Waiting(this.game),
      new Walking(this.game),
      new Running(this.game),
    ]
    this.currentState = null
  }
  update(input, deltaTime) {
    this.currentState.handleInput(input)
    this.x += this.speed
    // horizontal movement
    if (input.includes(68)) {
      this.speed = this.maxSpeed
    } else if (input.includes(65)) {
      this.speed = -this.maxSpeed
    } else {
      this.speed = 0
    }
    // horizontal boundaries
    if (this.x < 0) this.x = 0
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width

    // vertical movement
    if (input.includes(87) && this.isOnGround()) {
      this.velocityY -= 27
    }
    this.y += this.velocityY
    if (!this.isOnGround()) {
      this.velocityY += this.weight
    } else {
      this.velocityY = 0
    }

    // vertical boundaries
    if (this.y > this.game.height - this.height - this.game.groundHeight) {
      this.y = this.game.height - this.height - this.game.groundHeight
    }

    // animation for sprite
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0
      if (this.frameX < this.maxFrame) this.frameX++
      else this.frameX = 0
    } else {
      this.frameTimer += deltaTime
    }
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
  isOnGround() {
    return this.y >= this.game.height - this.height - this.game.groundHeight
  }
  setState(state, speed) {
    this.currentState = this.states[state]
    this.game.speed = this.game.maxSpeed * speed
    this.currentState.enter()
  }
}
