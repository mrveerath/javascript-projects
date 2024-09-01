const dateOfBirth = document.getElementById('dateOfBirth');
const calculate = document.getElementById('btn');
calculate.addEventListener('click', start);

function start() {
    if (!dateOfBirth.value) {
        alert('Please Enter A Date');
        return;
    }
    
    let birthDate = new Date(dateOfBirth.value);
    let today = new Date();
    
    // Check if the birth date is in the future
    if (birthDate > today) {
        alert('The date of birth cannot be in the future.');
        return;
    }

    const birthDetail = {
        birthYear: birthDate.getFullYear(),
        birthMonth: birthDate.getMonth() + 1,
        birthDate: birthDate.getDate()
    };
    
    // Check if the birth year or the current year is a leap year
    leapChecker(birthDetail.birthYear);
    leapChecker(today.getFullYear());
    
    const age = calculateBirthDay(birthDetail);
    displayDate(age.year, age.month, age.day);
}

function calculateBirthDay(birthDetail) {
    let today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth() + 1;
    let currentDate = today.getDate();

    let year = currentYear - birthDetail.birthYear;
    let month = 0;
    let day = 0;

    if (birthDetail.birthMonth > currentMonth) {
        year--;
        month = 12 - (birthDetail.birthMonth - currentMonth);
    } else if (birthDetail.birthMonth === currentMonth) {
        if (birthDetail.birthDate > currentDate) {
            year--;
            month = 11;
            day = months[currentMonth - 2] - (birthDetail.birthDate - currentDate);
        } else {
            month = 0;
            day = currentDate - birthDetail.birthDate;
        }
    } else {
        month = currentMonth - birthDetail.birthMonth;
        if (birthDetail.birthDate > currentDate) {
            month--;
            day = months[currentMonth - 2] - (birthDetail.birthDate - currentDate);
        } else {
            day = currentDate - birthDetail.birthDate;
        }
    }

    return {
        year: year,
        month: month,
        day: day
    };
}

function displayDate(year, month, day) {
    document.getElementById('year').textContent = `Years: ${year}`;
    document.getElementById('month').textContent = `Months: ${month}`;
    document.getElementById('days').textContent = `Days: ${day}`;
}

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function leapChecker(year) {
    if (isLeapYear(year)) {
        months[1] = 29; 
    } else {
        months[1] = 28;
    }
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
