const http = require("http");
const server = http.createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },  
});
const { createGameState, gameLoop } = require("./game");
const { FRAME_RATE } = require("./constants");
const { clearInterval } = require("timers");

io.on("connection", (client) => {
  const state = createGameState();
  startGameInterval(client, state);
});

function startGameInterval(client, state) {
  const intervalId = setInterval(() => {
    const winner = gameLoop(state);
    if (!winner) {
      client.emit("gamestate", JSON.stringify(state));
    } else {
      client.emit("gameOver");
      clearInterval(intervalId);
    }
  }, 1000 / FRAME_RATE);
}

io.listen(3000, () => console.log("running"));
