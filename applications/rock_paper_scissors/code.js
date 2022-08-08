var hands = ["rock", "paper", "scissors"];
var upperHand = {"rock":"scissors", "scissors":"paper","paper":"rock"};
var myScore = 0;
var pcScore = 0;
var roundsPlayed = 0;
scoreLabel = document.querySelector('#scorelabel');


var rpsButtons = document.querySelectorAll('button');
for (var i = 0; i < rpsButtons.length; i++)
{
	rpsButtons[i].addEventListener('click', function() {
		playRound(this.id, computerPlay());
		checkReset();
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
		showHand(playerSelection, computerSelection);
		updateScore();
		scoreLabel.style.color = "red";
		console.log(`You lost that hand! ${computerSelection} beats ${playerSelection}`);
	} else if (upperHand[playerSelection] == computerSelection) {
		roundsPlayed++;
		myScore++;
		showHand(playerSelection, computerSelection);
		updateScore();
		scoreLabel.style.color = "green";
		console.log(`You Won that hand! ${playerSelection} beats ${computerSelection}`);
	} else {
		roundsPlayed++;
		showHand(playerSelection, computerSelection);
		updateScore();
		scoreLabel.style.color = "white";
		console.log("Tie");
	}
}

function showHand(playerSelection, computerSelection){
	myHand = document.querySelector('#myHand');
	myHand.textContent = playerSelection;
	pcHand = document.querySelector('#pcHand');
	pcHand.textContent = computerSelection;
	
}
function updateScore()
{
	myScoreElem = document.querySelector('#my-score');
	myScoreElem.textContent = myScore;
	pcScoreElem = document.querySelector('#pc-score');
	pcScoreElem.textContent = pcScore;
	
}

function checkReset() {
	if (roundsPlayed == 5)
	{
		alert(myScore > pcScore ? "You won the game!" : myScore < pcScore ? "You lost the game!" : "Tie!");
		roundsPlayed = 0;
		pcScore = 0;
		myScore = 0;
		updateScore();
		showHand("","");
		scoreLabel.style.color = "white";
	}

}




