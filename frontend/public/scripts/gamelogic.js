const config = {
    type: Phaser.AUTO,
    width: 650,
    height: 650,
    transparent: true,
    parent: 'game-container',
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
    turnCountO: 0  // Counter for player o's turns
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

    this.input.on('pointerdown', function (pointer) {
        if (!gameState.gameOver) {
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
        if (gameState.turnCountX > 3) {
            const oldestElem = gameState.xPos.shift(); 
            gameState.board[oldestElem] = '';
            removeImage(oldestElem, "greyX",'x')
        }
    } else {
        gameState.turnCountO++;
        if (gameState.turnCountO > 3) {
                const oldestElem = gameState.oPos.shift();
                gameState.board[oldestElem] = '';
                removeImage(oldestElem, "greyO",'o')
            }
    }
    
    document.getElementById('turnCountX').textContent = gameState.turnCountX;
    document.getElementById('turnCountO').textContent = gameState.turnCountO;
}


function placeImage(scene, x, y, key) {
    const image = scene.add.image(x, y, key).setScale(0.2);
    gameState.placedImages.push(image); 
}

function removeImage(index, removepic) {
    let indexToRemove = -1;
    if (gameState.currentPlayer === 'x') {
        indexToRemove = index;
    } else {
        indexToRemove = index;
    }
    if (indexToRemove !== -1) {
        let imageToRemove = gameState.placedImages.find(image => image.x === (indexToRemove % 3) * 200 + 100 && image.y === Math.floor(indexToRemove / 3) * 200 + 100);

        // Set texture to greyed-out version
        imageToRemove.setTexture(removepic);
        imageToRemove.setAlpha(0.5); // Set transparency to make it greyed-out
        console.log(imageToRemove);

        setTimeout(() => {
            imageToRemove.destroy();
            gameState.placedImages = gameState.placedImages.filter(image => image !== imageToRemove);
            gameState.board[indexToRemove] = '';
        }, 1000); 
    }
}
