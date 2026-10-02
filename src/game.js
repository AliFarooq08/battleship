import "./styles.css";
import { Ship, Gameboard, Player } from "./index.js"

let mode = null
const gameModeDialog = document.getElementById("choose-mode")
const singlePlayer = document.getElementById("singleplayer")
const multiPlayer = document.getElementById("multiplayer")

let player1
let player2

const board = document.getElementById("board")
const secondPlayer = document.querySelector(".second-player")

const naming = document.getElementById("player-names")
const nameForm = document.getElementById("name-form")
const player = document.querySelector(".player")

const turn = document.getElementById("turn")
const whoseTurn = document.getElementById("whose-turn")
const turnClose = document.getElementById("confirm-turn")

const allShips = document.querySelectorAll(".ship")
const left = document.getElementById("left")
const confirmSelection = document.createElement("button")
confirmSelection.textContent = "Done?"
confirmSelection.id = "confirm-selection"

let draggedElement = null
let draggedDirection = null
let currentPlayer = ""

function createBoard(player) {
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
                    board.replaceChildren()
                    createBoard(player)
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
                            alert("Bad placement (places from leftmost if horizontal, places from topmost if vertical), duplicate piece, or placing on top of ship!")
                        } else {
                            board.replaceChildren()
                            createBoard(player)
                        }
                    }
                });
            }
        });
    });
}

nameForm.addEventListener("submit", () => {
    if (mode === "multiplayer") {
        player.textContent = `${document.getElementById("player1-name").value}`
        player1 = new Player(document.getElementById("player1-name").value)
        player2 = new Player(document.getElementById("player2-name").value)
        naming.close()
        currentPlayer = player1.name
        whoseTurn.textContent = `Hand screen over to ${player1.name}...`
        createBoard(player1)
        turn.showModal()
    } else if (mode === "singleplayer") {
        player.textContent = `${document.getElementById("player1-name").value}`
        player1 = new Player(document.getElementById("player1-name").value)
        player2 = new Player("computer")
        createBoard(player1)
        naming.close()
        currentPlayer = player1.name
    }
    right.append(confirmSelection)
});
turnClose.addEventListener("click", () => {
    if (currentPlayer === player2.name) {
        board.replaceChildren()
        createBoard(player2)
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
singlePlayer.addEventListener("click", (e) => {
    e.preventDefault()
    mode = "singleplayer"
    gameModeDialog.close()
    naming.showModal()
    secondPlayer.replaceChildren()

})
multiPlayer.addEventListener("click", (e) => {
    e.preventDefault()
    mode = "multiplayer"
    gameModeDialog.close()
    naming.showModal()
});
confirmSelection.addEventListener("click", () => {
    let currentPlayerObject
    if (currentPlayer === player1.name) {
        currentPlayerObject = player1
    } else if (currentPlayer === player2.name) {
        currentPlayerObject = player2
    }
    let shipCount = 0
    currentPlayerObject.board.board.forEach((y, yindex) => {
        y.forEach((x, xindex) => {
            if (x !== 0 && x !== "H" && x !== "M") {
                shipCount++
            }
        });
    });
    if (shipCount === 17) {
        if (mode === "singleplayer") {
            if (currentPlayer === player1.name) {
                player2.randomizeBoard()
                console.log(player2.board.board)
                startGame()
            }
        } else if (mode === "multiplayer") {
            if (currentPlayer === player1.name) {
                whoseTurn.textContent = `Hand screen over to ${player2.name}`
                currentPlayer = player2.name
                player.textContent = player2.name
                turn.showModal()
            } else if (currentPlayer === player2.name) {
                startGame()
            }
        }
    } else {
        alert("Place all boats first!")
    }
});
function startGame() {
    console.log("Start")
}
gameModeDialog.showModal()