import { getToSquare } from '../board';
import { Move, MoveType, BasicMove, PawnDoubleStepMove, PawnEnPassantMove } from '../move';
import { Piece, Figure, getPawnDirections } from '../piece';
import { GameState } from './types';

// Specifies a basic move as a pawn double step or en passant, if possibile
export function upgradePawnMove(game: GameState, move: Move): Move {

  // Skip castling moves, promotions and
  // pre-processed double step and en passant pawn moves
  if (move.type !== MoveType.Basic) {
    return move;
  }

  const piece = game.board[move.from] as Piece;

  if (piece.figure !== Figure.Pawn) {
    return move as BasicMove;
  }

  const dirs = getPawnDirections(piece.color);
  const doubleStep = getToSquare(move.from, dirs.ahead, 2);

  // Double-step?
  if (move.to === doubleStep && game.board[move.to] !== null) {
    return { ...move, type: MoveType.PawnDoubleStep } as PawnDoubleStepMove;
  }

  // En passant?
  if (game.enPassant !== null && move.to === game.enPassant) {
    return { ...move, type: MoveType.PawnEnPassant } as PawnEnPassantMove;
  }

  return move;
}
