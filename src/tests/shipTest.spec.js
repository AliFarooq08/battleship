import { Ship } from "../index.js";
threeLengthShip = new Ship(3);
fourLengthShip = new Ship(4);
test("Three length ship successfully has ship length of 3", () => {
  expect(threeLengthShip.shipLength).toStrictEqual(3);
});
test("Three length ship is sunk when hit three times", () => {
  threeLengthShip.hit();
  threeLengthShip.hit();
  threeLengthShip.hit();
  expect(threeLengthShip.isSunk()).toBe(true);
});
test("Four length ship is not sunk when hit three times", () => {
  fourLengthShip.hit();
  fourLengthShip.hit();
  fourLengthShip.hit();
  expect(fourLengthShip.isSunk()).toBe(false);
});
test("Three length ship when hit four times doesn't register fourth hit", () => {
  threeLengthShip.hit();
  expect(threeLengthShip.hits).toStrictEqual(3);
});
