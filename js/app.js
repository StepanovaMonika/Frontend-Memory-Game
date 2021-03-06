let deck = document.querySelector('.deck'); // Board that holds all the cards
// List of all cards
let cardArray = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'];

let restart1 = document.querySelector('.restart1');
let restart2 = document.querySelector('.restart2');
let listOfOpenCards = ['',''];
// Moves counting variables
let moves = document.querySelector('.moves');
let counter = 0; // Number of moves
let openPairs = 0; // Number of open card pairs
// Winning score variables
let stars = document.querySelector('.stars');
let winScreen = document.querySelector('.winscreen');
let winStars = document.getElementById('winstars');
let winMoves = document.getElementById('winmoves');

// Elapsed time variables
let time = document.querySelector('.time');
let winTime = document.getElementById('wintime');

// Elapsed time variables
let seconds = 0
let minutes = 0
let t;
let timerIsOff = true;

// This function starts the gameboard
restartFunction();

/* Restart Buttons */
restart1.addEventListener('click', restartFunction);
restart2.addEventListener('click', restartFunction);


/* Functions */

/* Time Functions */
function startTimeFunction(){
	if (timerIsOff === true) {
		timer();
		timerIsOff = false;
	}
}

function stopTimeFunction(){
	clearTimeout(t);
	timerIsOff = true;
}

function restartTimeFunction(){
	clearTimeout(t);
	time.textContent = '00:00';
	seconds = 0;
	minutes = 0;
	timerIsOff = true;
}

//Add fuction from https://jsfiddle.net/Daniel_Hug/pvk6p
function add() {
    seconds++;
    if (seconds >= 60) {
         seconds = 0;
         minutes++;
    } 
    time.textContent = (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' + (seconds > 9 ? seconds : '0' + seconds);
    winTime.textContent = 'Time: ' + (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' + (seconds > 9 ? seconds : '0' + seconds);
    // time.textContent = seconds;
    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/* Preparing the game - shuffle the array,
*  place the cards on the board,
*  restart the variables,
*  hide the winning screen
*/
function restartFunction() {
	shuffle(cardArray);
	placeCards();
	listOfOpenCards = ['',''];
	moves.textContent = '0';
	counter = 0;
	openPairs = 0;
	stars.textContent = '★ ★ ★';
	winScreen.style.display = 'none';
	restartTimeFunction();
}

/* Delete the cards from the deck,
*  build the game card elements using LI, I
*  Adding the class to the elements
*/
function placeCards() {
	deck.innerHTML = '';

	for(let i = 0; i < cardArray.length; i++){
		let card = document.createElement('LI');
	 	let cardI = document.createElement('I');
	 	card.appendChild(cardI);
	 	card.classList.add('card');
	 	card.addEventListener('click', displayCard);
	 	cardI.classList.add('fa');
	 	cardI.classList.add(cardArray[i]);
	   	deck.appendChild(card);
	}
}

// Choosing cards
function displayCard() {
	startTimeFunction();

	if (this.classList.contains('open')) {
	} else {
		this.classList.add('open');
		let currentOpenCard = this;
		
		if (listOfOpenCards[0] == '') {
			listOfOpenCards[0] = currentOpenCard;
		} else if (listOfOpenCards[1] == '') {
			listOfOpenCards[1] = currentOpenCard;	
			match();
			listOfOpenCards = ['',''];
		}	
	}
}

// Check if the cards match
function match() {
	if (listOfOpenCards[0].querySelector('I').classList.value == listOfOpenCards[1].querySelector('I').classList.value) {
		let currentCards = deck.getElementsByClassName('open');
		currentCards[1].classList.add('match');
		currentCards[1].classList.remove('open');
		currentCards[0].classList.add('match');
		currentCards[0].classList.remove('open');
		currentCards = '';
		moveCounter();
		isEnd();
	} else {
		let currentCards = deck.getElementsByClassName('open');

		setTimeout(function(){
			currentCards[1].classList.remove('open');
			currentCards[0].classList.remove('open');
		}, 300);
		moveCounter();		
	}
}

// Add 1 move to the counter, remove stars
function moveCounter() {
	counter += 1;
	moves.textContent = counter;
	if (counter > 20) {
		stars.textContent = '★ ☆ ☆';
	} else if (counter > 15) {
		stars.textContent = '★ ★ ☆';
	}
}

// Check the number of matched pairs, fire winning screen
function isEnd() {
	openPairs += 1;
	if (openPairs == 8) {
		winScreen.style.display = 'block';
		stopTimeFunction()
		winStars.textContent = 'Stars: ' + stars.textContent;
		winMoves.textContent = 'Moves: '+ counter;
	}
}

