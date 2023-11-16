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

    context.shadowColor = 'black'
    context.shadowBlur = 0
    context.fillStyle = 'white'
    // for info
    context.font = this.fontsize * 0.5 + 'px ' + this.fontfamily
    context.fillText(
      'W - up, S - down, A - back, D - ahead, Enter - run',
      this.game.width - 400,
      40
    )
    context.fillText(
      'Q - Hit 1, R - Hit 2, Z - Hit 3',
      this.game.width - 240,
      80
    )

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

    if (this.game.gameOver) {
      context.font = this.fontsize * 2.1 + 'px ' + this.fontfamily
      context.textAlign = 'center'
      if (this.game.score >= this.game.winScore) {
        context.fillText(
          'Congrats!',
          this.game.width * 0.5,
          this.game.height * 0.5 - 25
        )
        context.font = this.fontsize * 1.5 + 'px ' + this.fontfamily
        context.fillText(
          'Can you do it again?!',
          this.game.width * 0.5,
          this.game.height * 0.5 + 40
        )
      } else {
        context.fillText(
          'Loser!',
          this.game.width * 0.5,
          this.game.height * 0.5 - 25
        )
        context.font = this.fontsize * 1.5 + 'px ' + this.fontfamily
        context.fillText(
          'Want a revanche? Try one more time!',
          this.game.width * 0.5,
          this.game.height * 0.5 + 40
        )
      }
    }
    context.restore()
  }
}
