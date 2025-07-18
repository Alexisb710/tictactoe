class TicTacToe{
  constructor(){
    // Initialize the board state (empty for all cells) and current player
    this.board = Array(9).fill('')
    this.currentPlayer = 'X'

    // Update the DOM to show current player's turn (Defaulted to X in this case)
    document.querySelector('#player').textContent = `Player ${this.currentPlayer}'s turn`

    // Track scoreboard
    this.scoreboard = {
      X: 0,
      O: 0,
      draw: 0,
    }

    // Define an array of all the winning combinations of tic-tac-toe
    this.winningCombos =  [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // middle column
      [2, 5, 8], // right column
      [0, 4, 8], // diagonal top-left to bottom-right
      [2, 4, 6]  // diagonal top-right to bottom-left
    ]

    // Instantlly run the method to set up event listeners for the board
    this.initBoard()
  }

  // Add click event listeners to each button
  initBoard(){
    // Target all buttons inside the section with class of grid.
    document.querySelectorAll('.grid button').forEach((button, index) => {
      // Add event listener to each button to run the makeMove method when clicked
      button.addEventListener('click', () => this.makeMove(button, index))
    })
  }

  // Main logic for player making a move
  makeMove(button, index){
    // If cell is already filled then ignore
    if(this.board[index] !== '') return
    
    // Update the board and the DOM (the button)
    this.board[index] = this.currentPlayer
    button.textContent = this.currentPlayer

    // Check for won
    if(this.checkWin()){
      this.scoreboard[this.currentPlayer]++
      this.updateScoreboard()
      setTimeout(() => {
        alert(`${this.currentPlayer} wins!`)
        this.resetGame()
      }, 100)
      return
    } else if(this.board.every(cell => cell !== '')){ // check for draw
      this.scoreboard.draw++
      this.updateScoreboard()
      setTimeout(() => {
        alert("It's a draw :/")
        this.resetGame()
      }, 100)
    } else{
      // If no win or draw yet, then switch player turn
      this.switchPlayer()
    }
  }

  // Toggle between player's X and O
  switchPlayer(){
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
    document.querySelector('#player').textContent = `Player ${this.currentPlayer}'s turn`
  }

  // Check if current player has a winning combination based on the winningCombo array
  checkWin(){
    // Check if there are any winning combo matches in the array of arrays (winningCombos)
    return this.winningCombos.some(combo => {
      // Return true if all 3 spots in the combo are filled with the current player's symbol (X or O)
      return combo.every(index => this.board[index] === this.currentPlayer)
    })
  }

  // Clear board and reset player to X
  resetGame(){
    this.board.fill('')
    this.currentPlayer = 'X'
    // Showcase that reset in the DOM
    document.querySelector('#player').textContent = `Player ${this.currentPlayer}'s turn`
    document.querySelectorAll('.grid button').forEach(btn => btn.textContent = '')
  }
  // Update scoreboard display in DOM
  updateScoreboard(){
    document.querySelector('#x-score').textContent = this.scoreboard.X
    document.querySelector('#o-score').textContent = this.scoreboard.O
    document.querySelector('#draw-score').textContent = this.scoreboard.draw
  }
}

// Create a new game instance
const game = new TicTacToe()

// Add reset button to clear the scoreboard
document.querySelector('#reset-score').addEventListener('click', () => {
  game.scoreboard = {X: 0, O: 0, draw: 0}
  game.updateScoreboard()
})