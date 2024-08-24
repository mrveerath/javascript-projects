const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const dateOfBirth = document.getElementById('dateOfBirth')
const calculate = document.getElementById('btn')
calculate.addEventListener("click",calculateAge)
function calculateAge() {
    let today = new Date();
    let currentDate = {
        date: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear()
    };
    let inputDate = new Date(dateOfBirth.value); 
    let birthDate = {
        date: inputDate.getDate(),
        month: inputDate.getMonth() + 1,
        year: inputDate.getFullYear()
    };
    leapChecker(currentDate.year)
    if (currentDate.year < birthDate.year ||
        (currentDate.month < birthDate.month && currentDate.year === birthDate.year) ||
        (currentDate.date < birthDate.date && currentDate.month === birthDate.month && currentDate.year === birthDate.year)) {
            alert("Please Select a Valid Date");
    }
    let year = currentDate.year - birthDate.year
    let month;
    if(currentDate.month >= birthDate.month) {
        month = currentDate.month - birthDate.month
    }
    else{
        year = year -1;
        month = 12 + currentDate.month - birthDate.month
    }
    if(currentDate.date >= birthDate.date) {
        birthDate = currentDate.date -birthDate.date
    }
    else{
        month = month - 1;
        let days = months[currentDate.month - 2]
        day = days + currentDate.date - birthDate.date
        if(birthDate.month < 0) {
            birthDate.month = 11
            birthDate.year --;
        }

    }
    displayDate(day , month , year)
}
function displayDate(date , month , year) {
    document.getElementById('year').textContent = year;
    document.getElementById('month').textContent =month;
    document.getElementById('days').textContent =day;
}
function leapChecker(year) {
	if (year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)) {
		months[1] = 29;
	} else {
		months[1] = 28;
	}
}
