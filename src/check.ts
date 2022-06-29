import { Figure, PlacedPiece } from './piece';
import { GameState } from './state';
import { canMoveTo } from './movements/can-move';

export class IllegalGameStateError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, IllegalGameStateError.prototype);
  }
}

export const inCheck = (game: GameState): boolean => {

  let king: PlacedPiece | null = null;
  let attackingPieces: PlacedPiece[] = [];

  for (const piece of game.pieces) {

    // Attacking piece?
    if (piece.color === game.turn && piece.figure !== Figure.King) {
      attackingPieces.push(piece);
    }

    // King to be checked?
    if (piece.color !== game.turn && piece.figure === Figure.King) {
      king = piece;
    }
  }

  // Should not be possible
  if (king === null || attackingPieces.length === 0) {
    throw new IllegalGameStateError('Game state is illegal');
  }

  // Check is any opposing piece (excluding the king) is threatening the king
  for (const attackingPiece of attackingPieces) {
    if (canMoveTo(attackingPiece, king.square, game.board)) {
      return true;
    }
  }

  // King is safe
  return false;
};
