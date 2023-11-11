export class Player {
  constructor(game) {
    this.game = game
    this.width = 100
    this.height = 100
    this.x = 0
    this.y = this.game.height - this.height - this.game.groundHeight
    this.velocityY = 0
    this.weight = 1
    this.speed = 0
    this.maxSpeed = 15
  }
  update(input) {
    this.x += this.speed
    // horizontal movement
    if (input.pressedKeys.includes(68)) {
      this.speed = this.maxSpeed
    } else if (input.pressedKeys.includes(65)) {
      this.speed = -this.maxSpeed
    } else {
      this.speed = 0
    }
    // horizontal boundaries
    if (this.x < 0) this.x = 0
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width

    // vertical movement
    if (input.pressedKeys.includes(87) && this.isOnGround()) {
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
  }
  draw(context) {
    context.fillStyle = 'black'
    context.fillRect(this.x, this.y, this.width, this.height)
  }
  isOnGround() {
    return this.y >= this.game.height - this.height - this.game.groundHeight
  }
}
