import { BoardSquare, BoardState, getSquareCoordinates, getSquareFromCoordinates, getSquaresDiff } from '../board';
import { PlacedPiece } from '../piece';

export const canQueenMoveTo = (
  piece: PlacedPiece,
  square: BoardSquare,
  board: BoardState,
): boolean => {

  const [fileDiff, rankDiff] = getSquaresDiff(piece.square, square);
  const [absFileDiff, absRankDiff] = [Math.abs(fileDiff), Math.abs(rankDiff)];

  const isLinear = (
    (fileDiff === 0 && rankDiff !== 0) ||
    (fileDiff !== 0 && rankDiff === 0)
  );

  const isDiagonal = absFileDiff === absRankDiff;

  // Movement must be either linear or diagonal
  if (!(isLinear || isDiagonal)) {
    return false;
  }

  const fileUnit = fileDiff === 0 ? 0 : fileDiff / absFileDiff;
  const rankUnit = rankDiff === 0 ? 0 : rankDiff / absRankDiff;
  const steps = Math.max(absFileDiff, absRankDiff);
  let pos = getSquareCoordinates(piece.square);

  // Is there something obstructing the way?
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
