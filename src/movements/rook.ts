import { BoardSquare, BoardState, getSquareCoordinates, getSquareFromCoordinates, getSquaresDiff } from '../board';
import { AbstractPlacedPiece, PlacedPiece } from '../piece';

export const canRookMoveTo = (
  piece: PlacedPiece | AbstractPlacedPiece,
  square: BoardSquare,
  board: BoardState,
): boolean => {

  const [fileDiff, rankDiff] = getSquaresDiff(piece.square, square);

  // Non-linear movement?
  if (fileDiff !== 0 && rankDiff !== 0) {
    return false;
  }

  const [absFileDiff, absRankDiff] = [Math.abs(fileDiff), Math.abs(rankDiff)];
  const fileUnit = fileDiff === 0 ? 0 : fileDiff / absFileDiff;
  const rankUnit = rankDiff === 0 ? 0 : rankDiff / absRankDiff;
  const steps = Math.max(absFileDiff, absRankDiff);
  let pos = getSquareCoordinates(piece.square);

  // Move in given direction and look for obstacles
  for (let i = 0; i < steps - 1; i++) {
    pos[0] += fileUnit;
    pos[1] += rankUnit;
    const square = getSquareFromCoordinates(...pos);
    if (board[square] !== null) {
      return false;
    }
  }

  // Is last square occupied by a piece of own color?
  pos[0] += fileUnit;
  pos[1] += rankUnit;
  const lastSquare = getSquareFromCoordinates(...pos);
  if (board[lastSquare]?.color === piece.color) {
    return false;
  }

  return true;
};
