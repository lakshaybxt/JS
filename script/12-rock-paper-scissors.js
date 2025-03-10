let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
}; 

// For Auto playing Game
let isAutoPlaying = false;
let interval;

function autoPlay() {
    if(!isAutoPlaying) {
        interval = setInterval(() => {
            const move = pickComputerMove();
            playGame(move);
        }, 1000);
        document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
        isAutoPlaying = true;
    } else {
        clearInterval(interval);
        isAutoPlaying = false;
        document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
    }
}

document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        playGame('Rock');
    });

document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        playGame('Paper');
    });

document.querySelector('.js-scissor-button')
    .addEventListener('click', () => {
        playGame('Scissors');
    });

document.querySelector('.js-reset-score-button')
    .addEventListener('click', () => {
        ShowResetConfirmation();
    });

document.querySelector('.js-auto-play-button')
    .addEventListener('click', () => {
        autoPlay();
    });

document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r') playGame('Rock');
    else if(event.key === 'p') playGame('Paper');
    else if(event.key === 's') playGame('Scissors');
    else if(event.key === 'Backspace') ShowResetConfirmation();
    else if(event.key === 'a') autoPlay();
    // console.log(event.key);
})

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
    // localStorage.setItem('score', JSON.stringify(score));
    localStorage.removeItem('score');
    score = {wins: 0, losses: 0, ties: 0};
    alert('Score reset to 0!');
    updateScoreDisplay('', '', '');
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

function ShowResetConfirmation() {
    document.querySelector('.js-reset-confirmation')
    .innerHTML = `
        Are you sure you want to reset the score?
        <button class="js-reset-confirmation-yes confirmation-button">Yes</button>
        <button class="js-reset-confirmation-no confirmation-button">No</button>
    `;
    document.querySelector('.js-reset-confirmation-yes')
        .addEventListener('click', () => {
            resetGame();
            HideesetConfirmation();
        });
    document.querySelector('.js-reset-confirmation-no')
        .addEventListener('click', () => {
            HideesetConfirmation();
        });
}

function HideesetConfirmation() {
    document.querySelector('.js-reset-confirmation')
        .innerHTML = '';
}
