const $milliseconds = document.querySelector("#timer-milliseconds");
const $seconds = document.querySelector("#timer-seconds");
const $minutes = document.querySelector("#timer-minutes");
const $hours = document.querySelector("#timer-hours");

const $startButton = document.querySelector("#start-btn");
const $lapButton = document.querySelector("#lap-btn");
const $pauseButton = document.querySelector("#pause-btn");
const $resetButton = document.querySelector("#reset-btn");

const $lapsContainer = document.querySelector("#laps-container");

let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let interval;
let lap = 1;

const buttons = [$lapButton, $pauseButton, $resetButton];

function setButtonStates(disabled) {
  buttons.forEach((button) => {
    button.disabled = disabled;
  });
}

// Call the setButtonStates function to disable/enable buttons
setButtonStates(true);

$startButton.onclick = startTimer;
$lapButton.onclick = displayLap;
$pauseButton.onclick = pauseTimer;
$resetButton.onclick = resetTimer;

function startTimer() {
  interval = setInterval(updateTimer, 10);
  $startButton.disabled = true;
  $lapButton.disabled = false;
  $pauseButton.disabled = false;
  $resetButton.disabled = false;
}

function pauseTimer() {
  clearInterval(interval);
  $startButton.disabled = false;
  $lapButton.disabled = true;
  $pauseButton.disabled = true;
}

function resetTimer() {
  clearInterval(interval);
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  displayTimer();
  clearLapsList();
  $startButton.disabled = false;
  $pauseButton.disabled = true;
  $resetButton.disabled = true;
}

function updateTimer() {
  milliseconds++;
  if (milliseconds === 100) {
    seconds++;
    milliseconds = 0;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
  }
  displayTimer();
}

function displayTimer() {
  $milliseconds.innerHTML = formattedTime(milliseconds);
  $seconds.innerHTML = formattedTime(seconds);
  $minutes.innerHTML = formattedTime(minutes);
}

function formattedTime(time) {
  return time < 10 ? `0${time}` : time;
}

function displayLap() {
  let p = document.createElement("p");
  $lapsContainer.appendChild(p);
  p.setAttribute("id", "lap-item");
  p.innerHTML = `Lap ${lap}: ${formattedTime(minutes)}:${formattedTime(
    seconds
  )}:${formattedTime(milliseconds)}`;
  lap++;
}

function clearLapsList() {
  $lapButton.disabled = true;
  let lapsList = document.querySelectorAll("#lap-item");
  for (let i = 0; i < lapsList.length; i++) {
    lapsList[i].remove();
  }
  lap = 1;
}
