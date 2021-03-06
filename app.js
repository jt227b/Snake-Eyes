/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

// Global Scope //
var scores, roundScore, activePlayer, gamePlaying;

init();



document.querySelector('.btn-roll').addEventListener('click', function () {

  if (gamePlaying) {

    // 1. Random Number
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the Results
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    // 3. Update the round score IF the rolled number was NOT a 1
    if (dice !== 1) {
      //Add score
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;

    } else {
      //NEXT PLAYER (using the ternary operator)
      nextPlayer();
    }
  }
});



document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {

    // 1. Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // 2. Update the UI User Interface
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // 3. Check if player won the game /////////////////////////////////////////////////////////////////////////  Change back to 100
    if (scores[activePlayer] >= 100) {
      document.querySelector('#name-' + activePlayer).textContent = "Winner!";
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      // Next Player
      nextPlayer();
    }
  }

});


// DON'T REPEAT YOUR CODE RULE (Dry Principle) - nextPlayer Function
function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // Toggle makes active player go back/forth during turns
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  //document.querySelector('.player-0-panel').classList.remove('active');   one way or adding and removing
  //document.querySelector('.player-1-panel').classList.add('active');      one way or adding and removing

  document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

// Initial Function
function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  // Math Object (math.floor rounds up the decimal)

  //Manipulates the current box on game using the DOM


  document.querySelector('.dice').style.display = 'none';

  // Sets counter from 19 85 to 0
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}