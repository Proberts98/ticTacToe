alert("Player 1: X      player 2: Y");
let rounds = Number(prompt("Select the Number rounds", "3"));
let player1 = {
    placeHolder: "X",
    wins: 0,
    losses: 0,
    ties: 0,
    stats() {
    return `Player 1 Stats:
    rounds: ${round}/${rounds} 
    wins: ${this.wins}
    losses: ${this.losses}
    ties: ${this.ties}`},
};
let player2 = {
    placeHolder: "Y",
    wins: 0,
    losses: 0,
    ties: 0,
    stats() {
    return `Player 2 Stats:
    rounds: ${round}/${rounds}
    wins: ${this.wins}
    losses: ${this.losses}
    ties: ${this.ties}`},
};

let round = 1;
let players = [player1, player2];
let index = 0;
let symbolLength = 0;

let scoreBoard = document.querySelectorAll("#scoreBoard div");
let gameboard = document.querySelectorAll("#container div");
let winner = document.querySelector('#winner');

gameboard.forEach((block) => {
    block.addEventListener("mousedown", () => {
        block.textContent = players[index].placeHolder;
        symbolLength++;

        if ((`${players[index].placeHolder.repeat(3)}` == `${gameboard[0].textContent}${gameboard[1].textContent}${gameboard[2].textContent}`) || //check for winner
            (`${players[index].placeHolder.repeat(3)}` == `${gameboard[3].textContent}${gameboard[4].textContent}${gameboard[5].textContent}`) ||
            (`${players[index].placeHolder.repeat(3)}` == `${gameboard[6].textContent}${gameboard[7].textContent}${gameboard[8].textContent}`) ||
            (`${players[index].placeHolder.repeat(3)}` == `${gameboard[0].textContent}${gameboard[3].textContent}${gameboard[6].textContent}`) ||
            (`${players[index].placeHolder.repeat(3)}` == `${gameboard[1].textContent}${gameboard[4].textContent}${gameboard[7].textContent}`) ||
            (`${players[index].placeHolder.repeat(3)}` == `${gameboard[2].textContent}${gameboard[5].textContent}${gameboard[8].textContent}`) ||
            (`${players[index].placeHolder.repeat(3)}` == `${gameboard[0].textContent}${gameboard[4].textContent}${gameboard[8].textContent}`) ||
            (`${players[index].placeHolder.repeat(3)}` == `${gameboard[2].textContent}${gameboard[4].textContent}${gameboard[6].textContent}`))
        {
            winner.firstChild.textContent = `Player ${index+1} wins round!`
            winner.style["z-index"] = 1
            if (index==0)
            {
                players[0].wins++;
                players[1].losses++;
            }
            else
            {
                players[1].wins++;
                players[0].losses++;
            }
            symbolLength = 0;
            round++;

            gameboard.forEach((b) => {
                b.textContent = "";
            });
        } 
        

        else if (symbolLength == 9) // round is a tie
        {
            players[0].ties++;
            players[1].ties++;
            winner.firstChild.textContent = "It's a Tie!";
            winner.style["z-index"] = 1;
            round++;
            symbolLength = 0;
            gameboard.forEach((b) => {
                b.textContent = "";
            });

            symbolLength = 0;
        }      

        if (round == rounds + 1) //game is over
        {
            round--;
            if (players[0].wins == players[1].wins) //game is over and is a tie
            {
                winner.firstChild.textContent = "It's a tie! No one wins!";
                winner.style["z-index"] = 1;
            }
            else //game is over and is not a tie
            {
                winner.firstChild.textContent = (players[0].wins > players[1].wins) ? "Player 1 Wins game!" : "Player 2 wins game!";
                winner.style["z-index"] = 1;
            }

            symbolLength = 0;       //refresh gameboard
            gameboard.forEach((b) => {
                b.textContent = "";
            });
        }

        scoreBoard[0].textContent = `  ${players[0].stats()}`;
        scoreBoard[1].textContent = `  ${players[1].stats()}`;

        index = (index == 0) ? 1 : 0;
    });
});

winner.addEventListener('mousedown', () => {
    winner.style["z-index"] = -1;
});