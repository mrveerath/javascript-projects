window.addEventListener('DOMContentLoaded', () => {
    const startTimer = document.getElementById("start-timer")
    const hourContainer = document.getElementById('hours');
    const minuteContainer = document.getElementById('minute');
    const secondContainer = document.getElementById('second');
    const time = document.getElementById("time-input");
    const StopTimer = document.getElementById("stop-timer")

    let second = String('');
    let minute = String('');
    let hour = String('');
    let timer;


    startTimer.addEventListener("click", () => {
        if (time.value === "") {
            alert("Please Select Time")
        }
        else {
            [hour,minute] = time.value.split(":")
            second = 60;
            secondContainer.innerHTML = second;
            minuteContainer.innerHTML = minute;
            hourContainer.innerHTML = hour;
            showTimer(timer,second,minute,hour)
        }
    })

    StopTimer.addEventListener("click", () => {
        if (time.value === "") {
            alert("Please Select Time First")
        }
        else {
            clearInterval(timer);
            // secondContainer.innerHTML = "";
            // minuteContainer.innerHTML = "";
            // hourContainer.innerHTML = "";
            secondContainer.innerHTML = second;
            minuteContainer.innerHTML = minute;
            hourContainer.innerHTML = hour;
        }

    })


    function showTimer(timer,second,minute,hour) {
        timer = setInterval(() => {
            secondContainer.innerHTML = "";
            second = second - 1;
            secondContainer.innerText = second;
            console.log(second)
            if (second <= 0) {
                minuteContainer.innerHTML = "";
                minute = minute - 1;
                second = 60
                console.log(minute)
                minuteContainer.innerHTML = minute;
                if (minute <= 0) {
                    hourContainer.innerHTML = "";
                    hour = hour - 1;
                    minute = 59;
                    second = 60
                    console.log({ minute, second, hour })
                    hourContainer.innerHTML = hour
                }
            }
        }, 1000)
    }

})