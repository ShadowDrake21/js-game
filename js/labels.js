export class Labels {
  constructor(game) {
    this.game = game
    this.fontsize = 32
    this.fontfamily = 'Helvetica'
  }
  draw(context) {
    context.save()
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.shadowColor = 'white'
    context.shadowBlur = 0
    context.font = this.fontsize + 'px ' + this.fontfamily
    context.textAlign = 'left'
    context.fillStyle = this.game.textColor
    // for score
    context.fillText('Score: ' + this.game.score, 20, 40)

    // for timer
    context.font = this.fontsize * 0.7 + 'px ' + this.fontfamily
    context.fillText('Timer: ' + (this.game.time * 0.001).toFixed(1), 20, 80)
    context.restore()
  }
}
