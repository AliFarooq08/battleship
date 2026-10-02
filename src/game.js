import "./styles.css";
import { Ship, Gameboard, Player } from "./index.js"

let mode = null
const gameModeDialog = document.getElementById("choose-mode")
const singlePlayer = document.getElementById("singleplayer")
const multiPlayer = document.getElementById("multiplayer")

let player1
let player2

const selectionBoard = document.querySelector(".board")
const secondPlayer = document.querySelector(".second-player")

const naming = document.getElementById("player-names")
const nameForm = document.getElementById("name-form")
const player = document.querySelector(".player")

const turn = document.getElementById("turn")
const whoseTurn = document.getElementById("whose-turn")
const turnClose = document.getElementById("confirm-turn")
let draggedElement = null
let draggedDirection = null
let currentPlayer = ""

const allShips = document.querySelectorAll(".ship")
const left = document.getElementById("left")
const boardRandomize = document.getElementById("board-randomize")
boardRandomize.addEventListener("click", () => {
    selectionBoard.replaceChildren()
    currentPlayer.randomizeBoard()
    createBoard(currentPlayer, selectionBoard)
})

const right = document.getElementById("right")
const confirmSelection = document.createElement("button")
confirmSelection.textContent = "Done?"
confirmSelection.id = "confirm-selection"

let part = 1
let player1Shoot
let player2Shoot
const boardOne = document.createElement("div")
const boardTwo = document.createElement("div")

const body = document.getElementById("body")

function createBoard(player, board) {
    player.board.board.forEach((y, yindex) => {
        y.forEach((x, xindex) => {
            const node = document.createElement("div")
            node.className = `blank`
            node.id = "node"
            node.textContent = x
            board.append(node)
            if (part === 1) {
                if (x !== 0) {
                    const ships = ["carrier", "battleship", "destroyer", "submarine", "patrolBoat"]
                    for (let currentShip = 0; currentShip <= ships.length; currentShip++) {
                        if (x === player.board[ships[currentShip]]) {
                            if (part === 1) {
                                node.className = ships[currentShip]
                            }
                        }
                    }
                    if (part === 1) {
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
                            createBoard(player, board)
                        });
                    }
                }
            }
            node.addEventListener("dragover", (event) => {
                event.preventDefault();
            });
            node.addEventListener("dragenter", (event) => {
                event.preventDefault()
                if (x !== "H" && x !== "M") {
                    node.className = "hovered"
                }
            })
            node.addEventListener("dragleave", (event) => {
                event.preventDefault()
                if (x !== "H" && x !== "M") {
                    node.className = "blank"
                }
            })
            node.addEventListener("drop", (event) => {
                event.preventDefault()
                if (x === 0 && part === 1) {
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
                        createBoard(player, board)
                    }
                }
            });
            node.addEventListener("click", () => {
                if (part === 2 && node.className !== "miss" && node.className !== "hit") {
                    if (player.name === currentPlayer.name) {
                        const shot = player.board.receiveAttack(xindex, yindex)
                        if (shot === "M") {
                            node.className = "miss"
                        } else if (shot === "H") {
                            node.className = "hit"
                        }
                        if (player.board.checkWin() === true) {
                            body.replaceChildren()
                            const winningMessage = document.createElement("h1")
                            winningMessage.textContent = `${currentPlayer.name} wins!`
                            winningMessage.style.fontSize = "3rem"
                            winningMessage.style.textAlign = "center"
                            body.style.display = "flex"
                            body.append(winningMessage)
                        }
                        if (currentPlayer.name === player1Shoot.name) {
                                if (mode === "singleplayer") {
                                    const computerShot = player2Shoot.randomAttack()
                                    console.log(computerShot)
                                    if (computerShot[0] === "M") {
                                        boardTwo.children[(computerShot[2] * 10) + computerShot[1]].className = "miss"
                                    } else if (computerShot[0] === "H") {
                                        boardTwo.children[(computerShot[2] * 10) + computerShot[1]].className = "hit"
                                    }
                                    currentPlayer = player1Shoot
                                } else {
                                    currentPlayer = player2Shoot
                                }
                        } else if (currentPlayer.name === player2Shoot.name) {
                            currentPlayer = player1Shoot
                        }
                    }
                }
            });
        });
    });
}

nameForm.addEventListener("submit", () => {
    if (mode === "multiplayer") {
        player.textContent = `${document.getElementById("player1-name").value}`
        player1 = new Player(document.getElementById("player1-name").value)
        player2 = new Player(document.getElementById("player2-name").value)
        naming.close()
        currentPlayer = player1
        whoseTurn.textContent = `Hand screen over to ${player1.name}...`
        createBoard(player1, selectionBoard)
        turn.showModal()
    } else if (mode === "singleplayer") {
        player.textContent = `${document.getElementById("player1-name").value}`
        player1 = new Player(document.getElementById("player1-name").value)
        player2 = new Player("Computer")
        createBoard(player1, selectionBoard)
        naming.close()
        currentPlayer = player1
    }
    right.append(confirmSelection)
});
turnClose.addEventListener("click", () => {
    if (currentPlayer.name === player2.name) {
        selectionBoard.replaceChildren()
        createBoard(player2, selectionBoard)
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
    let shipCount = 0
    currentPlayer.board.board.forEach((y, yindex) => {
        y.forEach((x, xindex) => {
            if (x !== 0 && x !== "H" && x !== "M") {
                shipCount++
            }
        });
    });
    if (shipCount === 17) {
        if (mode === "singleplayer") {
            player2.randomizeBoard()
            console.log("Make the board")
            console.log(player2.board.board)
            startGame()
        } else if (mode === "multiplayer") {
            if (currentPlayer.name === player1.name) {
                currentPlayer = player2
                whoseTurn.textContent = `Hand screen over to ${currentPlayer.name}`
                player.textContent = currentPlayer.name
                turn.showModal()
            } else if (currentPlayer.name === player2.name) {
                currentPlayer = player1
                startGame()
            }
        }
    } else {
        alert("Place all boats first!")
    }
});
function startGame() {
    part = 2
    currentPlayer = player1
    body.style.gridTemplateColumns = "50vw 50vw"
    left.replaceChildren()
    right.replaceChildren()
    boardOne.className = "board"
    boardTwo.className = "board"
    const boardOneTitle = document.createElement("h1")
    const boardTwoTitle = document.createElement("h1")
    boardOneTitle.textContent = `${player2.name}'s Board`
    boardTwoTitle.textContent = `${player1.name}'s Board`
    left.append(boardOneTitle)
    left.append(boardOne)
    right.append(boardTwoTitle)
    right.append(boardTwo)
    player1Shoot = new Player(player1.name)
    player2Shoot = new Player(player2.name)
    player1Shoot.board.board = player2.board.board
    player2Shoot.board.board = player1.board.board
    left.style.marginleft = "5vw"
    createBoard(player1Shoot, boardOne)
    createBoard(player2Shoot, boardTwo)
}
gameModeDialog.showModal()