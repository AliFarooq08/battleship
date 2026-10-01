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
        this.hitCount = 0
    }
    placeShip(x, y, shipType, direction) {
        const lengths = {carrier: 5, battleship: 4, destroyer: 3, submarine: 3, patrolBoat: 2}
        const length = lengths[shipType]
        if (x < 0 || x > 9 || y < 0 || y > 9) return false // initial position out-of-bounds check
        if (!length || this[shipType] !== false) return false // duplicate ship type check
        if (direction === "x" && x + length > 10) return false // end position out-of-bounds check
        if (direction === "y" && y + length > 10) return false // end position out-of-bounds check
        if (direction === "x") {
            for (let i = x; i < x + length; i++) { // check for ship already occupying space
                if (this.board[y][i] !== 0) return false; 
            }
            this[shipType] = new Ship(length) // initializes ship
            for (let i = x; i < x + length; i++) {
                this.board[y][i] = this[shipType]
            }   
            return true
        } else if (direction === "y") { // check for ship already occupying space
            for (let i = y; i < y + length; i++) {
                if (this.board[i][x] !== 0) return false;
            }
            this[shipType] = new Ship(length) // Initializes ship
            for (let i = y; i < y + length; i++) {
                this.board[i][x] = this[shipType]
            }
            return true
        } else {
            return false
        }
    }
    receiveAttack(x, y) {
        if (x < 0 || x > 9 || y < 0 || y > 9 || this.board[y][x] === "H" || this.board[y][x] === "M") return false
        if (this.board[y][x] instanceof Ship) {
            this.board[y][x].hit()
            this.board[y][x] = "H"
            this.hitCount++
            return "H"
        } else if (this.board[y][x] === 0) {
            this.board[y][x] = "M"
            return "M"
        }
    }
    checkWin() {
        if (this.hitCount === 17) {
            return true
        }
        return false
    }
}
class Player {
    constructor(name) {
        this.name = name
        this.board = new Gameboard()
        this.opponent = undefined
    }
    getRandom(max) {
        return Math.floor(Math.random() * (max + 1)) 
    }
    randomizeBoard() {
        const ships = ["carrier", "battleship", "destroyer", "submarine", "patrolBoat"]
        let trueCount = 0
        let trueTest = false
        const randomDirection = () => {
            const num = this.getRandom(2)
            if (num === 1) {
                return "x"
            } else {
                return "y"
            }
        }
        while (trueCount < 5) {
            while (trueTest === false) {
                trueTest = this.board.placeShip(this.getRandom(9), this.getRandom(9), ships[trueCount], randomDirection())
            }
            trueTest = false
            trueCount++
        }
        return true
    }
    randomAttack() {
        let successfulHit = false
        while (successfulHit === false) {
            successfulHit = this.opponent.board.receiveAttack(this.getRandom(9), this.getRandom(9))
        }
        return true
    }
}
export { Ship, Gameboard, Player }
