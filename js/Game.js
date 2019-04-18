/* jshint esversion: 6 */

class Game {
	
	constructor () {
		this.missed = 0;
		this.phrases = [
			'frozen stiff',
			'heart of gold',
			'pig out',
			'kindred spirit',
			'crack up',
		];
		this.activePhrase = null;
	}
	
	//sets up the iniiail game view
	startGame () {
		
		this.resetGame();
		
		document.querySelector('#overlay').style.display = 'none';//hides the overlay
				
		this.activePhrase = this.getRandomPhrase();//gets a new Phrase object
		this.activePhrase.addPhraseToDisplay();
		
	}
	
	resetGame () {
		
		//remove any existing LI elements
		const ul = document.querySelector('#phrase').firstElementChild;
		while (ul.firstElementChild === true) {
			ul.removeChild();
	   	}
		
		//resets the hearts back to full
		const hearts = document.querySelectorAll('.tries');
		for (let i = 0; i < hearts.length; i++) {
			hearts[i].firstElementChild.setAttribute('src', 'images/liveHeart.png');
		}
		
		//resets the keyboard
		const keys = document.querySelectorAll('.key');
		for (let x = 0; x < keys.length; x++) {
			keys[x].classList.remove('wrong');
			keys[x].classList.remove('chosen');
			keys[x].disabled = false;
		}
		
		//resets the missed score
		this.missed = 0;
		
	}
	
	//gets a random phrase to display
	getRandomPhrase () {
		const index = Math.floor(Math.random() * Math.floor(this.phrases.length));
		const newPhrase = new Phrase(this.phrases[index]);
		return newPhrase;
	}
	
	//gets triggered when a key button is pressed
	handleInteraction (event) {
		
//		this is used if a button on screen is pressed
		if (event.target.tagName === 'BUTTON' && event.target.classList.contains('key')) {
			
			const letter = event.target.textContent;
			//checks to see if the letter is in the phrase or not then determines what to do from there
			if (!this.activePhrase.checkLetter(letter)) {
				this.changeKeyBoard(letter, 'wrong');
				this.removeLife();
			} else {
				this.changeKeyBoard(letter, 'chosen');
				this.activePhrase.showMatchedLetter(letter);
				this.checkForWin();
			}
			
		}
		//this is used if a player presses a keyboard button
		if (event.type === 'keyup') {
			if (this.pressedKeyValid(event.key)) { //makes sure the key pressed was a valid key
				console.log(event.key);
				const letter = event.key;//sets the key pressed to a var
				if (!this.activePhrase.checkLetter(letter)) {
					this.changeKeyBoard(letter, 'wrong');
					this.removeLife();
				} else {
					
					this.changeKeyBoard(letter, 'chosen');
					this.activePhrase.showMatchedLetter(letter);
					this.checkForWin();
				}
			}
		}
		
	}
	
	//used to change the appearance of the on screen keyboard
	changeKeyBoard (letter, classToAdd) {
		const keys = document.querySelectorAll('.key');
		for (let i = 0; i < keys.length; i++) {
			if (keys[i].textContent === letter) {
				keys[i].disabled = true; //disables the button
				keys[i].classList.add(classToAdd); //adds the appropriate class 
				break; //breaks out of the loop onces it has found what it was looking for
			}
		}
	}
	
//	used to make sure the keyboard button pressed is a letter between [a-z]
	pressedKeyValid(key) {
		const regex = new RegExp(/[a-zA-Z]/);
		return regex.test(key);
	}
	
	//removes a life from you and changes the heart image to reflect
	removeLife () {
		const hearts = document.querySelectorAll('.tries'); //gathers all the hearts into an aray
		hearts[this.missed].firstElementChild.setAttribute('src', 'images/lostHeart.png');//changes the appropriate heart index 
		this.missed++;
		if (this.missed >= 5) {
			this.gameOver(false);
		}
	}
	
	checkForWin () {
		if (!document.querySelector('.hide')) {
			this.gameOver(true);
		}
	}
	
	//determines what to display on screen if you win or lose
	gameOver (win) {
		const overlay = document.querySelector('#overlay');
		const messageBlock = document.querySelector('#game-over-message');
		overlay.style.display = 'block';//displays the overlay over top of the game screen
		overlay.classList.remove('start');//removes the start class from the overlay
		
		//use the win as a condition it sets the settings of the overlay window to refelct if you one or lost
		if (win) {
			overlay.classList.add('win');
			messageBlock.textContent = 'Congradulations on your win!';
		} else {
			overlay.classList.add('lose');
			messageBlock.textContent = 'Sorry, you have lost.';
		}
		
	}
	
}