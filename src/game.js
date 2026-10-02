import "./styles.css";
import { Ship, Gameboard, Player } from "./index.js"

let player1
let player2

const board1 = document.getElementById("board1")
const board2 = document.getElementById("board2")
const naming = document.getElementById("playerNames")
const nameForm = document.getElementById("name-form")
const player1Name = document.querySelector(".player1")
const player2Name = document.querySelector(".player2")
const turn = document.getElementById("turn")
const turnClose = document.getElementById("confirm-turn")
const whoseTurn = document.getElementById("whose-turn")
const allShips = document.querySelectorAll(".ship")
let draggedElement = null
let draggedDirection = null
let currentPlayer = ""
function initializeGrid(player, board) {
    player.board.board.forEach((y, yindex) => {
        y.forEach((x, xindex) => {
            const node = document.createElement("div")
            node.className = `blank`
            node.id = "node"
            node.textContent = x
            board.append(node)
            if (x !== 0 && x !== "H" && x !== "M") {
                const ships = ["carrier", "battleship", "destroyer", "submarine", "patrolBoat"]
                for (let currentShip = 0; currentShip <= ships.length; currentShip++) {
                    if (x === player.board[ships[currentShip]]) {
                        node.className = ships[currentShip]
                    }
                }
                node.addEventListener("contextmenu", (e) => {
                    e.preventDefault()
                    player.board.board.forEach((y, yindex) =>  {
                        y.forEach((x, xindex) => {
                            if (x === player.board[node.className]) {
                                player.board.board[yindex][xindex] = 0
                            }
                        });
                    });
                    player.board[node.className] = false
                    console.log(player.board[node.className])
                    console.log(player.board.board)
                    board.replaceChildren()
                    initializeGrid(player, board)
                });
            } else {
                node.addEventListener("dragover", (event) => {
                    event.preventDefault();
                });
                node.addEventListener("dragenter", (event) => {
                    event.preventDefault()
                    node.className = "hovered"
                })
                node.addEventListener("dragleave", (event) => {
                    event.preventDefault()
                    node.className = "blank"
                })
                node.addEventListener("drop", (event) => {
                    event.preventDefault()
                    if (x === 0) {
                        let boat
                        if (draggedElement.id === "patrol-boat") {
                            boat = "patrolBoat"
                        } else {
                            boat = draggedElement.id
                        }
                        if (player.board.placeShip(xindex, yindex, boat, draggedDirection) === false) {
                            node.className = "blank"
                            alert("Bad placement!")
                        } else {
                            board.replaceChildren()
                            initializeGrid(player, board)
                        }
                    }
                })
            }
        })
    })
}

naming.showModal()
nameForm.addEventListener("submit", () => {
    player1Name.textContent = `${document.getElementById("player1-name").value}`
    player2Name.textContent = `${document.getElementById("player2-name").value}`
    player1 = new Player(document.getElementById("player1-name").value)
    player2 = new Player(document.getElementById("player2-name").value)
    console.log(player1.board.board)
    console.log(player2.board.board)
    naming.close()
    currentPlayer = player1Name.textContent
    whoseTurn.textContent = `Hand screen over to ${player1Name.textContent}...`
    initializeGrid(player1, board1)
    initializeGrid(player2, board2)
    turn.showModal()
});
turnClose.addEventListener("click", () => {
    if (currentPlayer === player1Name.textContent) {
        whoseTurn.textContent = `Hand screen over to ${player2Name.textContent}`
    } else if (currentPlayer === player2Name.textContent) {
        whoseTurn.textContent = `Hand screen over to ${player1Name.textContent}`
    }
    turn.close()
});
allShips.forEach(ship => {
    ship.addEventListener("contextmenu", (e) => {
        e.preventDefault()
        if (ship.style.flexDirection === "row") {
            ship.style.flexDirection = "column"
        } else {
            ship.style.flexDirection = "row"
        }
    });
    ship.addEventListener("drag", (event) => {
        draggedElement = event.target
        if (window.getComputedStyle(ship).flexDirection === "row") {
            draggedDirection = "x"
        } else if (window.getComputedStyle(ship).flexDirection === "column") {
            draggedDirection = "y"
        }
        
    })
});
