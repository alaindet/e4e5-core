import { getOppositeColor } from '../common';
import { BoardSquare, BoardState, BOARD_MOVEMENT, getSquareCoordinates, BoardCoordinates, getSquareFromCoordinates, BoardCoordinate } from '../board';
import { PAWN_DIRECTION, PlacedPiece } from '../piece';

// Skip en-passant for now
export const canPawnMoveTo = (
  piece: PlacedPiece,
  square: BoardSquare,
  board: BoardState,
): boolean => {

  const dirs = PAWN_DIRECTION[piece.color];
  const [file, rank] = getSquareCoordinates(piece.square);

  const [aheadFileDiff, aheadRankDiff] = BOARD_MOVEMENT[dirs.ahead];
  let ahead = [file + aheadFileDiff, rank + aheadRankDiff] as BoardCoordinates;
  let aheadSquare = getSquareFromCoordinates(...ahead);

  // Going ahead?
  if (aheadSquare === square) {
    return board[aheadSquare] === null;
  }

  ahead[0] += aheadFileDiff as BoardCoordinate;
  ahead[1] += aheadRankDiff as BoardCoordinate;
  aheadSquare = getSquareFromCoordinates(...ahead);

  // Double-step ahead?
  if (aheadSquare === square) {
    return board[aheadSquare] === null;
  }

  // Capturing?
  const diagonalDiffs = dirs.capture.map(d => BOARD_MOVEMENT[d]);
  let foundSquare: BoardSquare | null = null;

  for (const d of diagonalDiffs) {
    const nextCoords = [file + d[0], rank + d[1]] as BoardCoordinates;
    const nextSquare = getSquareFromCoordinates(...nextCoords);
    if (square === nextSquare) {
      foundSquare = nextSquare;
    }
  }

  // You can't go there!
  if (foundSquare === null) {
    return false;
  }

  // You can't go there! x2
  if (board[foundSquare]?.color !== getOppositeColor(piece.color)) {
    return false;
  }

  return true;
};
