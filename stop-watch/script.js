const timerInputForm = document.querySelector("form");
const formContainer = document.querySelector('.timer-form-container');
const timerContainer = document.querySelector('.timer-container');
let stopWatch;
let isRunning = false; // Initialize as false
timerInputForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let hour = parseInt(event.target[0].value) || 0;
    let minute = parseInt(event.target[1].value) || 0;
    let second = parseInt(event.target[2].value) || 0;
    let milisecond = 10;
    
    formContainer.style.display = "none";
    representStopwatch(hour, minute, second, milisecond);
    timerInputForm.reset()
});

function representStopwatch(hour, minute, second, milisecond) {
    const miliSecondTextContainer = document.querySelector(".milisecond-container p");
    const secondTextcontainer = document.querySelector(".second-container p");
    const minuteTextcontainer = document.querySelector(".minute-container p");
    const hourTextcontainer = document.querySelector(".hour-container p");

    const pauseBtn = document.querySelector(".pause");
    const resetBtn = document.querySelector(".reset");
    const startBtn = document.querySelector(".start");

    secondTextcontainer.innerHTML = second;
    minuteTextcontainer.innerHTML = minute;
    hourTextcontainer.innerHTML = hour;
    miliSecondTextContainer.innerHTML = milisecond;

    timerContainer.style.display = "flex";

    const miliSecondContainer = document.querySelector(".milisecond-container");
        const secondcontainer = document.querySelector(".second-container");
        const minutecontainer = document.querySelector(".minute-container");
        const hourcontainer = document.querySelector(".hour-container");

        function updateStopWatch() {
            // Update the millisecond, second, minute, hour counters
            if (milisecond > 0) {
                milisecond--;
            } else if (second > 0) {
                milisecond = 9;
                second--;
            } else if (minute > 0) {
                second = 59;
                milisecond = 9;
                minute--;
            } else if (hour > 0) {
                minute = 59;
                second = 59;
                milisecond = 9;
                hour--;
            } else {
                clearInterval(stopWatch);
            }
        
            // Update the displayed values
            miliSecondTextContainer.innerHTML = milisecond;
            miliSecondContainer.style.color= "#FFB200"
            secondTextcontainer.innerHTML = second;
            secondTextcontainer.style.color= "#B60071"
            minuteTextcontainer.innerHTML = minute;
            minuteTextcontainer.style.color= "#EB5B00"
            hourTextcontainer.innerHTML = hour;
            hourTextcontainer.style.color= "#E4003A"
        
            // Calculate percentages for each unit
            let milisecpercent = (milisecond / 9) * 100;
            let secondpercent = (second / 59) * 100;
            let minutepercent = (minute / 59) * 100;
            let hourpercent = (hour / 23) * 100; // Assuming max hours = 23
        
            // Apply conic-gradient for milliseconds
            miliSecondContainer.style.background = `conic-gradient(#FFB200 ${milisecpercent}%, #2f0015 0)`;
        
            // Optionally, you can apply gradients for seconds, minutes, and hours as well:
            secondcontainer.style.background = `conic-gradient(#B60071 ${secondpercent}%, #2f0015 0)`;
            minutecontainer.style.background = `conic-gradient(#EB5B00 ${minutepercent}%, #2f0015 0)`;
            hourcontainer.style.background = `conic-gradient(#E4003A ${hourpercent}%, #2f0015 0)`;
        }
        
    if (!isRunning) {
        stopWatch = setInterval(updateStopWatch, 100);
        isRunning = true;
    }

    pauseBtn.onclick = () => {
        clearInterval(stopWatch);
        isRunning = false;
    };

    startBtn.onclick = () => {
        if (!isRunning) {
            stopWatch = setInterval(updateStopWatch, 100);
            isRunning = true;
        }
    };

    resetBtn.addEventListener("click", () => {
        clearInterval(stopWatch);
        hour = minute = second = milisecond = 0;
        secondTextcontainer.innerHTML = second;
        minuteTextcontainer.innerHTML = minute;
        hourTextcontainer.innerHTML = hour;
        miliSecondTextContainer.innerHTML = milisecond;
        isRunning = false;
    });
}
