let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;    //playerX, playerO
let count = 0;       //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {          //Resets game variables
  turnO = true;                    // Reset turn to Player O
  count = 0;                       // Reset move counter
  enableBoxes();                   // Enable all boxes again
  msgContainer.classList.add("hide");           // Hide the message container
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";         // Player O's turn
      turnO = false;               // Switch turn to Player X
    } else {
      //playerX
      box.innerText = "X";         // Player X's turn
      turnO = true;                // Switch turn to Player O
    }
    box.disabled = true;           // Prevent clicking the same box again
    count++;                       // Increase move count

    let isWinner = checkWinner();      // Check if a player has won

    if (count === 9 && !isWinner) {   // If all 9 boxes are filled and no winner
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;     // Display draw message   
  msgContainer.classList.remove("hide");  // Show message container
  disableBoxes();                         // Disable all boxes
};

const disableBoxes = () => {             //Loops through all boxes and disables them after the game ends.
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {              //Loops through all boxes, clears their text, and enables them for a new game.
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;      //Displays the winner’s name.
  msgContainer.classList.remove("hide");                       //Shows the message container.
  disableBoxes();                                              //Disables all boxes.
};

const checkWinner = () => {
  for (let pattern of winPatterns) {                           //Loops through all winning patterns.
    let pos1Val = boxes[pattern[0]].innerText;                 //Retrieves the text of the three positions in the current pattern.
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {      //Ensures none of the three positions are empty 
      if (pos1Val === pos2Val && pos2Val === pos3Val) {         //Checks if all three values are the same (O or X).
        showWinner(pos1Val);                                    //Calls showWinner(pos1Val), displaying the winner.
        return true;                                            //Returns true to stop checking further.
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);