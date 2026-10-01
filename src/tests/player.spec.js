import { Player } from "../index.js"
const player1 = new Player("Player1")
const player2 = new Player("Player2")
player1.opponent = player2
player2.opponent = player1
player2.randomizeBoard()

test("Randomize board works", () => {
    expect(player1.randomizeBoard()).toBe(true)
})
test("Attacking opponent board works", () => {
    expect(player1.randomAttack()).toBe(true)
})
