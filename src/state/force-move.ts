import { getSquaresDistance, getToSquare } from 'board';
import { performCastling } from 'castling';
import { Figure, getPawnDirections, Piece } from 'piece';
import { CastlingMove, Move, MoveType } from '../move';
import { NoPieceFoundError } from './errors';
import { GameState } from './types';

// This forces a potentially illegal game state to further process legality. It
// does not account for threats or clocks
export function forceMove(game: GameState, _move: Move): GameState {

  if (_move.type === MoveType.Castling) {
    return performCastling(game, _move);
  }

  if (game.board[_move.from] === null) {
    throw new NoPieceFoundError(`No piece found on ${_move.from}`);
  }

  // Upgrade pawn move if needed
  const move = specifyPawnMove(game, _move);

  return game;
};

// Specifies a basic move as a pawn double step or en passant, if possibile
export function specifyPawnMove(game: GameState, move: Move): Move {

  // Skip castling moves, promotions and pre-processed double step and en passant
  if (move.type !== MoveType.Basic) {
    return move;
  }

  const piece = game.board[move.from] as Piece;

  if (piece.figure !== Figure.Pawn) {
    return move;
  }

  const dirs = getPawnDirections(piece.color);
  const doubleStep = getToSquare(move.from, dirs.ahead, 2);

  // Double-step?
  if (move.to === doubleStep && game.board[move.to] !== null) {
    return { ...move, type: MoveType.PawnDoubleStep };
  }

  // TODO: En passant...

  return move;
}

/*
export type Move = (
  | BasicMove
  | PromotingMove
  | CastlingMove
  | PawnEnPassantMove
  | PawnDoubleStepMove
);

export enum MoveType {
  *Basic,
  *Castling,
  *Promotion,
  PawnEnPassant,
  PawnDoubleStep,
}
*/
