
const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const restartButton = document.querySelector('#restartButton');
const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
];

// this list of options would be the ones for me to keep track of the open/used 
// spaces 
let options = ["","","","","","","","",""];
// initialise player X turn from the start first
let currentPlayer = "X";
// initialise game is not runnning
let gameRunning = false;

initializeGame();



// 1. When game starts
function initializeGame(){
    // when i start the game , let game run
    gameRunning = true;
    //When i start the game , add event to each single cell to cellClicked
    cells.forEach(element => element.addEventListener('click',cellClicked));
    //When i start the game , add event to the restart button
    restartButton.addEventListener('click',restartGame);
    //When i start the game , current player X 's turn
    statusText.textContent = `${currentPlayer}'s turn!`;
}



// 2.Upon clicking each cell
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    // if game is not running or cell is filled dont do anything
    if(options[cellIndex] != "" || !gameRunning){
        return;
    }
    updateCell(this,cellIndex);
    checkWinner();
}



// 3.Update the cell
function updateCell(cell,index){
    // fill up the open space so that the other player could not over write the value
    options[index] = currentPlayer;
    // change the cell to the current player
    cell.textContent = currentPlayer;
}



// 4. Change player
function changePlayer(){
    // change the current player to different player from the current player
    if(currentPlayer == "X"){
        currentPlayer = "O";
    }else if(currentPlayer == "O"){
        currentPlayer = "X";
    }
    // change the status text 
    statusText.textContent = `${currentPlayer}'s turn!`;
}




// 5. Check the winner
function checkWinner(){
    //initialize roundWon to be false. if somebody wins then i will change it to true.
    let roundWon = false;
    // iterate throughout the winning combinations array to see if the current player has won the round or not
    for(let i=0; i< winningCombinations.length;i++){
        const cellA = options[winningCombinations[i][0]];
        const cellB = options[winningCombinations[i][1]];
        const cellC = options[winningCombinations[i][2]];
        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        // change text to reveal winner
        statusText.textContent = `${currentPlayer} has won!`;
        // game stops
        gameRunning = false;
    }else if(!options.includes("")){
        // in the event that all the spaces are filled and there are still no clear winner, reveal 
        // draw situation
        statusText.textContent = `Its a draw!`
        // game stops
        gameRunning = false;
    }else{
        changePlayer();
    }
}
//6.Reset the game
function restartGame(){
    // re- initialize to the start of the game
    currentPlayer = "X";
    options = ["","","","","","","","",""];
    statusText.textContent = `${currentPlayer}'s turn!`;
    cells.forEach(element => element.textContent ="");
    gameRunning = true;
}