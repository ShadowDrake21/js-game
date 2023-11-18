import { AnimationOfCollision } from './animationOfCollision.js'
import {
  Waiting,
  Walking,
  Running,
  Jumping,
  Falling,
  Hit1,
  Hit2,
  Hit3,
  Dead,
} from './statesForPlayer.js'

export class Player {
  constructor(game) {
    this.game = game
    this.width = 128
    this.height = 130
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
      new Jumping(this.game),
      new Falling(this.game),
      new Hit1(this.game),
      new Hit2(this.game),
      new Hit3(this.game),
      new Dead(this.game),
    ]
    this.currentState = null
  }
  update(input, deltaTime) {
    this.isThereCollision()
    this.currentState.handleInput(input)
    this.x += this.speed
    // horizontal movement
    if (input.includes(68) && this.currentState !== this.states[0]) {
      this.speed = this.maxSpeed
    } else if (input.includes(65) && this.currentState !== this.states[0]) {
      this.speed = -this.maxSpeed
    } else {
      this.speed = 0
    }
    // horizontal boundaries
    if (this.x < 0) this.x = 0
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width

    // vertical movement
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
    context.strokeRect(
      this.x + 20,
      this.y + 20,
      this.width - 50,
      this.height - 10
    )
    if (
      this.currentState !== this.states[0] &&
      this.currentState !== this.states[1]
    ) {
      context.drawImage(
        this.image,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y + 10,
        this.width,
        this.height
      )
    } else {
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
  }
  isOnGround() {
    return this.y >= this.game.height - this.height - this.game.groundHeight
  }
  setState(state, speed) {
    this.currentState = this.states[state]

    this.game.speed = this.game.maxSpeed * speed
    this.currentState.enter()
  }
  isThereCollision() {
    this.game.enemies.forEach((enemy) => {
      if (
        enemy.x < this.x - 50 + this.width &&
        enemy.x + enemy.width > this.x + 20 &&
        enemy.y < this.y - 10 + this.height &&
        enemy.y + enemy.height > this.y + 20
      ) {
        enemy.deletionMark = true
        this.game.collisions.push(
          new AnimationOfCollision(
            this.game,
            enemy.x + enemy.width * 0.5,
            enemy.y + enemy.height * 0.5
          )
        )
        console.log(enemy.type === 'Raven')
        if (
          (this.currentState === this.states[3] && enemy.type === 'Raven') ||
          (this.currentState === this.states[4] &&
            (enemy.type === 'Hand' || enemy.type === 'Digger')) ||
          (this.currentState === this.states[5] && enemy.type !== 'Zombie') ||
          (this.currentState === this.states[6] && enemy.type !== 'Zombie') ||
          this.currentState === this.states[7]
        ) {
          if (enemy.type === 'Hand' || enemy.type === 'Digger') {
            this.game.score += 3
          } else if (enemy.type === 'Raven') {
            this.game.score += 5
          } else {
            this.game.score += 10
          }
        } else {
          this.setState(8, 0)
          if (enemy.type === 'Hand' || enemy.type === 'Digger') {
            this.game.score -= 3
          } else if (enemy.type === 'Raven') {
            this.game.score -= 5
          } else {
            this.game.score -= 10
          }
        }
      }
    })
  }
}
