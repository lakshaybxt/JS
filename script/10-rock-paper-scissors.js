let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
}; 

function updateScoreDisplay(result, move, computerMove) {
    document.querySelector('.js-score').innerHTML = `
        Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}
    `;
    document.querySelector('.js-result').innerHTML = `
        ${result}
    `;
    document.querySelector('.js-moves').innerHTML = `You <img src="images/${move}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon"> Computer`;
}

function resetGame(){
    if(confirm('Do You want to clear the score?')) {
        // localStorage.setItem('score', JSON.stringify(score));
        localStorage.removeItem('score');
        score = {wins: 0, losses: 0, ties: 0};
        alert('Score reset to 0!');
        updateScoreDisplay('', '', '');
    }
}

updateScoreDisplay('', '', '');

function pickComputerMove() {
    let randomNumber = Math.random();

    if(randomNumber < 1/3) return 'Rock';
    else if(randomNumber < 2/3) return 'Paper';
    else return 'Scissors';
}

function playGame(move) {
    const computerMove = pickComputerMove();
    let result;

    if(move === computerMove) {
        result = "It's a Tie!";
        score.ties += 1;
    } else if((move === 'Rock' && computerMove === 'Scissors') ||
             (move === 'Paper' && computerMove === 'Rock') ||
             (move === 'Scissors' && computerMove === 'Paper')
    ) {
        result = "You Won!! 🎉";
        score.wins += 1;
    } else {
        result = "You Lose!! 😢";
        score.losses += 1;
    }
    //Saving to local Storage
    localStorage.setItem('score', JSON.stringify(score));
    
    updateScoreDisplay(result, move, computerMove);

// 			alert(`You picked ${move}. Computer picked ${computerMove}. ${result}
// Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
}