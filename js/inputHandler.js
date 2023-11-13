export class InputHandler {
  constructor(game) {
    this.game = game
    this.pressedKeys = []
    window.addEventListener('keydown', (e) => {
      console.log(e.keyCode)
      if (
        (e.key === 87 ||
          e.keyCode === 65 ||
          e.keyCode === 68 ||
          e.keyCode === 83 ||
          e.keyCode === 13) &&
        this.pressedKeys.indexOf(e.keyCode) === -1 // 68 -> D 87 -> W 65 -> A 83-> S
      ) {
        this.pressedKeys.push(e.keyCode)
      }
    })
    window.addEventListener('keyup', (e) => {
      if (
        e.keyCode === 87 ||
        e.keyCode === 65 ||
        e.keyCode === 68 ||
        e.keyCode === 83 ||
        e.keyCode === 13
      ) {
        this.pressedKeys.splice(this.pressedKeys.indexOf(e.keyCode), 1)
      }
    })
  }
}
