// script.js
let minutes = 25;
let seconds = 0;
let timerInterval;
let soundFile = null;  // Store the user's custom sound

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const timerDurationInput = document.getElementById('timer-duration');
const soundInput = document.getElementById('sound-select');

function updateDisplay() {
  minutesDisplay.textContent = String(minutes).padStart(2, '0');
  secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function startTimer() {
  minutes = parseInt(timerDurationInput.value, 10);
  seconds = 0;
  updateDisplay();
  
  timerInterval = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(timerInterval);
        playSound();  // Play sound when timer ends
        alert("Time's up!");
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  minutes = parseInt(timerDurationInput.value, 10);
  seconds = 0;
  updateDisplay();
}

function playSound() {
  if (soundFile) {
    const audio = new Audio(URL.createObjectURL(soundFile));
    audio.play();
  } else {
    const defaultSound = new Audio('default-sound.mp3'); // Replace with a default sound path
    defaultSound.play();
  }
}

soundInput.addEventListener('change', (event) => {
  soundFile = event.target.files[0]; // Store the user-selected sound file
});

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay();
