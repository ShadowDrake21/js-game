class Enemy {
  constructor() {
    this.frameX = 0
    this.frameY = 0
    this.fps = 20
    this.frameInterval = 1000 / this.fps
    this.frameTimer = 0
    this.deletionMark = false
  }
  update(deltaTime) {
    if (this.x + this.width < 0) {
      this.deletionMark = true
    }
    // movement functionality
    this.x -= this.speedX + this.game.speed
    this.y += this.speedY
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0
      if (this.frameX < this.maxFrame) {
        this.frameX++
      } else {
        this.frameX = 0
      }
    } else {
      this.frameTimer += deltaTime
    }
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}
export class Digger extends Enemy {
  constructor(game) {
    super()
    this.game = game
    this.width = 146.125
    this.height = 100
    this.x = this.game.width
    this.y = this.game.height - this.height - this.game.groundHeight
    this.speedX = 0
    this.speedY = 0
    this.image = document.getElementById('digger')
    this.maxFrame = 7
    this.type = 'Digger'
  }
}

export class Hand extends Enemy {
  constructor(game) {
    super()
    this.game = game
    this.width = 55.75
    this.height = 80
    this.x = this.game.width
    this.y = this.game.height - this.height - this.game.groundHeight
    this.speedX = 0
    this.speedY = 0
    this.image = document.getElementById('hand')
    this.maxFrame = 7
    this.type = 'Hand'
  }
}

export class Raven extends Enemy {
  constructor(game) {
    super()
    this.game = game
    this.width = 111.83
    this.height = 80
    this.x = this.game.width + Math.random() * this.game.width * 1.4
    this.y = Math.random() * this.game.height * 0.4
    this.speedX = Math.random() + 2
    this.speedY = 0
    this.image = document.getElementById('raven')
    this.maxFrame = 5
    this.angle = 0
    this.va = Math.random() * 0.1 + 0.1
    this.type = 'Raven'
  }
  update(deltaTime) {
    super.update(deltaTime)
    this.angle += this.va
    this.y += Math.cos(this.angle)
  }
}

export class Zombie extends Enemy {
  constructor(game) {
    super()
    this.game = game
    this.width = 292
    this.height = 410
    this.x = this.game.width
    this.y = this.game.height - this.height - this.game.groundHeight
    this.speedX = 1
    this.speedY = 0
    this.image = document.getElementById('zombie')
    this.maxFrame = 7
    this.type = 'Zombie'
  }
}
