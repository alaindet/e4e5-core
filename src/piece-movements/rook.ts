import { BinaryBoard, Board, getEmptyBinaryBoard, SquareIndex } from '../board';
import { Piece } from '../piece';

export function getRookAvailableSquares(board: Board, index: SquareIndex): (
  | BinaryBoard
  | null
) {
  const available = getEmptyBinaryBoard();
  // TODO: Magic here...
  return available;
}
