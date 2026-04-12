import "./styles.css";
import { renderGrid, renderBox, renderShips } from "./render-dom.js";
import { Player } from "./player.js";

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
    message.textContent = `${attacker.name} To Attack`;

    renderGrid(computerPlayer);
    renderGrid(realPlayer);

    renderShips(computerPlayer);
    renderShips(realPlayer);
})

document.querySelector('.wrapper').addEventListener("click", event => {
    const target = event.target;

    if (!target.classList.contains("box")) return;
    if (target.classList.contains(`${attacker.name}-box`)) return;

    let x = +target.dataset.x;
    let y = +target.dataset.y;

    if (defender.gameboard.receiveAttack(x, y) === "invalid") return;

    renderBox(defender, target);
    if (announceWinner()) return;
    announceNextPlayer();
    switchPlayers();
})

function announceWinner() {
    if (defender.gameboard.isAllSunk()) {
        message.textContent = `${attacker.name} is the winner`;
        return true;
    }
}

function announceNextPlayer() {
    message.textContent = `${defender.name} To Attack`;
}

function switchPlayers() {
    if (attacker.name === 'player') {
        attacker = computerPlayer;
        defender = realPlayer;
    } else {
        attacker = realPlayer;
        defender = computerPlayer;
    }
}