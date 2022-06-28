import { BoardSquare, BoardState, getSquareCoordinates, getSquareFromCoordinates, getSquaresDiff } from '../board';
import { PlacedPiece } from '../piece';

export const canBishopMoveTo = (
  piece: PlacedPiece,
  square: BoardSquare,
  board: BoardState,
): boolean => {

  const [fileDiff, rankDiff] = getSquaresDiff(piece.square, square);
  const [absFileDiff, absRankDiff] = [Math.abs(fileDiff), Math.abs(rankDiff)];

  // Is it diagonal movement?
  if (absFileDiff !== absRankDiff) {
    return false;
  }

  // Is there something obstructing the way?
  let [fileUnit, rankUnit] = [fileDiff / absFileDiff, rankDiff / absRankDiff];
  let pos = getSquareCoordinates(piece.square);

  for (let i = 0; i < absFileDiff - 1; i++) {
    pos[0] += fileUnit;
    pos[1] += rankUnit;
    const square = getSquareFromCoordinates(...pos);
    if (board[square] !== null) {
      return false;
    }
  }

  return true;
};
