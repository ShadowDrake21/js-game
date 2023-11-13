export class InputHandler {
  constructor(game) {
    this.game = game
    this.pressedKeys = []
    window.addEventListener('keydown', (e) => {
      console.log(e.keyCode)
      if (
        (e.keyCode === 87 ||
          e.keyCode === 65 ||
          e.keyCode === 68 ||
          e.keyCode === 83 ||
          e.keyCode === 13 ||
          e.keyCode === 81 ||
          e.keyCode === 82 ||
          e.keyCode === 90) &&
        this.pressedKeys.indexOf(e.keyCode) === -1 // 68 -> D 87 -> W 65 -> A 83-> S 81 -> R 82 -> Q 90 -> Z 13 -> Enter
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
        e.keyCode === 13 ||
        e.keyCode === 81 ||
        e.keyCode === 82 ||
        e.keyCode === 90
      ) {
        this.pressedKeys.splice(this.pressedKeys.indexOf(e.keyCode), 1)
      }
    })
  }
}
