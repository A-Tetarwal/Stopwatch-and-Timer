const time = document.querySelector(".currenttime");

setInterval(() => {
    const now = new Date();
    const currentTime = now.toLocaleTimeString();
    time.innerHTML = currentTime;
}, 1000)




let msec = parseInt(document.querySelector('#stw4').innerText, 10);
let sec = parseInt(document.querySelector('#stw3').innerText, 10);
let mint = parseInt(document.querySelector('#stw2').innerText, 10);
let hr = parseInt(document.querySelector('#stw1').innerText, 10);

let intervalID; // Variable to store the interval ID

const millisec = () => {
    // Check if the interval is already running
    if (!intervalID) {
        intervalID = setInterval(() => {
            if (msec < 99) {
                msec++;
            } else {
                msec = 0;
                second(); // increment seconds when milliseconds reach 100 (1 second)
            }
            document.querySelector('#stw4').innerHTML = msec < 10 ? '0' + msec : msec;
        }, 10); // 10 milliseconds for centiseconds
    }
}

const second = () => {
    if (sec < 59) {
        sec++;
    } else {
        sec = 0;
        minute();
    }
    document.querySelector('#stw3').innerHTML = sec < 10 ? '0' + sec : sec;
}

const minute = () => {
    if (mint < 59) {
        mint++;
    } else {
        mint = 0;
    }
    document.querySelector('#stw2').innerHTML = mint < 10 ? '0' + mint : mint;
}

const stopTimer = () => {
    clearInterval(intervalID); // Stops the interval
    intervalID = null; // Reset the interval ID to allow restarting
}

const resetTimer = () => {
    stopTimer(); // Stop the timer if it's running
    hr = 0;
    mint = 0;
    sec = 0;
    msec = 0;
    document.querySelector('#stw1').innerHTML = '00'; // Assuming hours are displayed
    document.querySelector('#stw2').innerHTML = '00';
    document.querySelector('#stw3').innerHTML = '00';
    document.querySelector('#stw4').innerHTML = '00';
}

// Event listeners
document.querySelector('.start').addEventListener('click', millisec);
document.querySelector('.stop').addEventListener('click', stopTimer);
document.querySelector('.reset').addEventListener('click', resetTimer);



// Timer


let tmr1 = document.getElementById('tmr1');
let tmr2 = document.getElementById('tmr2');
let tmr3 = document.getElementById('tmr3');
let tmr4 = document.getElementById('tmr4');
let progressBar = document.getElementById('progressBar');
let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let isScrolling = false;
let interval;
let totalMilliseconds;

const smoothScroll = (e, maxVal, display) => {
  if (isScrolling) return;
  isScrolling = true;
  let unit = parseInt(display.innerText, 10);
  setTimeout(() => {
    unit += e.deltaY > 0 ? -1 : 1;
    unit = Math.max(0, Math.min(maxVal, unit));
    display.innerText = unit.toString().padStart(2, '0');
    isScrolling = false;
  }, 50);
};

tmr1.addEventListener('wheel', (e) => {
  hours = parseInt(tmr1.innerText, 10);
  smoothScroll(e, 23, tmr1);
});

tmr2.addEventListener('wheel', (e) => {
  minutes = parseInt(tmr2.innerText, 10);
  smoothScroll(e, 59, tmr2);
});

tmr3.addEventListener('wheel', (e) => {
  seconds = parseInt(tmr3.innerText, 10);
  smoothScroll(e, 59, tmr3);
});

tmr4.addEventListener('wheel', (e) => {
  milliseconds = parseInt(tmr4.innerText, 10);
  smoothScroll(e, 99, tmr4);
});

const startTimer = () => {
  if (interval) clearInterval(interval);
  totalMilliseconds = (hours * 3600000) + (minutes * 60000) + (seconds * 1000) + milliseconds;
  const originalMilliseconds = totalMilliseconds;
  interval = setInterval(() => {
    if (milliseconds > 0) {
      milliseconds--;
    } else if (seconds > 0) {
      milliseconds = 99;
      seconds--;
    } else if (minutes > 0) {
      seconds = 59;
      milliseconds = 99;
      minutes--;
    } else if (hours > 0) {
      minutes = 59;
      seconds = 59;
      milliseconds = 99;
      hours--;
    } else {
      clearInterval(interval);
    }
    let percentage = (totalMilliseconds / originalMilliseconds) * 100;
    tmr1.innerText = hours.toString().padStart(2, '0');
    tmr2.innerText = minutes.toString().padStart(2, '0');
    tmr3.innerText = seconds.toString().padStart(2, '0');
    tmr4.innerText = milliseconds.toString().padStart(2, '0');
    progressBar.style.width = `${percentage}%`;
    progressBar.style.background = `linear-gradient(to right, purple, pink)`;
    totalMilliseconds -= 10;
  }, 10);
};

const stopTimer1 = () => {
  clearInterval(interval);
  interval = null;
};

const resetTimer1 = () => {
  clearInterval(interval);
  interval = null;
  hours = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  tmr1.innerText = '00';
  tmr2.innerText = '00';
  tmr3.innerText = '00';
  tmr4.innerText = '00';
  progressBar.style.width = '100%';
  progressBar.style.background = '';
};

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer1);
document.getElementById('reset').addEventListener('click', resetTimer1);


document.querySelector('.hr').addEventListener('click', () => {
  alert('please scroll the digits')
})