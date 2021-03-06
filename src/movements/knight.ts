import { BoardSquare, BoardState, getSquaresDiff } from '../board';
import { AbstractPlacedPiece, PlacedPiece } from '../piece';

// Short L movement example: A1 => B3
// Long L movement example: A1 => C2
export function canKnightMoveTo(
  piece: PlacedPiece | AbstractPlacedPiece,
  square: BoardSquare,
  board: BoardState,
): boolean {

  const [fileDiff, rankDiff] = getSquaresDiff(piece.square, square);
  const [absFileDiff, absRankDiff] = [Math.abs(fileDiff), Math.abs(rankDiff)];
  const isShortL = absFileDiff === 1 && absRankDiff === 2;
  const isLongL = absFileDiff === 2 && absRankDiff === 1;

  // Is it an L-movement?
  if (!(isShortL || isLongL)) {
    return false;
  }

  // Landing on own piece?
  if (board[square]?.color === piece.color) {
    return false;
  }

  return true;
}
