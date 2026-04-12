import "./styles.css";
import {
  renderGrid,
  renderBox,
  renderShips,
  renderPlayerBox,
} from "./render-dom.js";
import { Player } from "./player.js";
import { populateComputerMove } from "./computer-logic.js";

let message;
let realPlayer;
let computerPlayer;
let attacker;
let defender;

document.addEventListener("DOMContentLoaded", () => {
  realPlayer = new Player("player");
  realPlayer.gameboard.shipsPlacements = "player";

  computerPlayer = new Player("computer");
  computerPlayer.gameboard.shipsPlacements = "computer";

  attacker = realPlayer;
  defender = computerPlayer;

  message = document.querySelector(".messages");
  announcePlayer();

  renderGrid(computerPlayer);
  renderGrid(realPlayer);

  renderShips(computerPlayer);
  renderShips(realPlayer);
});

document.querySelector(".wrapper").addEventListener("click", (event) => {
  const target = event.target;

  if (!target.classList.contains("box")) return;
  if (target.classList.contains(`player-box`)) return;
  if (attacker.name === "computer") return;

  let attack = defender.gameboard.receiveAttack(
    +target.dataset.x,
    +target.dataset.y,
  );

  if (attack === "invalid") return;

  if (announceWinner()) return;

  renderBox(defender, target);

  switchPlayers();
  announcePlayer();

  setTimeout(() => {
    computerToAttack();
  }, 1000);
});

function computerToAttack() {
  let coordinates = populateComputerMove();
  let x = coordinates[0];
  let y = coordinates[1];

  let attack = defender.gameboard.receiveAttack(x, y);

  if (attack === "invalid") {
    computerToAttack();
    return;
  }

  if (announceWinner()) return;

  renderPlayerBox(x, y, attack);

  switchPlayers();
  announcePlayer();
}

function announceWinner() {
  if (defender.gameboard.isAllSunk()) {
    message.textContent = `${attacker.name} is the winner`;
    return true;
  }
}

function announcePlayer() {
  if (attacker.name === "computer") {
    message.textContent = `Computer is attacking .....`;
  }

  if (attacker.name === "player") {
    message.textContent = `Player to attack`;
  }
}

function switchPlayers() {
  if (attacker.name === "player") {
    attacker = computerPlayer;
    defender = realPlayer;
  } else {
    attacker = realPlayer;
    defender = computerPlayer;
  }
}
