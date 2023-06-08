const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let gameCells = ['','','','','','','','',''];
let currentPlayer = 'X';
let running = false;


initGame();


function initGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("id");
    if(gameCells[cellIndex] != '' || !running ) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    gameCells[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let winRound = false;

    for (let i = 0; i < winningCombos.length; i++){
        const condition = winningCombos[i];
        const cellA = gameCells[condition[0]];
        const cellB = gameCells[condition[1]];
        const cellC = gameCells[condition[2]];

        if(cellA == '' || cellB == '' || cellC == '' ){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            winRound = true;
            break;
        }

    }

    if(winRound){
        statusText.textContent = `${currentPlayer} WINS!`;
        running = false;
    }
    else if(!gameCells.includes('')){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = 'X';
    gameCells = ['','','','','','','','',''];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
    running = true;
}

