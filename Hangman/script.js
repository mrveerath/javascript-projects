const keys = [
    "a", "b", "c", "d", "e", "f",
    "g", "h", "i", "j", "k", "l",
    "m", "n", "o", "p", "q", "r",
    "s", "t", "u", "v", "w", "x",
    "y", "z"
];

async function fetchAllWords() {
    try {
        const response = await fetch("./words.json");
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        return [];
    }
}

const scoreSection = document.querySelector(".score-section")
const keyBoardSection = document.querySelector(".keyBoard-section");
const inputSection = document.querySelector(".input-section")
const phrases = document.querySelector(".phrase-section")
const remainingChances = document.querySelector("#remaining-chances")
const playAgainButton = document.querySelector(".play-again");

let score = 0;

async function initialize() {
    const allWords = await fetchAllWords();
    const word = allWords[generateRandomNumber(allWords.length)];
    phrases.innerText = word.definition;

    const inputFields = String(word.word).split("");
    let chances = inputFields.length;  // Set chances to word length
    remainingChances.innerText = chances;

    inputFields.forEach((char, index) => {
        const inputField = document.createElement("input");
        inputField.className = "inputField";
        inputField.setAttribute("index", index);
        inputField.setAttribute("readonly", true);
        inputSection.appendChild(inputField);
    });

    keys.forEach(key => {
        const button = document.createElement("button");
        button.innerText = key;
        keyBoardSection.appendChild(button);
        button.addEventListener("click", () => {
            if (inputFields.includes(key)) {
                const findIndex = inputFields.indexOf(key)
                const inputField = document.querySelector(`input[index="${findIndex}"]`)
                inputField.value = key
                inputFields[findIndex] = "-" 
                setTimeout(() => {
                    if(inputFields.every(char => char === "-")){
                        alert("You Win!")
                        resetGame(word)
                        score++;
                        updateScore();
                    }
                },2000)
                
            } else {
                chances--;
                remainingChances.innerText = chances;
                const hangIndex = document.querySelector(`div[hangIndex="${chances}"]`);
                hangIndex.style.backgroundColor = "red";
                hangIndex.style.display = "none";
                if (chances === 0) {
                    alert("Game Over");
                    resetGame(word);
                }
            }
        });
    });
}

function resetGame(word) {
    inputSection.innerHTML = "";
    keyBoardSection.innerHTML = "";
    remainingChances.innerText = 0;
    phrases.innerText = "Definition: ";
    setTimeout(() => {
        initialize();
    }, 2000);
}

function generateRandomNumber(length) {
    return Math.floor(Math.random() * length);
}

function updateScore() {
    document.getElementById("score").innerText = score;
}

playAgainButton.addEventListener("click", () => {
    resetGame();
});

initialize();
