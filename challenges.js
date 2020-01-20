/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- If dice is that is rolled lands on 6 twice, all points would be lost for the current active player 
- The first player to reach 100 points on GLOBAL score wins the game
*/

// Global Scope //
var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;


document.querySelector('.btn-roll').addEventListener('click', function () {

  if (gamePlaying) {

    // 1. Random Number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. Display the Results
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

    // 3. Update the round score IF the rolled number was NOT a 1
    if (dice1 !== 1 && dice2 !== 1) {
      //Add score
      roundScore += dice1 + dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;

    } else {
      //NEXT PLAYER (using the ternary operator)
      nextPlayer();
    }
    // // 3. Update the round score IF the rolled number was NOT a 1 && looses points if player rolls 6 points twice
    // if (dice === 6 && lastDice === 6) {
    //   // Player looses all score
    //   scores[activePlayer] = 0;
    //   // Update the UI User Interface
    //   document.querySelector('#score-' + activePlayer).textContent = '0';
    //   nextPlayer();

    // } else if (dice !== 1) {
    //   //Add score
    //   roundScore += dice;
    //   document.querySelector('#current-' + activePlayer).textContent = roundScore;

    // } else {
    //   //NEXT PLAYER (using the ternary operator)
    //   nextPlayer();
    // }

    // lastDice = dice;
  }
});



document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {

    // 1. Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // 2. Update the UI User Interface
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    var input = document.querySelector('.final-score').value;

    var winningScore = input;

    //Undefined, 0, null or "" are COERCED to false && Anything else would be true
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }


    // 3. Check if player won the game /////////////////////////////////////////////////////////////////////////  Change back to 100
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = "Winner!";
      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';
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

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
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


  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';

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