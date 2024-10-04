let boardSize = 3
const playerSymbol = {
  player1: `<i class='bx bxs-star'></i>`,
  player2: `<i class='bx bxs-circle'></i>`
}

const playerFormContianer = document.querySelector(".players-form-container")
const gameContainer = document.querySelector(".game-container")

const playerForm = document.querySelector(".form form")
playerForm.addEventListener("click", (event) => {
  event.preventDefault()
  const player1 = playerForm.querySelector("#player-one-name").value
  const player2 = playerForm.querySelector("#player-two-name").value
  console.log(player1);
  if (!player1) {
    alert("First Player Name Is Required")
    return
  }
  if (!player2) {
    alert("Second Player Name Is Required")
    return
  }
  const playerDetails = {
    player1: {
      name: player1,
      icon: `<i class='bx bxs-star'></i>`
    },
    player2: {
      name: player2,
      icon: `<i class='bx bxs-circle'></i>`
    }
  }
  playerFormContianer.style.display = "none"
  startGame(playerDetails)
  playerForm.reset()
})
const boardSizeBtns = document.querySelectorAll(".sizes-buttons button")
boardSizeBtns.forEach((sizeBtn) => {
  sizeBtn.addEventListener("click", (event) => {
    event.target.className = "selectedSize"
    boardSize = sizeBtn.innerText
    console.log(boardSize);
    boardSizeBtns.forEach((btn) => {
      btn.disabled = true
    })
  })
})
function startGame(playerDetails) {
  document.querySelector(".player-one-name").innerText = playerDetails.player1.name;
  document.querySelector(".player-two-name").innerText = playerDetails.player2.name;
  let playerChance = playerDetails.player1;
  const playerTurnContainer = document.querySelector(".player-turn");
  playerTurnContainer.innerText = `${playerChance.name}'s Chance`;
  gameContainer.style.display = "flex";
  const gameBoardContainer = document.querySelector(".game-board");
  gameBoardContainer.innerHTML = "";
  const wonConditions = generateWinCondition(boardSize);
  console.log(wonConditions);
  const gameBoardButtons = Array(Number(boardSize) * Number(boardSize)).fill("");
  gameBoardButtons.forEach((_, index) => {
    const btn = document.createElement("button");
    btn.innerHTML = "";
    btn.onclick = () => {
      btn.innerHTML = playerChance.icon;
      gameBoardButtons[index] = playerChance.icon;
      const winner = checkWinCondition(gameBoardButtons, wonConditions);
      if (winner) {
        setTimeout(() => {
          if (winner === "draw") {
            alert("It's a draw!");
            window.location.reload()
          } else {
            alert(`${playerChance.name} wins!`);
            window.location.reload()
          }
        },1000)
      } else {
        playerChance = (playerChance === playerDetails.player1) ? playerDetails.player2 : playerDetails.player1;
        playerTurnContainer.innerText = `${playerChance.name}'s Chance`;
      }
    };
    gameBoardContainer.appendChild(btn);
  });
  gameBoardContainer.style.gridTemplateColumns = `repeat(${boardSize}, 70px)`;
  gameBoardContainer.style.gridTemplateRows = `repeat(${boardSize}, 70px)`;
}

function generateWinCondition(size) {
  const winCondition = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(i * size + j);
    }
    winCondition.push(row);
  }
  for (let i = 0; i < size; i++) {
    const col = [];
    for (let j = 0; j < size; j++) {
      col.push(i + size * j);
    }
    winCondition.push(col);
  }
  const dig1 = [];
  for (let i = 0; i < size; i++) {
    dig1.push(i * size + i);
  }
  winCondition.push(dig1);

  const dig2 = [];
  for (let i = 0; i < size; i++) {
    dig2.push(i * size + (size - 1 - i));
  }
  winCondition.push(dig2);

  return winCondition;
}

function checkWinCondition(gameBoardButtons, wonConditions) {
  console.log("Checking win condition...");
  console.log("Board State:", gameBoardButtons);
  console.log("Win Conditions:", wonConditions);

  for (let condition of wonConditions) {
    const first = gameBoardButtons[condition[0]]
    if (first && condition.every(index => gameBoardButtons[index] === first)) {
      console.log(`Winning condition met at indices: ${condition}`);
      return first;
    }
  }
  if (gameBoardButtons.every(button => button !== "")) {
    console.log("Game is a draw");
    return "draw";
  }
  return null
}
