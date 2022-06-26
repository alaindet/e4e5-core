import { BoardState } from './board';
import { Color, getOppositeColor } from './common';
import { Figure, PlacedPiece } from './piece';

export const isAttackingKing = (attacker: PlacedPiece, king: PlacedPiece): boolean => {
  // TODO: Strategy pattern?
  return false;
};

export const inCheck = (
  board: BoardState,
  pieces: PlacedPiece[],
  turn: Color,
): boolean => {

  // TODO: Could be done in one loop!
  const king = pieces.filter(p => p.color === turn && p.figure === Figure.King)[0];
  const opposingPieces = pieces.filter(p => p.color !== turn);

  // TODO
  // Check each opposing piece with the king

  for (const piece of opposingPieces) {
    if (isAttackingKing(piece, king)) {
      return true;
    }
  }

  return false;
};
