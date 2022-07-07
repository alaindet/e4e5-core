import { areOnSameFile } from './board-movement';
import { SquareIndex } from './board';

const testCases: [[SquareIndex, SquareIndex], boolean][] = [
  [[2, 34], true],
  [[0, 56], true],
  [[0, 8], true],
  [[7, 15], true],
  [[12, 60], true],
  [[19, 27], true],
  [[2, 31], false],
  [[0, 63], false],
  [[0, 1], false],
  [[5, 12], false],
  [[42, 36], false],
];

testCases.forEach(([[a, b], expected]) => {
  const result = areOnSameFile(a, b);
  const outcome = result === expected ? 'passed' : `ERROR: ${a}, ${b}`;
  console.log(outcome);
});
