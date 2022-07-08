var hands = ["rock", "paper", "scissors"];
var myScore = 0;
var roundsPlayed = 0;
rpsbuttons = document.querySelectorAll("button");
for (button of rpsbuttons)
{
	button.addEventListener('click', function(button) {
		playRound(button, computerPlay());
	});
}


function computerPlay(){
	// returns a random hand
	return hands[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection) {
	// determines winner

	if (upperHand[computerSelection] == playerSelection) {
		roundsPlayed++;
		pcScore++;
		alert(`You Lose! ${computerSelection} beats ${playerSelection}`);
	} else if (upperHand[playerSelection] == computerSelection) {
		roundsPlayed++;
		myScore++;
		alert(`You Win! ${playerSelection} beats ${computerSelection}`);
	} else {
		roundsPlayed++;
		alert('Tie! LOL!!!!!!!!!');
	}

	if (roundsPlayed == 5)
	{
		alert(myScore > pcScore ? "You won the game!" : "You lost the game!");
		// roundsPlayed = 0;
		// pcScore = 0;
		// myScore = 0;
	}
}





