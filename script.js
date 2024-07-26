let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let reset = document.getElementById("reset");
let stopwatch = document.getElementById("stopwatch");

let min = 0;
let sec = 0;
let ms = 0;
let timeoutId = null;

function start(flag) {
  if (flag) {
    startBtn.disabled = true;
  }

  timeoutId = setTimeout(function () {
    min = parseInt(min);
    sec = parseInt(sec);
    ms = parseInt(ms);

    ms++;

    if (ms == 100) {
      sec = sec + 1;
      ms = 0;
    }
    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (ms < 10) {
      ms = "0" + ms;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }
    if (min < 10) {
      min = "0" + min;
    }

    stopwatch.innerHTML = min + ":" + sec + ":" + ms;

    // calling start() function recursivly to continue stopwatch
    start();
  }, 10);
}

startBtn.addEventListener("click", () => {
  start(true);
});

stopBtn.addEventListener("click", () => {
  clearTimeout(timeoutId);
  startBtn.disabled = false;
});

reset.addEventListener("click", () => {
  min = 0;
  sec = 0;
  ms = 0;
  clearTimeout(timeoutId);
  stopwatch.innerHTML = "00:00:00";
  startBtn.disabled = false;
});
