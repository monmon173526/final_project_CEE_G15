import { createResult} from "./api.js";
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    transparent: true,
    parent: 'game-container3p',
    scene: {
        preload: preload,
        create: create
    }
};

const game = new Phaser.Game(config);
let gameState = {
    board: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''], //collect position of player (X and O)
    xPos: [],
    oPos: [],
    recPos: [],
    placedImages: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    currentPlayer: 'x',
    turnText: null,
    gameOver: false,
    turnCountX: 0, // Counter for player x's turns
    turnCountO: 0, // Counter for player o's turns
    turnCountRec: 0, // Counter for player rec's turns
    turnCountWinner: 0
};

function preload() {
    this.load.image('board', 'assets/4x4.png');
    this.load.image('x', 'assets/X.png');
    this.load.image('o', 'assets/O.png');
    this.load.image('rec', 'assets/Rec.png')
    this.load.image('greyX', 'assets/X3.png');
    this.load.image('greyO', 'assets/O3.png');
    this.load.image('greyRec', 'assets/Rec3.png');
}

function create() {
    const boardImage = this.add.image(400, 350, 'board'); 
    boardImage.setScale(0.4);

    gameState.turnTextElement = document.getElementById('turnText');

    // Initial text content
    if (gameState.currentPlayer === 'x') {
        gameState.turnTextElement.textContent = "Player \u2715 turn";
    } else if (gameState.currentPlayer === 'o') {
        gameState.turnTextElement.textContent = "Player \u25CB turn";
    } else if (gameState.currentPlayer === 'rec') {
        gameState.turnTextElement.textContent = "Player \u25A1 turn";
    }

    const hitArea = new Phaser.Geom.Rectangle(50, 50, 600, 600); 

    this.input.on('pointerdown', function (pointer) {
        if (!gameState.gameOver && hitArea.contains(pointer.x, pointer.y)) {
            let row = Math.floor((pointer.y - 50) / 160); 
            let col = Math.floor((pointer.x - 50) / 160); 
            let index = row * 4 + col;

            if (gameState.board[index] === '') {
                gameState.board[index] = gameState.currentPlayer;
                placeImage(this, col * 160 + 160, row * 160 + 110, gameState.currentPlayer); 

                if (gameState.currentPlayer == 'x') {
                    gameState.xPos.push(index);
                } else if (gameState.currentPlayer == 'o') {
                    gameState.oPos.push(index);
                } else {
                    gameState.recPos.push(index); 
                }

                updateTurnCount();
                checkWinner(this);
                switchPlayer();

                currentPlayerImage.setTexture(gameState.currentPlayer);
            }
        }
    }, this);
}



function switchPlayer() {
    if (gameState.currentPlayer === 'x') {
        gameState.currentPlayer = 'o';
    } else if (gameState.currentPlayer === 'o') {
        gameState.currentPlayer = 'rec';
    } else {
        gameState.currentPlayer = 'x';
    }
    if (gameState.currentPlayer === 'x') {
        gameState.turnTextElement.textContent = "Player \u2715 turn";
    } else if (gameState.currentPlayer === 'o') {
        gameState.turnTextElement.textContent = "Player \u25CB turn";
    } else if (gameState.currentPlayer === 'rec') {
        gameState.turnTextElement.textContent = "Player \u25A1 turn";
    }
}

const winningPatterns = [
    [0, 1, 2], [1, 2, 3],
    [4,5,6], [5, 6,7],
    [8,9,10], [9,10,11],
    [12,13,14], [13,14,15],
    [0, 4, 8], [4,8,12],
    [1,5,9], [5,9,13],
    [2,6,10], [6,10,14],
    [3,7,11], [7,11,15],
    [0,5,10], [5,10,15], [4,9,14], [1,6,11],
    [3,6,9], [6,9,12], [2,5,8], [7,10,13]
];

function checkWinner(scene) {
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
            } else if (gameState.currentPlayer === 'rec') {
                winningMessage = '\u25A1 wins!';
                gameState.turnCountWinner = gameState.turnCountRec;
            }
            const winMessageDiv = document.getElementById('win-message3p');
            winMessageDiv.textContent = winningMessage;
            winMessageDiv.style.display = 'block'; // Show the win message
            
            // Show the input field and submit button only when a player wins
            const winnerInputContainer = document.getElementById('winner-input-container3p');
            winnerInputContainer.style.display = 'block';

            const winnerNameInput = document.getElementById('winnerNameInput3p');
            const submitWinnerNameBtn = document.getElementById('submitWinnerNameBtn3p');

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
                    "board" : 3
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
    } else if (gameState.currentPlayer === 'o') {
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
    } else {
        gameState.turnCountRec++;
        if (gameState.turnCountRec > 2) {
            const oldestElem = gameState.recPos[0];
            greyOutImage(oldestElem, "greyRec");
            if (gameState.turnCountRec > 3) {
                const oldestElem = gameState.recPos.shift();
                gameState.board[oldestElem] = '';
                removeImage(oldestElem);
                const newOldestElem = gameState.recPos[0];
                greyOutImage(newOldestElem, "greyRec");
            }
        }
    }
    
    document.getElementById('turnCountX').textContent = gameState.turnCountX;
    document.getElementById('turnCountO').textContent = gameState.turnCountO;
    document.getElementById('turnCountRec').textContent = gameState.turnCountRec;
}

function updateTurnText() {
    const turnMessage = document.getElementById('turnMessage');
    turnMessage.textContent = `Turn: ${gameState.currentPlayer.toUpperCase()}`;
}



function placeImage(scene, x, y, key) {
    const image = scene.add.image(x, y, key).setScale(0.175);
    gameState.placedImages.push(image); 
}

function removeImage(index) {
    if (index >= 0 && index < gameState.board.length) {
        const imageToRemove = gameState.placedImages.find(image => image.x === (index % 4) * 160 + 160 && image.y === Math.floor(index / 4) * 160 + 110);
        if (imageToRemove) {
            imageToRemove.destroy();
            gameState.placedImages = gameState.placedImages.filter(image => image !== imageToRemove); 
        }
    }
}

function greyOutImage(index, removepic) {
    if (index >= 0 && index < gameState.board.length) {
        const imageToChange = gameState.placedImages.find(image => image.x === (index % 4) * 160 + 160 && image.y === Math.floor(index / 4) * 160 + 110);
        if (imageToChange) {
            imageToChange.setTexture(removepic);
        }
    }
}
