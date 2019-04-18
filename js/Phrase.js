/* jshint esversion:6 */

class Phrase {
	
	constructor (phrase) {
		this.phrase = phrase;
	}
	
	//this displays the randomly chosen phrase to the screen so that they cant see the letters
	addPhraseToDisplay () {
		let html = '';
		for (let i = 0; i < this.phrase.length; i++) {
			if (this.phrase[i] !== ' ') {
				html += `<li class="hide letter ${this.phrase[i]}">${this.phrase[i]}</li>`;//adds the html text for a letter
			} else {
				html += `<li class="space"></li>`; //adds the html text for a space
			}
		}
		document.querySelector('#phrase').firstElementChild.innerHTML = html;
	}
	
//	checks to see if the guess letter is correct
	checkLetter (letter) {
		const letters = document.querySelectorAll(`.${letter}`);
		if (letters.length !== 0) {
			return true;
		} else {
			return false;
		}
	}
	
//	shows the letters if they are guessed correctly
	showMatchedLetter (letter) {
		const letters = document.querySelectorAll('.letter');
		for (let i = 0; i < letters.length; i++) {
			if (letters[i].textContent === letter) {
				letters[i].classList.remove('hide');
				letters[i].classList.add('show');
			}
		}
	}
	
}

const newPhrase = new Phrase('hit me please');
newPhrase.addPhraseToDisplay();