let currentPlayer = 'X' // Declare variable to track current player (it starts with player X)
let board = ['', '', '', '', '', '', '', '', ''] // Represents the 3x3 grid

// An array of all the winning combinations of tic-tac-toe (will use for comparison later)
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

// Add a click event listener to each button
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', handleClick)
})

function handleClick(event) {
  const index = event.target.id // Use the button's ID to map to board index

  // Prevent overwriting a cell
  if (board[index] !== '') return

  // Set the current player's move in board and the DOM
  board[index] = currentPlayer 
  event.target.textContent = currentPlayer

  // Check for win condition
  if (checkWin()) {
    setTimeout(() => {
      alert(`${currentPlayer} wins!`)
      resetGame()
    }, 100)
    return
  }

  // Check for draw condition
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

// Check if current player has a winning combination based on the winningCombo array
function checkWin() {
  // Check if there are any winning combo matches in the array of arrays (winningCombos)
  return winningCombos.some(combo => {
    // Return true if all 3 spots in the combo are filled with the current player's symbol (X or O)
    return combo.every(index => board[index] === currentPlayer)
  })
}

// Reset the game by resetting the board, the DOM, and the current player to X
function resetGame() {
  board = ['', '', '', '', '', '', '', '', '']
  document.querySelectorAll('button').forEach(btn => btn.textContent = '')
  currentPlayer = 'X'
}
