'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let correctLetterLocations = 0
let correctLetters = 0

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  // your code here
  // created two varibales that split up passed in arguments
  let solutionArray = solution.split('')
  let guessArray = guess.split('')

  
  for (let i = 0; i < solutionArray.length; i++){
    if(solutionArray[i] === guessArray[i]){
      correctLetterLocations++ 
      solutionArray[i] = null
    }
  }
  for(let i = 0; i < solutionArray.length; i++){
    let guessedLetter = guessArray[i]
    let targetIndex = solutionArray.indexOf(guessedLetter)
    if(targetIndex > -1){
      correctLetters++
      solutionArray[targetIndex] = null
    }
  }
  const hint = `your guess was ${guess} number of correct locations ${correctLetterLocations} 
  numbers of letters NOT in the correct location ${correctLetters}`


  board.push(hint)
  correctLetters = 0
  correctLetterLocations = 0
}

const mastermind = (guess) => {
  // solution = 'abcd'; // Comment this out to generate a random solution
  if(solution == guess){
    console.log('you guessed it!')
    return 'You guessed it!';
  } else if (board.length == 10){
    console.log('you ran out of turns!')
    return 'You ran out of turns!'
    
    } else {
      generateHint(guess)
      return 'Guess again.'
      
    }
  // your code here
}

// rules
// right character and location
// wrong character but right location
// flat out wrong


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}