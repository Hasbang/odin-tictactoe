//game board module
const GameBoard = (() => {
    let board = Array(9).fill(null);

    const getBoard = () => board;

    const updateBoard = (index, value) => {
        if (index >= 0 && index < board.length && !board[index]) {
            board[index] = value;
        }
    };

    const resetBoard = () => {
        board = Array(9).fill(null);
    };
    return { getBoard, updateBoard, resetBoard };
})();

// player Factory function

const player = (name, marker) => {
    return { name, marker };
}

// game controller module

const GameController = (() => {
    let player1;
    let player2;
    let currentPlayer;
    let gameOver = false;

    const startGame = (name1, name2) => {
        player1 = player(name1, "X");
        player2 = player(name2, "O");
        currentPlayer = player1;
        gameOver = false;
        GameBoard.resetBoard();
        DisplayController.updateDisplay();
        DisplayController.displayResult("");

    };
    const playTurn = (index) => {
        if (gameOver || GameBoard.getBoard()[index]) return;
        GameBoard.updateBoard(index, currentPlayer.marker);
        if (checkWin(currentPlayer.marker)) {
            DisplayController.displayResult(`${currentPlayer.name} wins!`);
            gameOver = true;
           // disableCells();

        }
        else if (checktie()) {
            DisplayController.displayResult("It's a tie!")
            gameOver = true;
           // disableCells();
        }
        else {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        }
        DisplayController.updateDisplay();
    };

    //const disableCells = () => {
        //cells.forEach(cell => cell.style.pointerEvents = 'none');
    //};

    const checkWin = (marker) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];
        return winningCombinations.some(combination => {
            return combination.every(index => GameBoard.getBoard()[index] === marker)
        });

    };

    const checktie = () => {
        return GameBoard.getBoard().every(cell => cell !== null)
    };

    return { startGame, playTurn};

})();

// Display Controller Module 

const DisplayController = (() => {
    const cells = document.querySelectorAll('.cell');
  
    const restartButton = document.querySelector('#restart');
    const startButton = document.querySelector('#start-game');
    const resultDisplay = document.querySelector('#result-display');

    const updateDisplay = () => {
        const board = GameBoard.getBoard();
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    };

    const displayResult = (result) => {
        resultDisplay.textContent = result;
    }

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            GameController.playTurn(index);
        });
    });

    const enableCells = () => {
        cells.forEach(cell => cell.style.pointerEvents = 'auto');
    };

    startButton.addEventListener('click', () => {
        enableCells();
        const player1Name = document.querySelector('#player1-name').value || "Player 1";
        const player2Name = document.querySelector('#player2-name').value || "Player 2";

        GameController.startGame(player1Name, player2Name)


    });

    restartButton.addEventListener('click', () => {
        const player1Name = document.querySelector('#player1-name').value || "player 1";
        const player2Name = document.querySelector('#player2-name').value || "player 2";

        GameController.startGame("player 1", "player 2");
    })


    document.addEventListener('DOMContentLoaded', updateDisplay);

    return { updateDisplay , displayResult};



})();

