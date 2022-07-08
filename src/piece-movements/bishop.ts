import { BoardDirection, getToSquare } from '../board-movement';
import { BinaryBoard, Board, getEmptyBinaryBoard, SquareIndex } from '../board';

export function getBishopAvailableSquares(board: Board, index: SquareIndex): (
  | BinaryBoard
  | null
) {
  const available = getEmptyBinaryBoard();
  available[index] = true;
  let availableCount = 0;

  const dirs: [BoardDirection, number][] = [
    [BoardDirection.AscendingDiagonal, 1],
    [BoardDirection.AscendingDiagonal, -1],
    [BoardDirection.DescendingDiagonal, 1],
    [BoardDirection.DescendingDiagonal, -1],
  ];

  dirs.forEach(([dir, unitTravel]) => {
    let travel = unitTravel;
    let nextSquare = getToSquare(index, dir, travel);
    while (nextSquare !== null) {
      available[nextSquare] = true;
      availableCount++;
      travel += unitTravel;
      nextSquare = getToSquare(index, dir, travel);
    }
  });

  if (availableCount === 0) {
    return null;
  }

  return available;
}
