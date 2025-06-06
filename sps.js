const moves = document.querySelectorAll(".myMove");
const resetBtn = document.querySelector("#reset-btn");
const compMoveText = document.querySelector(".comp-move p");
const compMove = document.querySelector(".comp-move ");
const scoreBoard = document.querySelector(".score-board p");
const result = document.querySelector(".result");

let plrMove;
let computerMove;
let compScore = 0;
let plrScore = 0;

const choices = ["stone", "paper", "scissor"];

const resetGame = () => {
  compScore = 0;
  plrScore = 0;
  result.classList.add("hide");
  compMoveText.innerText = "Play a move";
  scoreBoard.innerText = `You - ${plrScore} | Computer - ${compScore}`;
};

const getCompChoice = () =>{
  const randomIndex = Math.floor(Math.random()*choices.length);
  return choices[randomIndex];
};

moves.forEach((move) => {
  move.addEventListener("click", () => {
    result.classList.remove("hide");
    plrMove = move.dataset.moveplayed;
    computerMove = getCompChoice();
    const winner = checkWinner(plrMove,computerMove);
    makeUpdates(plrMove, computerMove, winner);
  });
});

const checkWinner = (plr, comp) => {
  if (plr === comp) return "draw";
  if (
    (plr === "stone" && comp === "scissor") ||
    (plr === "paper" && comp === "stone") ||
    (plr === "scissor" && comp === "paper")
  ) return plr;
  return comp;
};

const makeUpdates = (plr, comp, winner) =>{
  compMoveText.innerText = `Computer played - ${comp}`;
  if (winner === "draw"){
    result.innerText = "Play again, it's a Draw";
    result.style.backgroundColor = "transparent";
    result.style.color = "black";
  }
  else if(winner === plr){
    plrScore++;
    result.innerText = `You won 🎉, ${plr} beats ${comp}`;
    result.style.backgroundColor = "#8eda8e";
    result.style.color = "white";
  }
  else {
    compScore++;
    result.innerText = `You lost, ${comp} beats ${plr}`;
    result.style.backgroundColor = "#f16161";
    result.style.color = "white";
  }

  scoreBoard.innerText = `You - ${plrScore} | Computer - ${compScore}`;
};



resetBtn.addEventListener("click",resetGame);