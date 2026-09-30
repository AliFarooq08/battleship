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
export { Ship }