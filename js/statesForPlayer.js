const states = {
  WALKING: 0,
  RUNNING: 1,
  JUMPING: 2,
  HIT1: 3,
  HIT2: 4,
  HIT3: 5,
  DEAD: 6,
}

class State {
  constructor(game, state) {
    this.game = game
    this.state = state
  }
}

export class Walking extends State {
  constructor(game) {
    super(game, 'WALKING')
  }
  enter() {
    this.game.player.frameX = 0
    this.game.player.maxFrame = 7
    this.game.player.frameY = 1
  }
  handleInput(input) {
    if (input.includes(68) || input.includes(65)) {
      this.game.player.setState(states.WALKING, 1)
    }
  }
}
