import * as jab from "./jablo.js";

const response = await fetch("./questions.json");
let questions = await response.json();
questions = jab.shuffle(questions);

const p = jab.get("#p");
const p1Txt = jab.get("#p1");
const p2Txt = jab.get("#p2");
const questionContainer = jab.get("#question-container")
const questionTxt = jab.get("#question");

const answerButtons = [];
answerButtons.push(jab.add("button", ".answer", questionContainer));
answerButtons.push(jab.add("button", ".answer", questionContainer));
answerButtons.push(jab.add("button", ".answer", questionContainer));
answerButtons.push(jab.add("button", ".answer", questionContainer));
answerButtons.push(jab.add("button", ".answer", questionContainer));
answerButtons[0].onclick = () => answerClicked(questions[qI].a[0].p);
answerButtons[1].onclick = () => answerClicked(questions[qI].a[1].p);
answerButtons[2].onclick = () => answerClicked(questions[qI].a[2].p);
answerButtons[3].onclick = () => answerClicked(questions[qI].a[3].p);
answerButtons[4].onclick = () => answerClicked(questions[qI].a[4].p);

const winningScore = 10;

let p1Score = 0;
let p2Score = 0;
let player = 1;
let qI = 0;

answerClicked(0);

function gameWon(winningPlayer) {
  answerButtons[0].style.display = "none";
  answerButtons[1].style.display = "none";
  answerButtons[2].style.display = "none";

  p.style.display = "none";
  p1Txt.style.display = "none";
  p2Txt.style.display = "none";

  questionTxt.innerText = `Player ${winningPlayer + 1} wins!`;
}

function answerClicked(score) {
  if (player == 0) {
    p1Score += score;
    if (p1Score < 0) p1Score = 0;
    else if (p1Score >= winningScore) return gameWon(0);
    p1Txt.innerHTML = `Player 1:<br><span style="color: ${score > 0 ? '#00E000' : score != 0 ? 'red' : 'black'};">${p1Score} point${p1Score == 1 ? '' : 's'}!<span>`;
  } else {
    p2Score += score;
    if (p2Score < 0) p2Score = 0;
    else if (p2Score >= winningScore) return gameWon(1);
    p2Txt.innerHTML = `Player 2:<br><span style="color: ${score > 0 ? '#00E000' : score != 0 ? 'red' : 'black'};">${p2Score} point${p2Score == 1 ? '' : 's'}!<span>`;
  }
  if (player == 0) player = 1;
  else player = 0;
  p.innerText = `Player ${player + 1}`;

  qI++;
  if (qI >= questions.length) {
    qI = 0;
    questions = jab.shuffle(questions);
  }
  questionTxt.innerText = questions[qI].q;
  questions[qI].a = jab.shuffle(questions[qI].a);
  for (let i = 0; i < answerButtons.length; i++) {
    if (questions[qI].a[i] == undefined) {
      answerButtons[i].style.display = "none";
    } else {
      answerButtons[i].style.display = "";
      answerButtons[i].innerText = questions[qI].a[i].t;
    }
  }
}