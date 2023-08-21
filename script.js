//Game constants and variables
let inputDir = { x: 0, y: 0 };
const moveSound = new Audio("audios/key press tone 2.mp3");
const bgSound = new Audio("audios/Snake Music.mp3");
const hitSound = new Audio("audios/Game Over (1).mp3");
const gameOverSound = new Audio("audios/Game Over.mp3");
const eatSound = new Audio("audios/Apple-bite.mp3");
// let foodBgArr = [
//   "url(images/apple.png)",
//   "url(images/bananas.png)",
//   "url(images/grapes.png)",
//   "url(images/mango.png)",
//   "url(images/orange-juice.png)",
//   "url(images/pineapple.png)",
//   "url(images/strawberry.png)",
//   "url(images/watermelon.png)",
// ];
let score = 0;
let speed = 4;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }]; //snake body
let food = { x: 2, y: 8 }; //food is not an array becuse it is a single particle and it won't grow
// bgSound.play();












//difficulty level
function change(){

  let difficulty=parseInt(document.getElementById("dLevel").value);
  // console.log(difficulty);
  speed=difficulty;
}



//Game functions
function main(cTime) {


  window.requestAnimationFrame(main); //use requestAnimationFrame over setTimeOut because it offers high fps and without flickering
  // console.log(cTime);//check fps
  if ((cTime - lastPaintTime) / 1000 < 1 / speed) {
    //divided by 1000 because it is miliseconds and speed is the time after which the things will be executed

    return; //dont do anything untill this time
  }
  lastPaintTime = cTime;
  // console.log(cTime);//check fps
  gameEngine();
}
function isCollide(sArr) {
  // return false;
  //2 conditions (i)if it collides or bumps within itself or (ii)it collides with wall/boundary
  //(i)it pumps into itself
  for (let i = 1; i < sArr.length; i++) {
    if (sArr[0].x === sArr[i].x && sArr[0].y === sArr[i].y) return true;
  }
  //(ii)if it collides with wall/boundary
  if (sArr[0].x >= 18 || sArr[0].x <= 0 || sArr[0].y >= 18 || sArr[0].y <= 0) {
    return true;
  }
}

function gameEngine() {
  //part 1: updating snake and food

  //~what happens on collison~...
  if (isCollide(snakeArr)) {
    currscore.classList.remove("animate");
    bgSound.pause();
    hitSound.play();
    gameOverSound.play();
    inputDir = { x: 0, y: 0 };
    // alert("Game Over ! Press any key to play again");
    snakeArr = [{ x: 13, y: 15 }]; //reset all values
    const go = document.querySelector(".gameover");
    go.style.opacity = "1";
    go.style.pointerEvents = "auto";
    const restartg = document.querySelector("#restart");
    restartg.addEventListener("click", () => {
      window.location.reload(true);
    });

    //changing food
    // const bgfood=document.querySelector(".food");
    // let noOfFactor=0;
    // let indexOfFood=0;
    // for(let j=1;j<score;j++){
    //     if(score%j==0){
    //         noOfFactor++;
    //     }
    // }
    // if(noOfFactor===1){
    //     indexOfFood=2;
    // }
    // bgfood.style.backgroundImage=foodBgArr[indexOfFood];
  }

  //~what happens on food being eaten~...
  //if the food is eaten then increment the score and regenerate the food somewhere
  if ((snakeArr[0].x === food.x) & (snakeArr[0].y === food.y)) {
    eatSound.play();
    score += 1;
    if (score > hscoreInNum) {
      hscoreInNum = score;
      localStorage.setItem("highScore", JSON.stringify(hscoreInNum));
      num.innerHTML = hscoreInNum;
    }
    currscore.innerHTML = "Score : " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    //it will ensure that random numbers will be generated between a and b and the values 2 and 16 will ensure that the food will not be placed near boundary
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    }; //generating food at random cordinates
  }

  //moving the snake...
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  //part 2: displaying snake and food
  //display snake
  const board = document.querySelector(".board");
  board.innerHTML = "";
  snakeArr.forEach((element, index) => {
    snakeElement = document.createElement("div"); //creating a div
    snakeElement.style.gridRowStart = element.y; //row is here represented by y as row no. is defned on y-scale
    snakeElement.style.gridColumnStart = element.x; //column is here represented by x as column no. is defned on x-scale
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement); //attaching the div
  });
  //display food
  foodElement = document.createElement("div");
  //food variable is refering to an object with x and y as keys
  foodElement.style.gridRowStart = food.y; //row is here represented by y as row no. is defned on y-scale
  foodElement.style.gridColumnStart = food.x; //column is here represented by x as column no. is defned on x-scale
  foodElement.classList.add("food");
  board.appendChild(foodElement); //attaching the div
}

//Main logic
bgSound.play();

if(typeof bgSound.loop=='boolean')
{
    bgSound.loop=true;
}
else{
    bgSound.addEventListener('ended',()=>{
        this.crrentTime=0;
        this.play();
    },false)
}
let highScore = localStorage.getItem("highScore");
if (highScore === null) {
  // console.log("its null");
  hscoreInNum = 0;
  localStorage.setItem("highScore", JSON.stringify(hscoreInNum));
} else {
  hscoreInNum = JSON.parse(highScore);
  num.innerHTML = hscoreInNum;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  document.querySelector(".pts").style.visibility = "hidden";
  currscore.classList.add("animate");
  inputDir = { x: 0, y: 1 }; //starts game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      // console.log(e.key);

      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      // console.log(e.key);
      // headDir.style.transform="rotate(0deg)";
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      // console.log(e.key);
      // headDir.style.transform="rotate(90deg)";
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      // console.log(e.key);
      // headDir.style.transform="rotate(-90deg)";
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
    //   console.log("nope");
      break;
  }
});

//personal doubts
//changing backgroung image of food
// let foodBgArr=['url(images/apple.png)','url(images/bananas.png)','url(images/grapes.png)','url(images/mango.png)','url(images/orange-juice.png)','url(images/pineapple.png)','url(images/strawberry.png)','url(images/watermelon.png)'];
// const bgfood=document.querySelector(".food");
// const indexOfFood=Math.round(0+(8-0)*Math.random());
// bgfood.style.backgroundImage=foodBgArr[indexOfFood];//rotating head of snake upon changing direction
