// displayController
const displayController = (() => {

    const _displayArray = document.querySelectorAll(".game-cell");
    const _displayBoard = document.querySelector(".game-board");
    const _displayMenu = document.querySelector(".menu");
    const _currentTurnDiv = document.querySelector('.game-over');
    
    function getDisplayArray(){
        return _displayArray;
    }

    function updateDisplay(boardArray) {
        for(let i = 0; i < _displayArray.length; i++) {
            console.log(_displayArray[i]);
            _displayArray[i].textContent = boardArray[i];
      }
    }

    function gameOverScreen(player) {    
        
        if (player === 'draw') {
            _currentTurnDiv.appendChild(document.createElement('h2'));
            _currentTurnDiv.querySelector('h2').textContent = 'Draw!';
        } else {
            _currentTurnDiv.appendChild(document.createElement('h2'));
            _currentTurnDiv.querySelector('h2').textContent = 'Player: ' + player.getPlayerName() + ' Wins!';

        }

        _currentTurnDiv.appendChild(document.createElement('button'));
        _currentTurnDiv.querySelector('button').textContent = 'PLAY AGAIN!';

        _currentTurnDiv.querySelector('button').addEventListener('click', () => window.location.reload());
    }

    function displayCurrentTurn(player) {
        _currentTurnDiv.appendChild(document.createElement('h1'));
        _currentTurnDiv.querySelector('h1').textContent = player.getPlayerName() + ' Turn.';
        
    }
    function displayGame() {
        _displayMenu.style.display = 'none';
        _displayBoard.style.visibility = 'visible';
    }

    return {
        getDisplayArray: getDisplayArray,
        updateDisplay: updateDisplay,
        gameOverScreen: gameOverScreen,
        displayCurrentTurn: displayCurrentTurn,
        displayGame: displayGame
    }

    
})();

//gameBoard
const gameBoard = (() => {

    const _gameboardArray = ['', '', '', '', '', '', '', '', ''];

    function getGameboardArray()  {
        return _gameboardArray;
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
        add: add
    };

})();

//player

const player = (symbol, name) => {
    
    const getPlayerSymbol = () => {
        return symbol;
    }

    const getPlayerName = () => {
        return name;
    }

    return {getPlayerSymbol, getPlayerName};
} 

//main game
const mainGame = (() => {
    const gameDisplay = displayController.getDisplayArray();
    let playerOne = {};
    let playerTwo = {};
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
                displayController.gameOverScreen(player);
                _playRound = {};
                return;
            }
        }

        if (!gameBoard.includes('') === true) {
            displayController.gameOverScreen('draw');
            _playRound = {};
        }
        
        if (boardChanged === 1) _changeCurrentPlayer();
        
    }

    function _playRound(index) {  
        const checkBoardChange = gameBoard.add(index, _getCurrentPlayer().getPlayerSymbol());
        displayController.updateDisplay(gameBoard.getGameboardArray());
        _checkWin(gameBoard.getGameboardArray(), _getCurrentPlayer(), checkBoardChange);
        displayController.displayCurrentTurn(_getCurrentPlayer());
    }

    function start(pOne, pTwo) {
        playerOne = pOne;
        playerTwo = pTwo;
        console.log(gameDisplay)
        displayController.displayGame();
        displayController.displayCurrentTurn(_getCurrentPlayer());
        for (let i = 0; i < gameDisplay.length; i++) {
            gameDisplay[i].addEventListener('click', () => _playRound(i));
        }
        

    }
    
    return {
        start: start
    }

})();



// Start Game Form
const startGameButton = document.querySelector('form');
startGameButton.addEventListener('submit', function(event){
    let player1Name = document.querySelector('#p1name').value;
    let player1Symbol = document.querySelector('#symbol1').value;
    let player2Name = document.querySelector('#p2name').value;
    let player2Symbol = document.querySelector('#symbol2').value;

    const playerOne = player(player1Symbol, player1Name);
    const playerTwo = player(player2Symbol, player2Name);

    console.log(playerOne.getPlayerName());
    event.preventDefault();
    mainGame.start(playerOne, playerTwo);
} );


