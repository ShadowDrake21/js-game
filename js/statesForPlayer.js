const states = {
  WAITING: 0,
  WALKING: 1,
  RUNNING: 2,
  JUMPING: 3,
  FALLING: 4,
  HIT1: 5,
  HIT2: 6,
  HIT3: 7,
  DEAD: 8,
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
    if (input.includes(83)) {
      this.game.player.setState(states.WAITING, 0)
    } else if (input.includes(13)) {
      this.game.player.setState(states.RUNNING, 3)
    }
  }
}

export class Running extends State {
  constructor(game) {
    super(game, 'RUNNING')
  }
  enter() {
    this.game.player.frameX = 0
    this.game.player.maxFrame = 7
    this.game.player.frameY = 2
  }
  handleInput(input) {
    if (input.includes(83)) {
      this.game.player.setState(states.WAITING, 0)
    } else if (!input.includes(13)) {
      this.game.player.setState(states.WALKING, 2)
    } else if (
      input.includes(87) ||
      (input.includes(87) && input.includes(68))
    ) {
      this.game.player.setState(states.JUMPING, 3)
    }
  }
}

export class Jumping extends State {
  constructor(game) {
    super(game, 'JUMPING')
  }
  enter() {
    if (this.game.player.isOnGround()) {
      this.game.player.velocityY -= 27
    }
    this.game.player.frameX = 0
    this.game.player.maxFrame = 5
    this.game.player.frameY = 3
  }
  handleInput(input) {
    if (this.game.player.velocityY > this.game.player.weight) {
      this.game.player.setState(states.FALLING, 3)
    }
  }
}

export class Falling extends State {
  constructor(game) {
    super(game, 'FALLING')
  }
  enter() {
    this.game.player.frameX = 5
    this.game.player.maxFrame = 11
    this.game.player.frameY = 3
  }
  handleInput(input) {
    if (this.game.player.isOnGround()) {
      this.game.player.setState(states.RUNNING, 3)
    }
  }
}
