 // define array of words to choose from:
 var words= ["LABRADOR", "SCHNAUZER", "CHIHUAHUA", "PITBULL", "POODLE", "ROTTWEILER", "DOBERMANN", "MALTESE", "POMERANIAN"]
 //some GLOBAL variables to use throughout game
    var maxGuess = 8; // maxiumum number of guesses allowed 
    var lettersGuessed = []; // empty array to store letters guessed 
    var wordArray = []; // empty array to store the "_ " and to be used to replace the word answer
    var guessRemain = 0; // number of guesses remaining
    var wins = 0; 
    var losses = 0; 
    var gameOver = false; // when true, game can start again
    var randomWord; // the word that is being played

// function starts and restarts after game is finished, regardless of win or lose
function setup() {
//start with a random word to guess
    randomWord = words[Math.floor(Math.random() * words.length)];

    wordArray = [];
//show the random word in "_ _ _"s
    for (var i = 0; i < randomWord.length; i++) {
        wordArray[i] = "_ ";
    }

    guessRemain = maxGuess;
    lettersGuessed = [];

    updateScreen();

    
};

//show the score and other HTML changes needed
function updateScreen() {
    document.getElementById("winCount").innerText = wins;
    document.getElementById("lossCount").innerText = losses;
    document.getElementById("guessCount").innerText = guessRemain;
    document.getElementById("wordPicked").innerText = wordArray.join("");
    document.getElementById("lettersGuessed").innerText = lettersGuessed;

};

//need a function to respond to the key thats pressed
function checkGuess(letter) {
//if letter is not in lettersGuessed array then push the letter to the array
    if (lettersGuessed.indexOf(letter) === -1) {
        lettersGuessed.push(letter);
//if the letter isn't in the answer word then -1 the guessRemain
        if (randomWord.indexOf(letter) === -1) {
            guessRemain--;
//if letter is in answer then replace the positioned "_" with the letter
        } else { 
            for (var i = 0; i < randomWord.length; i++) {
                if (letter === randomWord[i]) {
                    wordArray[i] = letter;
                } 
            }                
        }
    }

}; 

// if player guesses right, they win
function isWinner() {
    //if there are no more "_" in the wordArray then +1 to Wins and switch gameOver to true
    if (wordArray.indexOf("_ ") === -1) {
        wins++;
        gameOver = true;
        
            
    }
};
//if they run out of guesses they lose.
function isLoser() {
    //set gameOver to true to reset game
    if(guessRemain <= 0) {
        losses++;
        gameOver = true;
    }

};


//event listener for key pressed
document.onkeyup = function(event) {
//if gameover is false then keep guessing
      if (gameOver) {
        setup();
        gameOver = false;
    } else {
//functions are only executed when a-z are pressed on keyboard

        if(event.keyCode >= 65 && event.keyCode <= 90) {
            checkGuess(event.key.toUpperCase()); 
            updateScreen();
            isWinner();
            isLoser();
        }
    }
    //maybe add an alert or something to pop up "you win!" or "you lose!" 
    //then restart the game...
};


setup();
updateScreen();
console.log(randomWord)

