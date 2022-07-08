import { BinaryBoard, Board, getEmptyBinaryBoard, SquareIndex } from '../board';

export function getPawnAvailableSquares(board: Board, index: SquareIndex): (
  | BinaryBoard
  | null
) {
  const available = getEmptyBinaryBoard();
  // TODO: Magic here...
  return available;
}
