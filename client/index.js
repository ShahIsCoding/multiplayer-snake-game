const BG_COLOR = "#231f20";
const SNAKE_COLOR = "#c2c2c2";
const FOOD_COLOR = "#e66916";


const socket = io('http://localhost:3000');
socket.on('init',handleInit);
socket.on('gamestate',handleGameState);
const gameScreen = document.getElementById("gameScreen");


let canvas, ctx;
let gameState = {
  player: {
    pos: {
      x: 3,
      y: 10,
    },
    vel: {
      x: 1,
      y: 0,
    },
    snake: [
      { x: 1, y: 10 },
      { x: 2, y: 10 },
      { x: 3, y: 10 },
    ],
  },
  food: {
    x: 7,
    y: 7,
  },
  gridSize: 20,
};

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  canvas.width = canvas.height = 600;
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  document.addEventListener("keydown", keydown);
}

function keydown(e) {
  console.log(e.keyCode);
}

init();

function paintGame(state) {
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const food = state.food;
  const gridSize = state.gridSize;
  const size = canvas.width / gridSize;

  ctx.fillStyle = FOOD_COLOR;
  ctx.fillRect(food.x * size, food.y * size, size, size); //x position , y position, width in x , height in y

  paintPlayer(state.player, size, SNAKE_COLOR);
}

function paintPlayer(playerState, size, color) {
  const snake = playerState.snake;

  ctx.fillStyle = color;
  for (let cell of snake) {
      console.log(cell);
    ctx.fillRect(cell.x * size, cell.y * size, size, size);
  }
}

function handleInit(message){
    console.log(message);
}
function handleGameState(gameState){
  gameState = JSON.parse(gameState);
  requestAnimationFrame(()=>paintGame(gameState));
}