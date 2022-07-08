import { BinaryBoard, Board, getEmptyBinaryBoard, SquareIndex } from '../board';
import { Figure } from '../common';
import { Piece } from '../piece';

export function getBishopAvailableSquares(board: Board, piece: Piece): BinaryBoard {
  const available = getEmptyBinaryBoard();
  // TODO: Magic here...
  return available;
}

export function getAvailableSquares(board: Board, index: SquareIndex): BinaryBoard | null {
  const piece = board[index];

  if (piece === null) {
    return null;
  }

  switch(piece.figure) {
    case Figure.Bishop:
      return getBishopAvailableSquares(board, piece);
      // TODO: Other figures here...
  }

  return null;
}
