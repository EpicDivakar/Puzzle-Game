const game = document.getElementById("game");
const message = document.getElementById("message");
let tiles = [];

function createTiles() {
  tiles = [...Array(15).keys()].map(x => x + 1);
  tiles.push(""); // empty tile

  shuffleTiles();
  renderTiles();
}

function shuffleTiles() {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
}

function renderTiles() {
  game.innerHTML = "";
  tiles.forEach((tile, index) => {
    const div = document.createElement("div");
    div.classList.add("tile");
    if (tile === "") div.classList.add("empty");

    div.innerText = tile;
    div.addEventListener("click", () => moveTile(index));
    game.appendChild(div);
  });
}

function moveTile(index) {
  const emptyIndex = tiles.indexOf("");

  const canMove = [1, -1, 4, -4].some(offset => index + offset === emptyIndex &&
    !(index % 4 === 3 && offset === 1) &&
    !(index % 4 === 0 && offset === -1));

  if (canMove) {
    [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
    renderTiles();
    checkWin();
  }
}

function checkWin() {
  const isWon = tiles.slice(0, 15).every((tile, i) => tile === i + 1);
  if (isWon) {
    message.innerHTML = "🎉 You solved the puzzle! Great job!";
  } else {
    message.innerHTML = "";
  }
}

createTiles();

