 /*----- constants -----*/
  const MAX_ATTEMPTS = 6;
  const WORDS = ["javascript", "developer", "interface", "function", "variable"];
  /*----- state variables -----*/
  let word, guessedWord, incorrectGuesses, remainingAttempts;

  /*----- cached elements  -----*/
  const newWordBtn = document.getElementById('new-word');
  const wordDisplay = document.getElementById('word-display');
  const incorrectList = document.getElementById('incorrect-list');
  const wordBank = document.getElementById('word-bank');
  const spaceman = document.getElementById('spaceman');
  const message = document.getElementById('message');
  

  /*----- event listeners -----*/
  newWordBtn.addEventListener('click', initialize);

  /* Initialize the game */
  initialize();

  /*----- functions -----*/ //letter bank, word bank?
  function initialize() {
    word = WORDS[Math.floor(Math.random() * WORDS.length)];
    guessedWord = Array(word.length).fill('_');
    incorrectGuesses = [];
    remainingAttempts = MAX_ATTEMPTS;
    render();
}

function render() {
    //Guessed Word
    wordDisplay.innerHTML = '';
    guessedWord.forEach(letter => {
        const letterBox = document.createElement('div');
        letterBox.className = 'letter-box';
        letterBox.textContent = letter;
        wordDisplay.appendChild(letterBox);
    });

    //Incorrect Guesses
    incorrectList.innerHTML = '';
    incorrectGuesses.forEach(letter => {
        const listItem = document.createElement('li');
        listItem.textContent = letter;
        incorrectList.appendChild(listItem);
    });

    //Word Bank
    wordBank.innerHTML = '';
    for (let i = 0; i < 26; i++) {
        const letter = String.fromCharCode(97 + i);
        const letterDiv = document.createElement('div');
        letterDiv.className = `word-bank-letter ${guessedWord.includes(letter) || incorrectGuesses.includes(letter) ? 'used' : ''}`;
        letterDiv.textContent = letter;
        letterDiv.addEventListener('click', () => handleLetterClick(letter));
        wordBank.appendChild(letterDiv);
    }

    //Spaceman
    spaceman.innerHTML = `Attempts Remaining: ${remainingAttempts}`;

    //Message
    message.textContent = '';
    if (guessedWord.join('') === word) {
        message.textContent = 'You Win!';
    } else if (remainingAttempts <= 0) {
        message.textContent = `You Lose! The word was ${word}`;
    }
}

function handleLetterClick(letter) {
    if (guessedWord.includes(letter) || incorrectGuesses.includes(letter) || remainingAttempts <= 0) return;

    if (word.includes(letter)) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] === letter) guessedWord[i] = letter;
        }
    } else {
        incorrectGuesses.push(letter);
        remainingAttempts--;
    }

    render();
}
