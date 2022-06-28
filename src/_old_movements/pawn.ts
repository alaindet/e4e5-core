import { getToSquare } from '../board';
import { BasicMove, MoveType, PawnDoubleStepMove, PawnEnPassantMove } from '../move';
import { PAWN_DIRECTION } from '../piece';
import { GameState } from '../state';

export const canPawnMove = (
  game: GameState,
  move: BasicMove | PawnDoubleStepMove | PawnEnPassantMove,
): boolean => {

  // Double-step?
  // En passant?
  if (move.type === MoveType.PawnDoubleStep || move.type === MoveType.PawnEnPassant) {
    return true; // Already checked when creating the move
  }

  const dirs = PAWN_DIRECTION[game.turn];
  const toPiece = game.board[move.to];
  const ahead = getToSquare(move.from, dirs.ahead, 1);

  // Just moving ahead?
  if (move.to === ahead && toPiece === null) {
    return true;
  }

  const captureSquares = dirs.capture.map(d => getToSquare(move.from, d, 1));

  // Capturing?
  if (captureSquares.includes(move.to) && toPiece !== null) {
    return true;
  }

  return false;
};
