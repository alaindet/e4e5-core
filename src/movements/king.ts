import { BoardSquare, BoardState, getSquaresDistance } from '../board';
import { PlacedPiece } from '../piece';

export const canKingMoveTo = (
  piece: PlacedPiece,
  square: BoardSquare,
  board: BoardState,
): boolean => {

  // Too far?
  if (getSquaresDistance(piece.square, square) > 1) {
    return false;
  }

  // Trying to capture own pieces?
  if (board[square]?.color === piece.color) {
    return false;
  }

  return true;
};
