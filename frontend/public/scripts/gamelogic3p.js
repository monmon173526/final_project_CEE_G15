const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    transparent: true,
    parent: 'game-container3',
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
    gameOver: false,
    turnCountX: 0, // Counter for player x's turns
    turnCountO: 0, // Counter for player o's turns
    turnCountRec: 0 // Counter for player rec's turns
};

function preload() {
    this.load.image('board', 'assets/4x4.png');
    this.load.image('x', 'assets/X.png');
    this.load.image('o', 'assets/O.png');
    this.load.image('rec', 'assets/Rec.png')
    this.load.image('greyX', 'assets/X2.png');
    this.load.image('greyO', 'assets/O2.png');
    this.load.image('greyRec', 'assets/Rec2.png');
}

// function create() {
//     const boardImage = this.add.image(400, 400, 'board'); 
//     boardImage.setScale(0.37);

//     const hitArea = new Phaser.Geom.Rectangle(100, 100, 600, 600); 

//     this.input.on('pointerdown', function (pointer) {
//         if (!gameState.gameOver && hitArea.contains(pointer.x, pointer.y)) {
//             let row = Math.floor((pointer.y - 100) / 200); 
//             let col = Math.floor((pointer.x - 100) / 200); 
//             let index = row * 4 + col; 

//             if (gameState.board[index] === '') {
//                 gameState.board[index] = gameState.currentPlayer;
//                 placeImage(this, col * 200 + 200, row * 200 + 200, gameState.currentPlayer); 

//                 if (gameState.currentPlayer === 'x') {
//                     gameState.xPos.push(index);
//                 } else if (gameState.currentPlayer === 'o') {
//                     gameState.oPos.push(index);
//                 } else {
//                     gameState.recPos.push(index); 
//                 }

//                 updateTurnCount();
//                 checkWinner(this);
//                 switchPlayer();
//             }
//         }
//     }, this);
// }

// function create() {
//     const boardImage = this.add.image(400, 300, 'board'); 
//     boardImage.setScale(0.37);

//     const hitArea = new Phaser.Geom.Rectangle(50, 50, 800, 800); 

//     this.input.on('pointerdown', function (pointer) {
//         if (!gameState.gameOver && hitArea.contains(pointer.x, pointer.y)) {
//             let row = Math.floor(pointer.y / 212.5);
//             let col = Math.floor(pointer.x / 212.5);
//             let index = row * 4 + col;
    
//             if (gameState.board[index] === '') {
//                 gameState.board[index] = gameState.currentPlayer;
//                 placeImage(this, col * 212.5 + 100, row * 212.5 + 100, gameState.currentPlayer)
    
//                 if (gameState.currentPlayer == 'x') {
//                     gameState.xPos.push(index);
//                 } else {
//                     gameState.oPos.push(index);
//                 }
    
//                 updateTurnCount();
//                 checkWinner(this);
//                 switchPlayer();
    
//                 console.log(index);
//             }
//         }
//     }, this);
// }

function create() {
    const boardImage = this.add.image(400, 350, 'board'); 
    boardImage.setScale(0.37);

    const hitArea = new Phaser.Geom.Rectangle(50, 50, 600, 600); // Adjusted the hit area

    this.input.on('pointerdown', function (pointer) {
        if (!gameState.gameOver && hitArea.contains(pointer.x, pointer.y)) {
            let row = Math.floor((pointer.y - 50) / 154); // Adjusted the row calculation
            let col = Math.floor((pointer.x - 50) / 154); // Adjusted the column calculation
            let index = row * 4 + col;

            if (gameState.board[index] === '') {
                gameState.board[index] = gameState.currentPlayer;
                placeImage(this, col * 154 + 100, row * 154 + 100, gameState.currentPlayer); // Adjusted the symbol placement

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

                console.log(index);
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
}

const winningPatterns = [
    [0, 1, 2], [1, 2, 3], [2, 3, 4],
    [5, 6, 7], [6, 7, 8], [7, 8, 9],
    [10, 11, 12], [11, 12, 13], [12, 13, 14],
    [15, 16, 17], [16, 17, 18], [17, 18, 19],
    [0, 5, 10], [1, 6, 11], [2, 7, 12], [3, 8, 13], [4, 9, 14],
    [0, 6, 12], [1, 7, 13], [2, 8, 14], [3, 9, 15],
    [5, 10, 15], [6, 11, 16], [7, 12, 17], [8, 13, 18], [9, 14, 19],
    [10, 15, 20], [11, 16, 21], [12, 17, 22], [13, 18, 23],
    [15, 20, 25], [16, 21, 26], [17, 22, 27], [18, 23, 28],
    [20, 25, 30], [21, 26, 31], [22, 27, 32], [23, 28, 33]
];

function checkWinner(scene) {
    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if (gameState.board[a] && gameState.board[a] === gameState.board[b] && gameState.board[a] === gameState.board[c]) {
            gameState.gameOver = true;

            const winningMessage = `${gameState.currentPlayer.toUpperCase()} wins!`;
            const winMessageDiv = document.getElementById('win-message');
            winMessageDiv.textContent = winningMessage;
            winMessageDiv.style.display = 'block'; // Show the win message
            
            // Show the input field and submit button only when a player wins
            const winnerInputContainer = document.getElementById('winner-input-container');
            winnerInputContainer.style.display = 'block';

            const winnerNameInput = document.getElementById('winnerNameInput');
            const submitWinnerNameBtn = document.getElementById('submitWinnerNameBtn');

        // Event listener for the submit button
            submitWinnerNameBtn.addEventListener('click', () => {
            const winnerName = winnerNameInput.value.trim(); // Get the entered winner's name
            if (winnerName !== '') {
                // Process the winner's name (you can send it to a server, store in localStorage, etc.)
                alert(`Thank you, ${winnerName}, for playing!`);
                // You can hide the input field and button if needed
                winnerInputContainer.style.display = 'none';
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


function placeImage(scene, x, y, key) {
    const image = scene.add.image(x, y, key).setScale(0.175);
    gameState.placedImages.push(image); 
}

function removeImage(index) {
    let indexToRemove = -1;
    indexToRemove = index;
    if (indexToRemove !== -1) {
        let imageToRemove = gameState.placedImages.find(image => image.x === (indexToRemove % 4) * 212.5 + 100 && image.y === Math.floor(indexToRemove / 4) * 212.5 + 100);
        imageToRemove.destroy();
        gameState.placedImages = gameState.placedImages.filter(image => image !== imageToRemove); 
    }
}

function greyOutImage(index, removepic) {
    let imageToChange = gameState.placedImages.find(image => image.x === (indexToRemove % 4) * 212.5 + 100 && image.y === Math.floor(indexToRemove / 4) * 212.5 + 100);
    imageToChange.setTexture(removepic);
}