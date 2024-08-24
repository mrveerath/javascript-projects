window.addEventListener('DOMContentLoaded', () => {
    const startTimer = document.getElementById("start-timer")
    const hourContainer = document.getElementById('hours');
    const minuteContainer = document.getElementById('minute');
    const secondContainer = document.getElementById('second');
    const time = document.getElementById("time-input");
    const StopTimer = document.getElementById("stop-timer");
    const resetTimer = document.getElementById("reset-timer");




    let second = String('60');
    let minute = String('');
    let hour = String('');
    let timer;
    let stoppedTimer = false;

    resetTimer.addEventListener("click", () => {
        time.value = ""
        clearInterval(timer)
        second = `00`;
        minute = `00`
        hour = `00`

        secondContainer.innerText = String(second).padStart(2, '0');
        minuteContainer.innerText = String(minute).padStart(2, '0');
        hourContainer.innerText = String(hour).padStart(2, '0');


        time.disabled = false

    })


    startTimer.addEventListener("click", () => {
        if (time.value === "") {
            alert("Please Select Time")
        }
        else {
            hour = `${time.value[0]}${time.value[1]}`
            if (stoppedTimer) {
                minute = `${time.value[3]}${time.value[4]}`
            }
            else {
                minute = `${time.value[3]}${time.value[4]}` - 1
            }
            if (minute <= 0) {
                hour = hour - 1;
                minute = 59
            }
            secondContainer.innerText = String(second).padStart(2, '0');
            minuteContainer.innerText = String(minute).padStart(2, '0');
            hourContainer.innerText = String(hour).padStart(2, '0');
            showTimer()
            time.disabled = true
        }
    })

    StopTimer.addEventListener("click", () => {
        time.disabled = false
        stoppedTimer = true
        if (time.value === "") {
            alert("Please Select Time First")
        }
        else {
            time.value = `${hour}:${minute}`;
            clearInterval(timer);
            secondContainer.innerHTML = "";
            minuteContainer.innerHTML = "";
            hourContainer.innerHTML = "";
            secondContainer.innerText = String(second).padStart(2, '0');
            minuteContainer.innerText = String(minute).padStart(2, '0');
            hourContainer.innerText = String(hour).padStart(2, '0');
        }
    })


    function showTimer() {
        timer = setInterval(() => {
            secondContainer.innerHTML = "";
            second = second - 1;
            secondContainer.innerText = String(second).padStart(2, '0');
            if (second <= 0) {
                minuteContainer.innerHTML = "";
                minute = minute - 1;
                second = 60
                minuteContainer.innerText = String(minute).padStart(2, '0');
                if (minute <= 0) {
                    hourContainer.innerHTML = "";
                    hour = hour - 1;
                    minute = 59;
                    second = 60
                    hourContainer.innerText = String(hour).padStart(2, '0');
                }
            }
        }, 1000)
    }

})