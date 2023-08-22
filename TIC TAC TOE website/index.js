const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetBtn');
let currentPlayer = 'X';
let gameOver = false;

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (!cell.textContent && !gameOver) {
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer);
            if (checkWin(currentPlayer)) {
                displayResult(`${currentPlayer} wins!`);
                gameOver = true;
            } else if (checkTie()) {
                displayResult("It's a tie!");
                gameOver = true;
            } else {
                currentPlayer = 'O';
                computerMove();
            }
        }
    });
});

resetButton.addEventListener('click', resetBoard);

function checkWin(player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return cells[a].textContent === player && cells[b].textContent === player && cells[c].textContent === player;
    });
}

function checkTie() {
    return [...cells].every(cell => cell.textContent !== '');
}

function displayResult(result) {
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result');
    resultDiv.textContent = result;
    document.body.appendChild(resultDiv);
}

function computerMove() {
    if (!gameOver) {
        const emptyCells = Array.from(cells).filter(cell => !cell.textContent);
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const chosenCell = emptyCells[randomIndex];
        
        if (chosenCell) {
            chosenCell.textContent = currentPlayer;
            chosenCell.classList.add(currentPlayer);
            if (checkWin(currentPlayer)) {
                displayResult(`${currentPlayer} wins!`);
                gameOver = true;
            } else if (checkTie()) {
                displayResult("It's a tie!");
                gameOver = true;
            }
            currentPlayer = 'X';
        }
    }
}

function resetBoard() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    currentPlayer = 'X';
    gameOver = false;
    const resultDiv = document.querySelector('.result');
    if (resultDiv) {
        resultDiv.remove();
    }
}
