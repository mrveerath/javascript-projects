window.addEventListener("DOMContentLoaded", () => {
    setInterval(() => {
        const time = new Date();
        const hour = time.getHours();
        const minute = time.getMinutes();
        const second = time.getSeconds();
        const secondContainer = document.querySelector(".second");
        const minuteContainer = document.querySelector(".minute");
        const hourContainer = document.querySelector(".hour");
        const hourShow = document.querySelector(".hourShow");
        const minuteShow = document.querySelector(".minuteShow");
        const secondShow = document.querySelector(".secondShow");
        const periodShow = document.querySelector(".periodShow");

        let period;
        let showHour = hour;

        if (hour > 12) {
            showHour = hour - 12;
        }

        if (hour >= 12) {
            period = "PM";
        } else {
            period = "AM";
        }

        let secondDegree = second * 6;
        let minuteDegree = minute * 6 + (second / 60) * 6;
        let hourDegree = (showHour * 30) + (minute / 60) * 30;

        secondContainer.style.transform = `rotate(${secondDegree}deg)`;
        minuteContainer.style.transform = `rotate(${minuteDegree}deg)`;
        hourContainer.style.transform = `rotate(${hourDegree}deg)`;

        hourShow.innerHTML = showHour.toString().padStart(2, "0");
        minuteShow.innerHTML = minute.toString().padStart(2, "0");
        secondShow.innerHTML = second.toString().padStart(2, "0");
        periodShow.innerHTML = period;
    }, 1000);
});
