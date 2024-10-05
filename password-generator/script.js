console.log("Hello From Password Generator");

const lengthOfPassword = document.querySelector("#length-of-password");
const rangeLength = document.querySelector(".range-length");
lengthOfPassword.addEventListener("change", (event) => {
    rangeLength.innerText = event.target.value;
    console.log(event.target.value);
});
window.addEventListener("DOMContentLoaded" , () => {
    rangeLength.innerText = lengthOfPassword.value
})

const generateButton = document.querySelector(".generate-password"); // Corrected typo here
generateButton.addEventListener("click", () => {
    let generatedPassword = "";
    const hasUpperCase = document.querySelector("#uppercase");
    const hasLowerCase = document.querySelector("#lowercase");
    const hasNumber = document.querySelector("#number");
    const hasSymbol = document.querySelector("#symbol");
    
    const specialCharacters = [
        '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', ';', ':', '\'', '"', ',', '.', '/', '<', '>', '?', '|', '\\', '`', '~'
    ];
    const numbers = Array.from({ length: 10 }, (_, i) => String.fromCharCode(48 + i));
    const lowercaseLetters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
    const uppercaseLetters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
    
    let combinedCharacters = [];
    if (hasUpperCase.checked) {
        combinedCharacters = [...combinedCharacters, ...uppercaseLetters];
    }
    if (hasLowerCase.checked) {
        combinedCharacters = [...combinedCharacters, ...lowercaseLetters];
    }
    if (hasNumber.checked) {
        combinedCharacters = [...combinedCharacters, ...numbers];
    }
    if (hasSymbol.checked) {
        combinedCharacters = [...combinedCharacters, ...specialCharacters];
    }
    
    // Ensure combinedCharacters is not empty
    if (combinedCharacters.length === 0) {
        alert("Please select at least one option (Uppercase, Lowercase, Number, or Symbol)!");
        return;
    }

    for (let i = 0; i < lengthOfPassword.value; i++) {
        generatedPassword += combinedCharacters[generateRandomNumber(combinedCharacters.length)];
    }

    // Ensure password has at least 8 characters
    if (generatedPassword && generatedPassword.length >= 8) {
        const passwordContainer = document.querySelector("#password-field");
        passwordContainer.value = generatedPassword;
    } else {
        alert("Password must be at least 8 characters long.");
    }
});

// Copy Password

const copyButton = document.querySelector(".copy-password")
copyButton.addEventListener('click' , () => {
    const passwords= document.querySelector("#password-field").value
    console.log(passwords);
    if(passwords){
        navigator.clipboard.writeText(passwords).then(() => {
            alert("Password Copied")
        }).catch((error) => {
            console.log(error);
        })
    }
})


function generateRandomNumber(length) {
    return Math.floor(Math.random() * length);
}
