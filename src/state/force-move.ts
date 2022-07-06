import { BasicMove, Move, MoveType } from '../move';
import { getToSquare } from '../board';
import { performCastling, updateCastlingAvailability } from '../castling';
import { canMoveTo } from '../movements';
import { getPawnDirections, Piece } from '../piece';
import { Color, getOppositeColor } from '../common';
import { removeAt } from '../utils';
import { IllegalMoveError, NoPieceFoundError, PieceOwnershipError } from './errors';
import { GameState } from './types';
import { upgradePawnMove } from './upgrade-pawn-move';

// This forces a potentially illegal game state to further process legality.
// It ignores threats, win conditions, etc.
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
  const move = upgradePawnMove(game, _move);
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
    game.pieces = game.pieces.filter(p => p.square !== to);
    const { id, figure, color } = toPiece;
    const capturedPiece = { id, figure, color };
    game.capturedPieces[game.turn].push(capturedPiece);
  }

  // Promote?
  if (move.type === MoveType.PawnPromotion) {
    fromPiece.figure = move.promoteTo;
    game.pieces = game.pieces.map(piece => {
      if (piece.square === from) {
        return { ...piece, figure: move.promoteTo };
      }
      return piece;
    });
  }

  // En passant?
  if (move.type === MoveType.PawnEnPassant) {
    const index = game.pieces.findIndex(p => p.square === game.enPassant);
    const { id, figure, color } = game.pieces[index];
    const capturedPiece = { id, figure, color };
    game.capturedPieces[game.turn].push(capturedPiece);
    game.pieces = removeAt(game.pieces, index);
    game.enPassant = null;
  }

  // Just move the piece
  game.board[from] = null;
  game.board[to] = fromPiece;

  // Update en passant state
  game.enPassant = null;
  if (move.type === MoveType.PawnDoubleStep) {
    const { ahead } = getPawnDirections(game.turn);
    const enPassant = getToSquare(from, ahead, 1);
    game.enPassant = enPassant;
  }

  // Update half move counter
  game.halfMovesCount++;

  // Update move counter
  if (game.turn === Color.Black) {
    game.movesCount++;
  }

  // Update castling availability
  game = updateCastlingAvailability(game);

  // Save last move
  game.moves.push(move);

  // Update turn
  game.turn = getOppositeColor(game.turn);

  return game;
};
