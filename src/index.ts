import { getEmptyBoard, getSquareLabels, getSquareIndices, getSquareLabel } from './board';

const labels = getSquareLabels();
const indices = getSquareIndices(labels);

console.log(
  getSquareLabel(0), // A8
  getSquareLabel(1), // B8
  getSquareLabel(8), // A7
  getSquareLabel(37), // F4
  getSquareLabel(-3), // null
  getSquareLabel(64), // null
  getSquareLabel(79), // null
);
