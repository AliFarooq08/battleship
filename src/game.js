import "./styles.css";
import { Ship, Gameboard, Player } from "./index.js"
const board1 = document.getElementById("board1")
const board2 = document.getElementById("board2")

function initializeGrid(board) {
    for (let i = 0; i < 100; i++) {
        const node = document.createElement("div")
        node.className = `blank`
        node.id = "node"
        board.append(node)
    }
}
initializeGrid(board1)
initializeGrid(board2)