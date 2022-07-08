import GameCore from './gameCore.js'
let game
window.onload = function () {
  init()
}
function init() {
  let scoreNum = document.querySelector('.score-num')
  game = new GameCore({ el: '#gameDiv' })
  game.addCallback(function (score) {
    scoreNum.textContent = score
  })
  keyAction(game) // 初始化键盘响应事件
  mouseAction(game)
  btnAction(game)
}

function mouseAction(game) {
  let buttons = document.querySelectorAll('.grid-container button')
  for (const button of buttons) {
    button.addEventListener('click', () => {
      game.control(button.id.split('-')[0])
    })
  }
}
/** 键盘响应事件 */
function keyAction(game) {
  document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0]
    if (e.keyCode == 37) {
      e.preventDefault()
      game.control('left')
      // document.querySelector('.left-btn').click();
    }
    if (e.keyCode == 38) {
      e.preventDefault()
      game.control('up')
    }
    if (e.keyCode == 39) {
      e.preventDefault()
      game.control('right')
    }
    if (e.keyCode == 40) {
      e.preventDefault()
      game.control('down')
    }
  }
}

function btnAction(game) {
  document.querySelector('.reset').addEventListener('click', e => {
    game.reset()
  })
}
