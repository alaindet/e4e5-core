import { BasicMove, PawnDoubleStepMove, PawnEnPassantMove, Move, MoveType } from '../move';
import { getToSquare } from '../board';
import { performCastling } from '../castling';
import { canMoveTo } from '../movements/can-move';
import { Figure, getPawnDirections, Piece } from '../piece';
import { IllegalMoveError, NoPieceFoundError } from './errors';
import { GameState } from './types';

// This forces a potentially illegal game state to further process legality. It
// does not account for threats or clocks
export function forceMove(game: GameState, _move: Move): GameState {

  // Castling?
  if (_move.type === MoveType.Castling) {
    return performCastling(game, _move);
  }

  // Illegal move
  if (game.board[_move.from] === null) {
    throw new NoPieceFoundError(`No piece found on ${_move.from}`);
  }

  // Upgrade pawn move if needed
  const move = specifyPawnMove(game, _move);
  const { from, to } = move as BasicMove;
  const fromPiece = game.board[from] as Piece;
  const fromPlacedPiece = { ...fromPiece, square: from };

  // Validate move
  if (!canMoveTo(fromPlacedPiece, to, game.board)) {
    throw new IllegalMoveError(`You cannot move the piece to ${to}`);
  }

  // TODO: Perform move

  return game;
};

// Specifies a basic move as a pawn double step or en passant, if possibile
export function specifyPawnMove(game: GameState, move: Move): Move {

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
