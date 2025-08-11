const inputField = document.querySelector('input') as HTMLInputElement;
const bar = document.querySelector('.bar') as HTMLDivElement;
const message = document.querySelector('.message') as HTMLParagraphElement;
const strengthContainer = document.querySelector('.strength') as HTMLDivElement; // Avoid variable conflict

inputField.addEventListener('input', () => {
    const password = inputField.value;

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

function calculateStrength(password: string): void {
    let score = 0; // Renamed from `strength` to avoid conflict
    let requirementsMet = 0;

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
    let width = "20%";
    let feedback = "Very Weak";
    let color = "red";

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
    message.textContent = `Your Password is ${feedback}`;
    bar.style.backgroundColor = color;
}
