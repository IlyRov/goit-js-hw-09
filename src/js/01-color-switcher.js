const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

function changeBodyColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

startButton.addEventListener('click', () => {
  if (!intervalId) {
    startButton.disabled = true;
    intervalId = setInterval(changeBodyColor, 1000);
  }
});

stopButton.addEventListener('click', () => {
  if (intervalId) {
    startButton.disabled = false;
    clearInterval(intervalId);
    intervalId = null;
  }
});

