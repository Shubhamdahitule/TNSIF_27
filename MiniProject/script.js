const players = [
    { element: document.getElementById('player1'), score: 0 },
    { element: document.getElementById('player2'), score: 0 },
    { element: document.getElementById('player3'), score: 0 }
];
const dice = document.querySelector('.dice');
const rollBtn = document.getElementById('roll');
const resetBtn = document.getElementById('reset');
const turnDisplay = document.querySelector('.turn');
const winnerDisplay = document.querySelector('.winner');

let currentPlayer = 0;
let gameOver = false;

rollBtn.addEventListener('click', () => {
    if (gameOver) return;
    
    rollBtn.disabled = true;
    
    let rolls = 0;
    const interval = setInterval(() => {
        const random = Math.floor(Math.random() * 6) + 1;
        dice.textContent = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'][random - 1];
        rolls++;
        
        if (rolls > 10) {
            clearInterval(interval);
            finishRoll(random);
        }
    }, 100);
});

resetBtn.addEventListener('click', resetGame);

function finishRoll(value) {
    players[currentPlayer].score = value;
    players[currentPlayer].element.querySelector('.score').textContent = value;
    
    if (currentPlayer === 2) {
        endGame();
    } else {
        nextPlayer();
        rollBtn.disabled = false;
    }
}

function nextPlayer() {
    players[currentPlayer].element.classList.remove('active');
    currentPlayer++;
    players[currentPlayer].element.classList.add('active');
    turnDisplay.textContent = `Player ${currentPlayer + 1}'s turn`;
}

function endGame() {
    gameOver = true;
    
    const scores = players.map(p => p.score);
    const maxScore = Math.max(...scores);
    const winners = players.filter(p => p.score === maxScore);
    
    if (winners.length === 1) {
        winnerDisplay.textContent = `Player ${players.indexOf(winners[0]) + 1} wins!`;
    } else {
        winnerDisplay.textContent = `Tie between ${winners.map(w => 'Player ' + (players.indexOf(w) + 1)).join(' & ')}!`;
    }
}

function resetGame() {
    players.forEach(player => {
        player.score = 0;
        player.element.querySelector('.score').textContent = '0';
        player.element.classList.remove('active');
    });
    
    currentPlayer = 0;
    gameOver = false;
    dice.textContent = '?';
    winnerDisplay.textContent = '';
    
    players[0].element.classList.add('active');
    turnDisplay.textContent = 'Player 1\'s turn';
    
    rollBtn.disabled = false;
}