import { BoardSquare, BoardState, getSquaresDistance } from '../board';
import { PlacedPiece } from '../piece';

export const canKingMoveTo = (
  piece: PlacedPiece,
  square: BoardSquare,
  board: BoardState,
): boolean => {

  console.log('canKingMoveTo', piece, square);

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
