/*************---------------
  PROCEDURAL TIC TAC TOE GAME
----------------*************/
let currentPlayer = 'X'
let board = ['', '', '', '', '', '', '', '', '']
const winningCombos = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal top-left to bottom-right
  [2, 4, 6]  // diagonal top-right to bottom-left
];

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', handleClick)
})

function handleClick(event) {
  const index = event.target.id

  // Prevent clicking the same cell twice
  if (board[index] !== '') return

  board[index] = currentPlayer
  event.target.textContent = currentPlayer

  if (checkWin()) {
    setTimeout(() => {
      alert(`${currentPlayer} wins!`)
      resetGame()
    }, 100)
    return
  }

  if (board.every(cell => cell !== '')) {
    setTimeout(() => {
      alert("It's a draw!")
      resetGame()
    }, 100)
    return
  }

  // Switch player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
}

function checkWin() {
  return winningCombos.some(combo => {
    return combo.every(index => board[index] === currentPlayer)
  })
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', '']
  document.querySelectorAll('button').forEach(btn => btn.textContent = '')
  currentPlayer = 'X'
}
