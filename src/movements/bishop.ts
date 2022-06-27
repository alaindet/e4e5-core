import { getSquareCoordinates, BoardCoordinates, getSquareFromCoordinates } from './../board';
import { getSquareColor, getSquaresDiff } from '../board';
import { BasicMove } from '../move';
import { GameState } from '../state';

export const canBishopMove = (game: GameState, move: BasicMove): boolean => {

  if (getSquareColor(move.to) !== getSquareColor(move.from)) {
    return false;
  }

  const [fileDiff, rankDiff] = getSquaresDiff(move.from, move.to);
  const [absFileDiff, absRankDiff] = [Math.abs(fileDiff), Math.abs(rankDiff)];

  // Diagonal movement has equal horizontal and vertical diff
  if (absFileDiff !== absRankDiff) {
    return false;
  }

  let [fileUnit, rankUnit] = [fileDiff / absFileDiff, rankDiff / absRankDiff];
  let pos = getSquareCoordinates(move.from);

  // Is there a piece obstructing the view?
  for (let i = 0; i < absFileDiff - 1; i++) {
    pos[0] += fileUnit;
    pos[1] += rankUnit;
    const square = getSquareFromCoordinates(...pos);
    if (game.board[square] !== null) {
      return false;
    }
  }

  return true;
};
