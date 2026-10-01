import { Ship, Gameboard } from "../index.js"
const myGameBoard = new Gameboard()
test("Gameboard doesn't allow carrier at x = 6", () => {
    expect(myGameBoard.placeBoat(6, 2, "carrier", "x")).toBe(false)
})
test("Gameboard doesn't allow battleship at x = 7", () => {
    expect(myGameBoard.placeBoat(7, 2, "battleship", "x")).toBe(false)
})
test("Gameboard doesn't allow destroyer at x = 8", () => {
    expect(myGameBoard.placeBoat(8, 2, "destroyer", "x")).toBe(false)
})
test("Gameboard doesn't allow submarine at x = 8", () => {
    expect(myGameBoard.placeBoat(8, 2, "submarine", "x")).toBe(false)
})
test("Gameboard doesn't allow patrolboat at x = 9", () => {
    expect(myGameBoard.placeBoat(9, 0, "patrolBoat", "x")).toBe(false)
})
test("Gameboard succesfully places patrolBoat at (8, 8)", () => {
    myGameBoard.placeBoat(8, 9, "patrolBoat", "x")
    expect(myGameBoard.board[9][8] instanceof Ship && myGameBoard.board[9][9] instanceof Ship).toBe(true)
})
test("Gameboard doesn't allow a second patrolBoat", () => {
    expect(myGameBoard.placeBoat(6, 9, "patrolBoat", "x")).toBe(false)
})
test("Gameboard succesfully places carrier at (1, 3)", () => {
    myGameBoard.placeBoat(1, 3, "carrier", "x")
    expect(myGameBoard.board[3][1] instanceof Ship && myGameBoard.board[3][5] instanceof Ship).toBe(true)
})
test("Gameboard doesn't allow a second carrier", () => {
    expect(myGameBoard.placeBoat(5, 4, "carrier", "x")).toBe(false)
})
test("Gameboard succesfully places battleship at (4, 4)", () => {
    myGameBoard.placeBoat(4, 4, "battleship", "x")
    expect(myGameBoard.board[4][4] instanceof Ship && myGameBoard.board[4][7] instanceof Ship).toBe(true)
})
test("Gameboard doesn't allow a second battleship", () => {
    expect(myGameBoard.placeBoat(1, 4, "battleship", "x")).toBe(false)
})
test("Gameboard succesfully places destroyer at (3, 5)", () => {
    myGameBoard.placeBoat(3, 5, "destroyer", "x")
    expect(myGameBoard.board[5][3] instanceof Ship && myGameBoard.board[5][5] instanceof Ship).toBe(true)
})
test("Gameboard doesn't allow a second destroyer", () => {
    expect(myGameBoard.placeBoat(6, 4, "destroyer", "x")).toBe(false)
})
test("Gameboard succesfully places submarine at (6, 6)", () => {
    myGameBoard.placeBoat(6, 6, "submarine", "x")
    expect(myGameBoard.board[6][6] instanceof Ship && myGameBoard.board[6][8] instanceof Ship).toBe(true)
})
test("Gameboard doesn't allow a second submarine", () => {
    expect(myGameBoard.placeBoat(9, 5, "submarine", "y")).toBe(false)
})






