// displayController
const displayController = (() => {

    const _displayArray = document.querySelectorAll(".game-cell");
    const _displayBoard = document.querySelector(".game-board");
    const _displayMenu = document.querySelector(".menu");

    function getDisplayArray(){
        return _displayArray;
    }

    function updateDisplay(boardArray) {
        for(let i = 0; i < _displayArray.length; i++) {
            console.log(_displayArray[i]);
            _displayArray[i].textContent = boardArray[i];
      }
    }

    function gameOverScreen(symbol) {
        const gameOverDiv = document.querySelector(".game-over");
        gameOverDiv.appendChild(document.createElement('h1'));    
        gameOverDiv.querySelector('h1').textContent = 'GAME OVER';
        gameOverDiv.appendChild(document.createElement('h2'));
        
        if (symbol === 'draw') {
            gameOverDiv.querySelector('h2').textContent = 'Draw!';
        } else {
            gameOverDiv.querySelector('h2').textContent = 'Player: ' + symbol + ' Wins!';

        }

        gameOverDiv.appendChild(document.createElement('button'));
        gameOverDiv.querySelector('button').textContent = 'PLAY AGAIN!';

        gameOverDiv.querySelector('button').addEventListener('click', () => window.location.reload());
    }

    function displayGame() {
        _displayMenu.style.display = 'none';
        _displayBoard.style.visibility = 'visible';
    }

    return {
        getDisplayArray: getDisplayArray,
        updateDisplay: updateDisplay,
        gameOverScreen: gameOverScreen,
        displayGame: displayGame
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
        if (_gameboardArray[index] !== '') {
            return 0;
        }
        _gameboardArray[index] = symbol;
        return 1;
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

    function _checkWin(gameBoard, player, boardChanged) {
        const S = player.getPlayerSymbol();

        const solutions = [ 
            gameBoard.slice(0,3), 
            gameBoard.slice(3,6),
            gameBoard.slice(6,9),
            [gameBoard[0], gameBoard[3], gameBoard[6]], 
            [gameBoard[1], gameBoard[4], gameBoard[7]], 
            [gameBoard[2], gameBoard[5], gameBoard[8]], 
            [gameBoard[0], gameBoard[4], gameBoard[8]], 
            [gameBoard[2], gameBoard[4], gameBoard[6]]
        ]

        for (const sol of solutions) {
            if (sol.toString() == [S, S, S].toString()){
                console.log(player.getPlayerSymbol() + " Win !");
                displayController.gameOverScreen(S);
                playRound = {};
                return;
            }
        }

        if (!gameBoard.includes('') === true) {
            displayController.gameOverScreen('draw');
            playRound = {};
        }
        
        if (boardChanged === 1) _changeCurrentPlayer();
        
    }


    function playRound(index) {  
        const checkBoardChange = gameBoard.add(index, _getCurrentPlayer().getPlayerSymbol());
        displayController.updateDisplay(gameBoard.getGameboardArray());
        _checkWin(gameBoard.getGameboardArray(), _getCurrentPlayer(), checkBoardChange);
    }

    function start(playerOne, playerTwo) {
        console.log(gameDisplay)
        displayController.displayGame();

        for (let i = 0; i < gameDisplay.length; i++) {
            gameDisplay[i].addEventListener('click', () => playRound(i));
        }
        

    }
    

    return {
        start: start
    }

})();

const gameMenu = (() => {

})();

const startGameButton = document.querySelector('button');
const playerOne = player('X');
const playerTwo = player('O');

startGameButton.addEventListener('click', () => mainGame.start(playerOne, playerTwo));


