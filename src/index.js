import "./styles.css";
class Ship {
    constructor(length) {
        this.shipLength = length
        this.hits = 0
        this.sunk = false
    }
    hit() {
        if (this.isSunk() === false) {
            this.hits++
            this.isSunk()
        }
    }
    isSunk() {
        if (this.hits === this.shipLength) {
            return this.sunk = true
        } else {
            return this.sunk = false
        }
    }
}
class Gameboard {
    constructor() {
        this.board = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
        this.carrier = false
        this.battleship = false
        this.destroyer = false
        this.submarine = false
        this.patrolBoat = false
    }
    



}
export { Ship }
