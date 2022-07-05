import { BasicMove, PawnDoubleStepMove, PawnEnPassantMove, Move, MoveType } from '../move';
import { getToSquare } from '../board';
import { performCastling } from '../castling';
import { canMoveTo } from '../movements/can-move';
import { Figure, getPawnDirections, Piece } from '../piece';
import { IllegalMoveError, NoPieceFoundError, PieceOwnershipError } from './errors';
import { GameState } from './types';
import { getOppositeColor } from '../common';

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

  // Illegal move
  if (game.board[_move.from]?.color !== game.turn) {
    throw new PieceOwnershipError('You cannot move opponent\'s pieces');
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

  // Capture?
  const toPiece = game.board[to];
  if (toPiece !== null) {
    const { id, figure, color } = toPiece;
    const capturedPiece = { id, figure, color };
    game.capturedPieces[game.turn].push(capturedPiece);
  }

  // Promote?
  if (move.type === MoveType.PawnPromotion) {
    fromPiece.figure = move.promoteTo;
    // TODO: Update game.pieces too
  }

  // TODO: En passant?

  // Just move the piece
  game.board[from] = null;
  game.board[to] = fromPiece;

  // Update game state
  game.turn = getOppositeColor(game.turn);
  // TODO: Update en-passant
  // TODO: Update halfMovesCount
  // TODO: Update movesCount
  // TODO: Update moves
  // TODO: Update castlingAvailability

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
