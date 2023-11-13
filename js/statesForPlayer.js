const states = {
  WAITING: 0,
  WALKING: 1,
  RUNNING: 2,
  JUMPING: 3,
  HIT1: 4,
  HIT2: 5,
  HIT3: 6,
  DEAD: 7,
}

class State {
  constructor(game, state) {
    this.game = game
    this.state = state
  }
}

export class Waiting extends State {
  constructor(game) {
    super(game, 'WAITING')
  }
  enter() {
    this.game.player.frameX = 0
    this.game.player.maxFrame = 5
    this.game.player.frameY = 0
  }
  handleInput(input) {
    if (input.includes(68) || input.includes(65)) {
      this.game.player.setState(states.WALKING, 2)
    }
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
    console.log(input)
    if (input.includes(83)) {
      this.game.player.setState(states.WAITING, 0)
    }
  }
}
