/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess;
var winningNumber = generateWinningNumber();
console.log(winningNumber);
var previousGuesses = [];
var guessCount = 0;


var $guessFeedback = $("<h4></h4>");
var $guessMessage = $("<h5></h5>");
var $hint = $("<h2></h2>");

//For when Player wins or loses
var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $caption = $("<h1></h1>");

//Add image to overlay
$overlay.append($image);
//Add caption to overlay
$overlay.append($caption);
//Add overlay
$("body").append($overlay);

function showWinnerOverlay() {
	$image.attr("src", "http://vignette2.wikia.nocookie.net/inanimateinsanity/images/1/17/TrophyIdle.png/revision/latest?cb=20130404083458");
	$caption.text("Congratulations! You Won!");
	$overlay.show();
}

function showLoserOverlay() {
	$image.attr("src", "http://1.bp.blogspot.com/-im2OrIOtADw/VSPxoN5L9gI/AAAAAAAADj4/aOmJQGzzrI0/s1600/Sad-Whiner-Emoji.png");
	$caption.text("Oh No. You Lost.");
	$overlay.show();
}

/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	// add code here
	return Math.floor(Math.random() * 100) + 1;
}

// Fetch the Players Guess

function playersGuessSubmission(){
	// add code here
	return $("#numberTF").val();
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	// add code here
	var str = "";

	if (playersGuess < winningNumber) {
		str = "lower"
	} else {
		str = "higher";
	}

	return str;
}

// Return an alert message to help out the player

function guessMessage() {
	var lowOrHighStr = lowerOrHigher();
	var difference = 0;
	var message = "";

	if (lowOrHighStr == "lower") {
		difference = winningNumber - playersGuess;
	} else {
		difference = playersGuess - winningNumber;
	}
	
	if (difference <= 5) {
		message = "Your guess is " + lowOrHighStr + " and within "
		+ 5 +" digits of the winning number.";
	} else if (difference <= 10) {
		message = "Your guess is " + lowOrHighStr + " and within "
		+ 10 +" digits of the winning number.";
	} else if (difference <= 20) {
		message = "Your guess is " + lowOrHighStr + " and within "
		+ 20 +" digits of the winning number.";
	} else {
		message = "Your guess is " + lowOrHighStr + " and is more than "
		+ 20 +" digits away from the winning number.";
	}
	
	return message;
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	// add code here
	if (playersGuess == winningNumber) {
		//Player Won!
		$guessFeedback.text("That's the correct number!");
		//Show overlay for winners
		showWinnerOverlay();
	} else if (previousGuesses.indexOf(playersGuess) > -1) {
		//Duplicate guess
		$guessFeedback.text("You have previously guessed this number. Please guess again with a new number");
	} else {
		//Incorrect guess
		previousGuesses.push(playersGuess);
		//Check how many guesses left
		guessCount = 5 - previousGuesses.length;
		if (guessCount == 0) {
			//If out of guesses, disable hint button
			//And provide message to Player that game is over
			$("#hintBtn").prop("disabled",true);
			$guessFeedback.text("That is incorrect. Sorry, you are out of guesses. Play again if you would like.");
			//Show overlay for losers
			showLoserOverlay();
		} else {
			//Else alert Player with a message providing 
			//helpful info about their guess
			$guessFeedback.text("That is incorrect. You have " + (5-previousGuesses.length) + " guesses remaining.");
			$guessMessage.text(guessMessage());
		}
	}

	$($guessFeedback).insertBefore($("#extraButtonsContainer"));
	//Only show guessMessage when incorrect guess and game is not over
	if ($guessMessage.text().length > 0) {
		$($guessMessage).insertBefore($("#extraButtonsContainer"));
	};
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
	var num1 = 0;
	var num2 = 0;

	//Generate 2 new random numbers
	//But first make sure they do not equal the winning number
	do {
		num1 = Math.floor(Math.random() * 100) + 1;
	} while (num1 == winningNumber);

	do {
		num2 = Math.floor(Math.random() * 100) + 1;
	} while (num2 == winningNumber);

	//Add 2 random numbers and winningNumber to array
	var numbers = [winningNumber, num1, num2];
	//Create new array with shuffled array of numbers
	var shuffledNumbers = shuffleArray(numbers);

	return "Hint: " + shuffledNumbers[0] + ", " +  shuffledNumbers[1] + ", " +
		shuffledNumbers[2];
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
	winningNumber = generateWinningNumber();
}


/* **** Event Listeners/Handlers ****  */
$("#submitBtn").click(function() {
	playersGuess = playersGuessSubmission();
	$("#numberTF").val("");
	$guessMessage.text("");
	$guessMessage.remove();
	checkGuess();
});

$("#hintBtn").click(function() {
	$hint.text(provideHint());
	$("#game").append($hint);
});

$("#playAgainBtn").click(function() {
	//Remove elements added to DOM with jquery
	$guessFeedback.remove();
	$guessMessage.remove();
	$hint.remove();
	
	previousGuesses = [];
	guessCount = 0;
	playAgain();
});


$("#numberTF").keypress(function(e) {
	if (e.which == 13) {
		$("#submitBtn").click();
	}
});

// When overlay is clicked
$overlay.click(function() {
  // Hide the overlay
  $overlay.hide()
});



