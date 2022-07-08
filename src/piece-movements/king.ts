import { BinaryBoard, Board, getEmptyBinaryBoard, SquareIndex } from '../board';

export function getKingAvailableSquares(board: Board, index: SquareIndex): (
  | BinaryBoard
  | null
) {
  const available = getEmptyBinaryBoard();
  // TODO: Magic here...
  return available;
}
