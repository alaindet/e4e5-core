import { Move, MoveType } from './move';
import { isCastlingLegal } from './castling';
import { GameState } from './state';
import { canFigureMove } from './figure-movements';
import { inCheckAfter } from './check';

export const isMoveLegal = (game: GameState, move: Move): boolean => {
  // TODO
  return true;
  // switch (move.type) {
  //   case MoveType.Basic:
  //     return game.inCheck
  //       ? canFigureMove(game, move) && !inCheckAfter(game, move)
  //       : canFigureMove(game, move);
  //   case MoveType.Castling:
  //     return isCastlingLegal(game, move.castling);
  //   default:
  //     return true;
  // }
};
