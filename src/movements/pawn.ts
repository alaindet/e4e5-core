import { BoardSquare, BoardState } from '../board';
import { PlacedPiece } from '../piece';

// Skip en-passant for now
export const canPawnMoveTo = (
  piece: PlacedPiece,
  square: BoardSquare,
  board: BoardState,
): boolean => {
  // TODO
  return false;
};
