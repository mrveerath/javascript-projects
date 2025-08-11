var inputField = document.querySelector('input');
var bar = document.querySelector('.bar');
var message = document.querySelector('.message');
var strengthContainer = document.querySelector('.strength'); // Avoid variable conflict
inputField.addEventListener('input', function () {
    var password = inputField.value;
    if (password.length === 0) {
        message.innerHTML = '';
        strengthContainer.style.display = 'none';
        bar.style.width = "0%"; // Reset bar width
        bar.style.backgroundColor = "transparent"; // Hide bar
        return;
    }
    strengthContainer.style.display = 'flex';
    // Call calculateStrength immediately without delay
    calculateStrength(password);
});
function calculateStrength(password) {
    var score = 0; // Renamed from `strength` to avoid conflict
    var requirementsMet = 0;
    // Check each category
    if (password.length >= 8) {
        score += 1;
        requirementsMet++;
    }
    if (/[a-z]/.test(password)) {
        score += 1;
        requirementsMet++;
    }
    if (/[A-Z]/.test(password)) {
        score += 1;
        requirementsMet++;
    }
    if (/\d/.test(password)) {
        score += 1;
        requirementsMet++;
    }
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        score += 1;
        requirementsMet++;
    }
    // Ensure full strength is only achieved when all five categories are met
    if (requirementsMet === 5 && password.length >= 12) {
        score += 1; // Bonus point for strong passwords
    }
    // Determine strength level
    var width = "20%";
    var feedback = "Very Weak";
    var color = "red";
    if (score >= 2) {
        width = "40%";
        feedback = "Weak";
        color = "orange";
    }
    if (score >= 3) {
        width = "60%";
        feedback = "Moderate";
        color = "yellow";
    }
    if (score >= 4) {
        width = "80%";
        feedback = "Strong";
        color = "blue";
    }
    if (score >= 5) {
        width = "100%";
        feedback = "Excellent";
        color = "green";
    }
    // Apply styles
    bar.style.width = width;
    message.textContent = "Your Password is ".concat(feedback);
    bar.style.backgroundColor = color;
}
