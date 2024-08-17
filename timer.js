const time = document.querySelector(".currenttime");

setInterval(() => {
    const now = new Date();
    const currentTime = now.toLocaleTimeString();
    time.innerHTML = currentTime;
}, 1000)


let msec = parseInt(document.querySelector('#stw4').innerText, 10);
let sec = parseInt(document.querySelector('#stw3').innerText, 10);
let mint = parseInt(document.querySelector('#stw2').innerText, 10);

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
