import { BoardState } from './board';
import { Color } from './common';
import { Move } from './move';
import { PlacedPiece } from './piece';
import { forceGame, GameState } from './state';

export const isAttackingKing = (attacker: PlacedPiece, king: PlacedPiece): boolean => {
  // TODO: Strategy pattern?
  return false;
};

export const inCheckAfter = (game: GameState, move: Move): boolean => {
  const forcedGame = forceGame(game, move);
  return inCheck(forcedGame.board, game.turn, forcedGame.pieces);
};

export const inCheck = (
  board: BoardState,
  turn: Color,
  pieces: PlacedPiece[],
): boolean => {
  // TODO
  return false;

  // // TODO: Could be done in one loop!
  // const king = pieces.filter(p => p.color === turn && p.figure === Figure.King)[0];
  // const opposingPieces = pieces.filter(p => p.color !== turn);

  // // TODO
  // // Check each opposing piece with the king

  // for (const piece of opposingPieces) {
  //   if (isAttackingKing(piece, king)) {
  //     return true;
  //   }
  // }

  // return false;
};
