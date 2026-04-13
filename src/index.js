import "./styles.css";
import {
  renderGrid,
  renderBox,
  renderShips,
  renderPlayerBox,
} from "./render-dom.js";
import { Player } from "./player.js";
import { populateComputerMove } from "./computer-logic.js";

let message = document.querySelector(".messages");
let firstMessage = "Click on Randomize or start attacking right away...";
let realPlayer;
let computerPlayer;
let attacker;
let defender;
let win = null;

document.addEventListener("DOMContentLoaded", () => {
  realPlayer = new Player("player");
  computerPlayer = new Player("computer");

  attacker = realPlayer;
  defender = computerPlayer;

  message.textContent = firstMessage;

  renderGrid(computerPlayer);
  //   renderShips(computerPlayer);

  renderGrid(realPlayer);
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

  if (win === true) return;
  renderBox(defender, target);

  if (announceWinner()) return;

  switchPlayers();
  announcePlayer();

  setTimeout(() => {
    computerToAttack();
  }, 1000);
});

document.querySelector(".random-button").addEventListener("click", () => {
  realPlayer = new Player("player");
  computerPlayer = new Player("computer");

  attacker = realPlayer;
  defender = computerPlayer;

  message.textContent = firstMessage;

  win = null;

  renderGrid(computerPlayer);
  renderGrid(realPlayer);

  renderShips(realPlayer);
  //   renderShips(computerPlayer);
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

  if (win === true) return;
  renderPlayerBox(x, y, attack);

  if (announceWinner()) return;

  switchPlayers();
  announcePlayer();
}

function announceWinner() {
  if (defender.gameboard.isAllSunk()) {
    win = true;
    message.textContent = `${attacker.name} is the winner 🎉🎉🎉🎉🎉`;
    return true;
  }

  return false;
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
