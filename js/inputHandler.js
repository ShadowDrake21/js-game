export class InputHandler {
  constructor(game) {
    this.game = game
    this.pressedKeys = []
    window.addEventListener('keydown', (e) => {
      if (
        (e.keyCode === 87 ||
          e.keyCode === 65 ||
          e.keyCode === 68 ||
          e.keyCode === 83) &&
        !this.pressedKeys.includes(e.keyCode) // 68 -> D 87 -> W 65 -> A 83-> S
      ) {
        this.pressedKeys.push(e.keyCode)
      }
    })
    window.addEventListener('keyup', (e) => {
      if (
        e.keyCode === 87 ||
        e.keyCode === 65 ||
        e.keyCode === 68 ||
        e.keyCode === 83
      ) {
        this.pressedKeys.splice(this.pressedKeys.indexOf(e.keyCode), 1)
      }
    })
  }
}