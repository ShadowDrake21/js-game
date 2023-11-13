class Layer {
  constructor(game, width, height, image, speedCoef) {
    this.game = game
    this.width = width
    this.height = height
    this.x = 0
    this.y = 0
    this.image = image
    this.speedCoef = speedCoef
  }
  update() {
    if (this.x < -this.width) this.x = 0
    else {
      console.log(this.game.speed)
      this.x -= this.game.speed * this.speedCoef
    }
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height)
    context.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    )
  }
}

export class Background {
  constructor(game) {
    this.game = game
    this.width = 1667
    this.height = 500
    this.imageLayer1 = layer1
    this.imageLayer2 = layer2
    this.imageLayer3 = layer3
    this.imageLayer4 = layer4
    this.layer1 = new Layer(
      this.game,
      this.width,
      this.height,
      this.imageLayer1,
      0
    )
    this.layer2 = new Layer(
      this.game,
      this.width,
      this.height,
      this.imageLayer2,
      0.4
    )
    this.layer3 = new Layer(
      this.game,
      this.width,
      this.height,
      this.imageLayer3,
      0.7
    )
    this.layer4 = new Layer(
      this.game,
      this.width,
      this.height,
      this.imageLayer4,
      1
    )
    this.bgLayers = [this.layer1, this.layer2, this.layer3, this.layer4]
  }
  update() {
    this.bgLayers.forEach((layer) => {
      layer.update()
    })
  }
  draw(context) {
    this.bgLayers.forEach((layer) => {
      layer.draw(context)
    })
  }
}
