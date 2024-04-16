let currentPlayer = 'X'; // Default player
let gameBoard = ['', '', '', '', '', '', '', '', ''];

function handleClick(index) {
    console.log(`Clicked on cell ${index}`);
    
    const clickedCell = document.querySelector(`.grid-item:nth-child(${index + 1})`);
    clickedCell.style.backgroundImage = `url('assets/Tri.png')`;
    clickedCell.style.backgroundSize = 'cover';
    console.log(currentPlayer)
}

document.querySelector('.grid-container').addEventListener('click', function(event) {
    if (event.target.classList.contains('grid-item')) {
        const index = Array.from(event.target.parentNode.children).indexOf(event.target);
        handleClick(index);
    }
});
