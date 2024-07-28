let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let reset = document.getElementById("reset");
let lap = document.getElementById("lap");
let lapsContainer = document.querySelector(".laps-container");
let lapsBox = document.querySelector(".lapsBox");
let stopwatch = document.getElementById("stopwatch");

console.log(lapsBox);

let hrs = 0;
let min = 59;
let sec = 50;
let ms = 0;
let timeoutId = null;
let laps = [];
let lapindex = 0;

function start(flag) {
  if (flag) {
    startBtn.disabled = true;
  }

  timeoutId = setTimeout(function () {
    hrs = parseInt(hrs);
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
    if (min == 60) {
      hrs = hrs + 1;
      min = 0;
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
    if (hrs < 10) {
      hrs = "0" + hrs;
    }

    stopwatch.innerHTML = hrs + ":" + min + ":" + sec + ":" + ms;

    // calling start() function recursivly to continue stopwatch
    start();
  }, 10);
}
function lapsfunction() {
  lapindex++;

  let currentLap = {
    index: lapindex,
    lap: hrs + ":" + min + ":" + sec + ":" + ms,
  };
  laps.push(currentLap);

  let html = "";
  for (let item of laps) {
    html += `
    <div>
      <p>Laps ${item.index}</p>
            <p>${item.lap}</p>
          </div>
    `;
  }
  lapsBox.innerHTML = html;
}

lap.addEventListener("click", () => {
  lapsfunction();
  lapsContainer.style.display = "block";
});

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
  stopwatch.innerHTML = "00:00:00:00";
  startBtn.disabled = false;

  // reset laps
  lapsContainer.style.display = "none";

  lapindex = 0;
  laps = [];
  lapsBox.innerHTML = "";
});
