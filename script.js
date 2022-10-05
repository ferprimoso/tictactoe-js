// displayController
const displayController = (() => {

    const _displayArray = document.querySelectorAll(".game-cell");

    function getDisplayArray(){
        return _displayArray;
    }

    function updateDisplay(boardArray) {
        for(let i = 0; i < _displayArray.length; i++) {
            console.log(_displayArray[i]);
            _displayArray[i].textContent = boardArray[i];
      }
    }

    return {
        getDisplayArray: getDisplayArray,
        updateDisplay: updateDisplay
    }

    
})();

//gameBoard
const gameBoard = (() => {

    const _gameboardArray = ['', '', '', '', '', '', '', '', ''];


    function getGameboardArray()  {
        return _gameboardArray;
    }
    

    function printGameboardArray()  {
        console.log(_gameboardArray.slice(0 , 3) + '\n' +  _gameboardArray.slice(3, 6) + '\n' + _gameboardArray.slice(6, 9));
    }
    
    function add(index, symbol) {
        _gameboardArray[index] = symbol;
    }
    

    return {
        getGameboardArray: getGameboardArray,
        printGameboardArray: printGameboardArray,
        add: add
    };

})();

//player

const player = (symbol) => {
    
    const getPlayerSymbol = () => {
        return symbol;
    }

    return {getPlayerSymbol};
} 

//main game
const mainGame = (() => {
    const gameEnd = false;
    const gameDisplay = displayController.getDisplayArray();
    let currentPlayer = 1;
    
    function _getCurrentPlayer() {
        if (currentPlayer === 1 ){
            return playerOne;
        } else {
            return playerTwo;
        }
    }

    function _changeCurrentPlayer() {
        currentPlayer === 1 ? currentPlayer = 2 : currentPlayer = 1;
    }

    function _checkWin(gameBoard, player) {
        const S = player.getPlayerSymbol();

        if(
            gameBoard.slice(0,3) ||
            gameBoard.slice(3,6) ||
            gameBoard.slice(6,9) ||
            [gameBoard[0], gameBoard[3], gameBoard[6]] ||
            [gameBoard[1], gameBoard[4], gameBoard[7]] ||
            [gameBoard[2], gameBoard[5], gameBoard[8]] ||
            [gameBoard[0], gameBoard[4], gameBoard[8]] ||
            [gameBoard[2], gameBoard[4], gameBoard[6]] === [S, S, S]
        ) {
            console.log(player.getPlayerSymbol() + " Win !");
        }
        
        _changeCurrentPlayer();
    }


    function playRound(index) {  
        gameBoard.add(index, _getCurrentPlayer().getPlayerSymbol());
        displayController.updateDisplay(gameBoard.getGameboardArray());
        _checkWin(gameBoard.getGameboardArray(), _getCurrentPlayer());
    }

    function start(playerOne, playerTwo) {
        console.log(gameDisplay)

        for (let i = 0; i < gameDisplay.length; i++) {
            gameDisplay[i].addEventListener('click', () => playRound(i));
        }
        

    }
    

    return {
        start: start
    }

})();


const playerOne = player('X');
const playerTwo = player('O');

mainGame.start(playerOne, playerTwo);



gameBoard.printGameboardArray();

