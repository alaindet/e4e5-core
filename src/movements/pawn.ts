import { getOppositeColor } from '../common';
import { BoardSquare, BoardState, getToSquare } from '../board';
import { AbstractPlacedPiece, getPawnDirections, PlacedPiece } from '../piece';

// Skip en-passant for now
export function canPawnMoveTo(
  piece: PlacedPiece | AbstractPlacedPiece,
  square: BoardSquare,
  board: BoardState,
): boolean {

  const dirs = getPawnDirections(piece.color);
  const ahead = getToSquare(piece.square, dirs.ahead, 1);

  // Going ahead?
  if (ahead === square) {
    return board[ahead] === null;
  }

  const doubleStep = getToSquare(piece.square, dirs.ahead, 2);

  // Double-step ahead?
  if (doubleStep === square) {
    return board[doubleStep] === null;
  }

  // Capturing?
  let foundSquare: BoardSquare | null = null;

  // Diagonal squares could be out of chessboard!
  const diagonalSquares = dirs.capture
    .map(d => {
      try {
        return getToSquare(piece.square, d, 1);
      } catch {
        return null;
      }
    })
    .filter(square => square !== null);

  for (const diagonalSquare of diagonalSquares) {
    if (diagonalSquare === square) {
      foundSquare = diagonalSquare;
    }
  }

  // You cannot go there!
  if (foundSquare === null) {
    return false;
  }

  // Capturing own piece?
  if (board[foundSquare]?.color !== getOppositeColor(piece.color)) {
    return false;
  }

  return true;
}
