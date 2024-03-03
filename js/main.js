//constants and variables
let highScoreVal = localStorage.getItem("highscore");
const highScoreBox = document.querySelector(".high-score-val");
const scoreVal = document.querySelector(".score-val");
const board = document.querySelector(".board");
const foodSound = new Audio("./assets/hiss.mp3");
const gameOverSound = new Audio("./asseta/gameOver.mp3");
const moveSound = new Audio("./assets/move.wav");
const musicSound = new Audio("./assets/hiss.mp3");
let direction = { x: 0, y: 0 };
let lastTime = 0;
let speed = 10;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 5, y: 4 };
let score = 0;

if (highScoreVal == null) {
  localStorage.setItem("highscore", "0");
} else {
  highScoreBox.innerHTML = JSON.parse(highScoreVal);
}
//game functions
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastTime) / 1000 < 1 / speed) {
    return;
  }
  lastTime = ctime;
  gameEngine();
}

function isCollide(snakeArr) {
  //if snake bump into itself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
      return true;
    }
  }
  if (
    snakeArr[0].x < 0 ||
    snakeArr[0].y < 0 ||
    snakeArr[0].x > 18 ||
    snakeArr[0].y > 18
  ) {
    return true;
  }
  return false;
}

function gameEngine() {
  //COllison handling
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    direction = { x: 0, y: 0 };
    alert("Game Over");
    scoreVal.innerHTML = "0";
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;
  }
  //Snake has eaten the food

  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    score++;
    scoreVal.innerHTML = score;
    if (score > highScoreVal) {
      highScoreVal = score;
      localStorage.setItem("highscore", JSON.stringify(highScoreVal));
      highScoreBox.innerHTML = highScoreVal;
    }
    foodSound.play();
    snakeArr.unshift({
      x: snakeArr[0].x + direction.x,
      y: snakeArr[0].y + direction.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }
  //Moving the snake
  for (let index = snakeArr.length - 2; index >= 0; index--) {
    snakeArr[index + 1] = { ...snakeArr[index] };
  }
  snakeArr[0].x += direction.x;
  snakeArr[0].y += direction.y;
  //display the snake
  board.innerHTML = "";
  snakeArr.forEach((ele, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = ele.y;
    snakeElement.style.gridColumnStart = ele.x;
    if (index == 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  //display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//main function
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  direction = { x: 0, y: 1 };
  switch (e.key) {
    case "ArrowUp":
      direction.x = 0;
      direction.y = -1;
      break;
    case "ArrowDown":
      direction.x = 0;
      direction.y = 1;
      break;
    case "ArrowLeft":
      direction.x = -1;
      direction.y = 0;
      break;
    case "ArrowRight":
      direction.x = 1;
      direction.y = 0;
      break;
    default:
      break;
  }
  moveSound.play();
});
