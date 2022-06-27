import { getSquareCoordinates, BoardCoordinate, BoardCoordinates, getSquareFromCoordinates } from './../board';
import { getSquareColor, getSquaresDiff } from '../board';
import { BasicMove } from '../move';
import { GameState } from '../state';

export const canBishopMove = (game: GameState, move: BasicMove): boolean => {

  if (getSquareColor(move.to) !== getSquareColor(move.from)) {
    return false;
  }

  const [fileDiff, rankDiff] = getSquaresDiff(move.to, move.from);
  const [absFileDiff, absRankDiff] = [Math.abs(fileDiff), Math.abs(rankDiff)];

  // Diagonal movement has equal horizontal and vertical diff
  if (Math.abs(fileDiff) !== Math.abs(rankDiff)) {
    return false;
  }

  let [fileUnit, rankUnit] = [fileDiff / absFileDiff, rankDiff / absRankDiff];
  let pos = getSquareCoordinates(move.from);
  let to = getSquareCoordinates(move.to);

  // There's a piece in between obstructing the piece
  while (pos[0] !== to[0] && pos[1] !== to[1]) {
    pos = [pos[0] += fileUnit, pos[1] += rankUnit] as BoardCoordinates;
    const square = getSquareFromCoordinates(...pos);
    if (game.board[square] !== null) {
      return false;
    }
  }

  return true;
};
