export { renderGrid, renderBox, renderShips, renderPlayerBox };

function renderGrid(player) {
  let gameboardContainer;
  if (player.name !== "computer") {
    gameboardContainer = document.querySelector(`.${player.name}-gameboard`);
  } else {
    gameboardContainer = document.querySelector(`.computer-gameboard`);
  }

  gameboardContainer.textContent = "";

  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      let div = document.createElement("div");
      div.classList.add("box");

      if (player.name !== "computer") {
        div.classList.add(`${player.name}-box`);
      } else {
        div.classList.add(`computer-box`);
      }

      div.dataset.x = i;
      div.dataset.y = j;

      gameboardContainer.appendChild(div);
    }
  }
}

function renderShips(player) {
  const ships = player.gameboard.shipsPlacements;
  let coordinates = [];
  ships.forEach((ship) => coordinates.push(ship.coordinates));
  const coordinatesArr = coordinates.flat();

  let boxes;

  if (player.name !== "computer") {
    boxes = document.querySelectorAll(".player-box");
  } else {
    boxes = document.querySelectorAll(".computer-box");
  }

  for (let box of boxes) {
    for (let coo of coordinatesArr) {
      let cooX = coo[0];
      let cooY = coo[1];

      let boxX = +box.dataset.x;
      let boxY = +box.dataset.y;

      if (cooX === boxX && cooY === boxY) {
        box.classList.add("ship-on-grid");
      }
    }
  }
}

function renderBox(player, target) {
  const ships = player.gameboard.shipsPlacements;
  let coordinates = [];
  ships.forEach((ship) => coordinates.push(ship.coordinates));
  const coordinatesArr = coordinates.flat();

  let x = +target.dataset.x;
  let y = +target.dataset.y;

  for (let coo of coordinatesArr) {
    if (coo[0] === x && coo[1] === y) {
      target.classList.remove("ship-on-grid");
      target.classList.add("hit");
      return;
    }
  }

  target.classList.add("miss");
}

function renderPlayerBox(x, y, status) {
  let boxX = `[data-x="${x}"]`;
  let boxY = `[data-y="${y}"]`;

  const box = document.querySelector(`${boxX}${boxY}`);

  if (status === true) {
    box.classList.remove("ship-on-grid");
    box.classList.add("hit");
  }

  if (status === false) {
    box.classList.add("miss");
  }
}
