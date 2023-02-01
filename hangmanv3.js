/*let noun = {

getWord: function(){

let options = {
	method: 'Get',
	headers: { 'X-Api-Key': 'O0xs7Xp7BvJpWrdPGeEZeg==IWOgOElUDMa83vQS'}
}
let url = "https://api.api-ninjas.com/v1/randomword?noun"

fetch(url,options)
.then((response) => {
	return response.json()
})
.then((data) => {
	this.matchWord(data)
	//console.log(data)
})
.catch((err) => {
	console.log(err)

})
},

	matchWord: function(data){

	const { word } = data;
	console.log(word);
	}
};

noun.getWord();

*/


let words = ["axolotl", "blobfish", "warthog", "condor", "aardvark", "echidna", "aye-aye", "shoebill"]
let answer = words[Math.floor(Math.random() * words.length)];
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord(){
	
	console.log(answer);
		
};

let hint = {
	
	fetchHint: function(){

	fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + answer)
	.then((response) => response.json())
	
	.then((data) => {
	this.displayHint(data)
	console.log(data)
		
	})
	.catch((err) => {
	console.log(err)
	
	})
		
	},

	displayHint: function(data){
		
		const { definition } = data[0].meanings[0].definitions[0];
		console.log(definition);
		document.getElementById('hint').innerHTML = definition;
	}
};

hint.fetchHint();



function generateButtons(){
	
	let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz-'.split('').map(letter =>
	`
	<button class="btn btn-lg btn-secondary m-2"
	id="` + letter + `"
	onclick="handleGuess('` + letter + `')"
	>
	` + letter + `
	</button>
	`).join(''); //gets rid of commas 
	
	document.getElementById('keyboard').innerHTML = buttonsHTML;
}	

function handleGuess(chosenLetter){
	
	guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
	document.getElementById(chosenLetter).setAttribute('disabled', true);
	
	if (answer.indexOf(chosenLetter) >= 0) {
		guessedWord();
		checkIfGameWon();
	} else if (answer.indexOf(chosenLetter) === -1){
		mistakes++;
		updateMistakes();
		checkIfGameLost();
		updatePicture();
	}
}

function updatePicture(){
	
	if (mistakes < 6){
	document.getElementById('hangmanPic').src = 'images/' + mistakes + '.jpg';
	} else {
	document.getElementById('hangmanPic').src = 'images/' + answer + '.jpg';
}
}

function checkIfGameWon(){
	
	if (wordStatus === answer){
		document.getElementById('keyboard').innerHTML = "<h2>You Won</h2>";
		document.getElementById('hangmanPic').src = 'images/' + answer + '.jpg'
	}
}

function checkIfGameLost(){
	
	if (mistakes === maxWrong){
		document.getElementById('wordSpotlight').innerHTML = answer;
		document.getElementById('keyboard').innerHTML = "<h2>You Lost</h2>";
		//document.getElementById('hangmanPic').src = 'images/' + answer + '.jpg'
		
	}
}
function guessedWord(){
	
	wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
	document.getElementById('wordSpotlight').innerHTML = wordStatus;
}


function updateMistakes(){
	document.getElementById('mistakes').innerHTML = mistakes;
}

function reset(){
	
	answer = words[Math.floor(Math.random() * words.length)];
	mistakes = 0;
	guessed = [];
	document.getElementById('hangmanPic').src = 'images/hangman.jpg';
	randomWord();
	generateButtons();
	guessedWord();
	updateMistakes();
	hint.fetchHint();
}


document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();

