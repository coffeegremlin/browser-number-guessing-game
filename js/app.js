/*-------------------------------- Constants --------------------------------*/

const kazoo = new Audio('../audio/kazoo.wav')
const sans = new Audio('../audio/megalovania4note.wav')
const mysterySound = new Audio('../audio/RickRoll.mp3')

/*-------------------------------- Variables --------------------------------*/

let secretNum, guessList, isWinner

/*------------------------ Cached Element References ------------------------*/

const form = document.querySelector('form')
const guessInput = document.querySelector('#guess-input')
const guessesEl = document.querySelector('#prev-guesses')
const messageEl = document.querySelector('#message')
const resetBtn = document.querySelector('#reset-button')
const prevGuessMsg = document.querySelector('#prev-guesses-msg')
const titleEl = document.querySelector('#title')

/*----------------------------- Event Listeners -----------------------------*/

form.addEventListener('reset', init)
form.addEventListener('submit', function (evt){
  evt.preventDefault()
  if(isWinner === false) {
    checkGuess(parseInt(guessInput.value))
  }
})

/*-------------------------------- Functions --------------------------------*/

init()

function init(){
  guessesEl.innerText = ''
  messageEl.innerText = 'Please enter a guess between 1 and 100!'
  messageEl.className = ''
  resetBtn.setAttribute('hidden', true)
  prevGuessMsg.innerText = ''
  guessList = []
  isWinner = false
  //confetti effect toggle?
  secretNum = Math.floor(Math.random() * 100 + 1)
}

function checkGuess(guess){
  guessInput.value = ''
  if (isNaN(guess) || guess < 1 || guess > 100){
    renderError('Error! Danger Will Robinson! Enter a number from 1 to 100!')
    return
  } else if (guess === secretNum){
    isWinner = true
  }
  guessList.push(guess)
  render()
}

function render(){
  const lastGuess = guessList[guessList.length - 1]
  const div = document.createElement('div')
  div.innerText = lastGuess

  if (guessList.length === 1) {
    prevGuessMsg.innerText = 'Previous Guesses are: '
    resetBtn.removeAttribute('hidden')
  } 
  
  if (isWinner) {
    renderWin(div)
  } else if (lastGuess > secretNum || lastGuess < secretNum) {
    renderGuess (div, lastGuess)
  }
}

function renderWin(div){
  messageEl.className = 'winner'
  div.className = 'winner'
  guessesEl.appendChild(div)
  titleEl.className = 'animate__animated animate__heartBeat'
  if (guessList.length === 1){
    messageEl.innerText = 'You found the number in 1 guess!'
  } else {
    messageEl.innerText = `Congrats! you found the number ${secretNum} in ${guessList.length} guesses!`
    }
    confetti.start(2500)
  setTimeout(function(){
    sans.play();
  },1000);
}

function renderGuess(div, lastGuess){
  if (lastGuess < secretNum){
    messageEl.className = 'low'
    div.className = 'low'
    messageEl.innerText = `${lastGuess} is too low, please try again.`
  } else if (lastGuess > secretNum) {
    messageEl.className = 'high'
    div.className = 'high'
    messageEl.innerText = `${lastGuess} is too high, please try again.`
  }
  guessesEl.appendChild(div)
}

function renderError(error){
  messageEl.className = 'error'
  messageEl.innerText = error
}