let minutes = 0, seconds = 0, milliseconds = 0;
let isRunning = false;
let interval;
const lapBox = document.querySelector('.lap_box');

const updateDisplay = () => {
    document.querySelector('.minutes').textContent = String(minutes).padStart(2, '0');
    document.querySelector('.seconds').textContent = String(seconds).padStart(2, '0');
    document.querySelector('.millisecond').textContent = String(milliseconds).padStart(3, '0');
}

const startStopwatch = () => {
    interval = setInterval(() => {
        milliseconds += 10;
        if (milliseconds === 1000) {
            milliseconds = 0;
            seconds++;
        }
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        updateDisplay();
    }, 10);
}

const stopStopwatch = () => {
    clearInterval(interval);
}

document.querySelector('.toggle').addEventListener('click', function() {
    if (isRunning) {
        stopStopwatch();
        this.textContent = 'Start';
    } else {
        startStopwatch();
        this.textContent = 'Stop';
    }
    isRunning = !isRunning;
    this.classList.toggle('on');
});

document.querySelector('.reset').addEventListener('click', function() {
    stopStopwatch();
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    document.querySelector('.toggle').textContent = 'Start';
    isRunning = false;
    lapBox.innerHTML = '';
});

document.querySelector('.lap').addEventListener('click', function() {
    if (isRunning) {
        const lapTime = document.createElement('li');
        lapTime.className = 'lapItem';
        lapTime.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
        lapBox.appendChild(lapTime);
    }
});
