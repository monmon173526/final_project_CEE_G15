import { createResult} from "./api.js";
const config = {
    type: Phaser.AUTO,
    width: 650,
    height: 650,
    transparent: true,
    parent: 'game-container2p',
    scene: {
        preload: preload,
        create: create
    }
};



const game = new Phaser.Game(config);
let gameState = {
    board: ['', '', '', '', '', '', '', '', ''], //collect position of player (X and O)
    xPos: [],
    oPos: [],
    placedImages: ['', '', '', '', '', '', '', '', ''],
    currentPlayer: 'x',
    gameOver: false,
    turnCountX: 0, // Counter for player x's turns
    turnCountO: 0,  // Counter for player o's turns
    turnCountWinner: 0
};

function preload() {
    this.load.image('board', 'assets/3x3.png');
    this.load.image('x', 'assets/X.png');
    this.load.image('o', 'assets/O.png');
    this.load.image('greyX', 'assets/X2.png');
    this.load.image('greyO', 'assets/O2.png');
}

function create() {
    const boardImage = this.add.image(300, 300, 'board');
    boardImage.setScale(0.37);

    gameState.turnTextElement = document.getElementById('turnText');

    // Initial text content
    if (gameState.currentPlayer === 'x') {
        gameState.turnTextElement.textContent = "Player \u2715 turn";
    } else if (gameState.currentPlayer === 'o') {
        gameState.turnTextElement.textContent = "Player \u25CB turn";
    }
    
    const hitArea = new Phaser.Geom.Rectangle(0, 0, 600, 600);

    this.input.on('pointerdown', function (pointer) {
        if (!gameState.gameOver && hitArea.contains(pointer.x, pointer.y)) {
            let row = Math.floor(pointer.y / 200);
            let col = Math.floor(pointer.x / 200);
            let index = row * 3 + col;

            if (gameState.board[index] === '') {
                gameState.board[index] = gameState.currentPlayer;
                placeImage(this, col * 200 + 100, row * 200 + 100, gameState.currentPlayer)

                if (gameState.currentPlayer == 'x') {
                    gameState.xPos.push(index);
                } else {
                    gameState.oPos.push(index);
                }

                updateTurnCount();
                checkWinner(this);
                switchPlayer();
            }
        }
    }, this);
}

function switchPlayer() {
    if (gameState.currentPlayer === 'x') {
        gameState.currentPlayer = 'o';
    } else {
        gameState.currentPlayer = 'x';
    }
    if (gameState.currentPlayer === 'x') {
        gameState.turnTextElement.textContent = "Player \u2715 turn";
    } else if (gameState.currentPlayer === 'o') {
        gameState.turnTextElement.textContent = "Player \u25CB turn";
    }
}

function checkWinner(scene) {
    const winningPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if (gameState.board[a] && gameState.board[a] === gameState.board[b] && gameState.board[a] === gameState.board[c]) {
            gameState.gameOver = true;
            let winningMessage;
            if (gameState.currentPlayer === 'x') {
                winningMessage = '\u2715 wins!';
                gameState.turnCountWinner = gameState.turnCountX;
            } else if (gameState.currentPlayer === 'o') {
                winningMessage = '\u25CB wins!';
                gameState.turnCountWinner = gameState.turnCountO;
            }
            console.log('winner'+ gameState.turnCountWinner);

            const winMessageDiv = document.getElementById('win-message2p');
            winMessageDiv.textContent = winningMessage;
            winMessageDiv.style.display = 'block'; // Show the win message
            
            // Show the input field and submit button only when a player wins
            const winnerInputContainer = document.getElementById('winner-input-container2p');
            winnerInputContainer.style.display = 'block';

            const winnerNameInput = document.getElementById('winnerNameInput');
            const submitWinnerNameBtn = document.getElementById('submitWinnerNameBtn');

        // Event listener for the submit button
            submitWinnerNameBtn.addEventListener('click', () => {
            const winnerName = winnerNameInput.value.trim(); // Get the entered winner's name
            if (winnerName !== '') {
                // Process the winner's name (you can send it to a server, store in localStorage, etc.)
                
                alert(`Thank you, ${winnerName}, for playing!`);

                //go to leaderboard page
                window.location.href = "leaderboard.html";
                // You can hide the input field and button if needed

                
                winnerInputContainer.style.display = 'none';
                const result = {
                    "id" : 1,
                    "name" : winnerName,
                    "score" : gameState.turnCountWinner,
                    "board" : 2
                }
                createResult(result);
            } else {
                // If the input is empty, display an error message
                alert('Please enter the winner\'s name.');
            }
        });
            break;
        }
    }
}

function updateTurnCount() {
    if (gameState.currentPlayer === 'x') {
        gameState.turnCountX++;
        if (gameState.turnCountX > 2) {
            const oldestElem = gameState.xPos[0];
            greyOutImage(oldestElem, "greyX");
            if (gameState.turnCountX > 3) {
                const oldestElem = gameState.xPos.shift();
                gameState.board[oldestElem] = '';
                removeImage(oldestElem);
                const newOldestElem = gameState.xPos[0];
                greyOutImage(newOldestElem, "greyX");
            }
        }
    } else {
        gameState.turnCountO++;
        if (gameState.turnCountO > 2) {
            const oldestElem = gameState.oPos[0];
            greyOutImage(oldestElem, "greyO");
            if (gameState.turnCountO > 3) {
                const oldestElem = gameState.oPos.shift();
                gameState.board[oldestElem] = '';
                removeImage(oldestElem);
                const newOldestElem = gameState.oPos[0];
                greyOutImage(newOldestElem, "greyO");
            }
        }
    }
    
    document.getElementById('turnCountX').textContent = gameState.turnCountX;
    document.getElementById('turnCountO').textContent = gameState.turnCountO;
}

function updateTurnText() {
    const turnText = `Turn: ${gameState.currentPlayer.toUpperCase()}`;
    gameState.turnText.setText(turnText);
}

function placeImage(scene, x, y, key) {
    const image = scene.add.image(x, y, key).setScale(0.2);
    gameState.placedImages.push(image); 
}

function removeImage(index) {
    let indexToRemove = -1;
    if (gameState.currentPlayer === 'x') {
        indexToRemove = index;
    } else {
        indexToRemove = index;
    }
    if (indexToRemove !== -1) {
        let imageToRemove = gameState.placedImages.find(image => image.x === (indexToRemove % 3) * 200 + 100 && image.y === Math.floor(indexToRemove / 3) * 200 + 100);
        imageToRemove.destroy();
        gameState.placedImages = gameState.placedImages.filter(image => image !== imageToRemove); 
    }
}

function greyOutImage(index, removepic) {
    let imageToChange = gameState.placedImages.find(image => image.x === (index % 3) * 200 + 100 && image.y === Math.floor(index / 3) * 200 + 100);
    // Set texture to greyed-out version
    imageToChange.setTexture(removepic);
}