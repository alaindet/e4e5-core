import { BasicMove } from './move';
import { canBishopMove } from './_old_movements/bishop';
import { canPawnMove } from './_old_movements/pawn';
import { Figure } from './piece';
import { GameState } from './state';

export const canFigureMove = (game: GameState, move: BasicMove): boolean => {

  // TODO
  return true;

  // const piece = game.board[move.from];

  // if (piece === null) {
  //   return false;
  // }

  // switch (piece.figure) {
  //   case Figure.Bishop:
  //     return canBishopMove(game, move);
  //   case Figure.King:
  //     return true; // TODO
  //   case Figure.Knight:
  //     return true; // TODO
  //   case Figure.Pawn:
  //     return canPawnMove(game, move);
  //   case Figure.Queen:
  //     return true; // TODO
  //   case Figure.Rook:
  //     return true; // TODO
  //   default:
  //     return false;
  // }
};
