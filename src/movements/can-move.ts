import { BoardSquare, BoardState } from '../board';
import { Figure, PlacedPiece } from '../piece';
import { canBishopMoveTo } from './bishop';
import { canKingMoveTo } from './king';
import { canKnightMoveTo } from './knight';
import { canPawnMoveTo } from './pawn';
import { canQueenMoveTo } from './queen';
import { canRookMoveTo } from './rook';

/**
 * This function only accounts for physical allowed movements of pieces,
 * But it does not take into account check, both before and after movement
 * For example, according to this function a king can move into a threatened square
 * En passant is not managed either as it relies on game state
 */
export const canMoveTo = (
  piece: PlacedPiece,
  square: BoardSquare,
  board: BoardState,
): boolean => {

  if (piece.square === square) {
    return false;
  }

  switch (piece.figure) {
    case Figure.Bishop:
      return canBishopMoveTo(piece, square, board);
    case Figure.King:
      return canKingMoveTo(piece, square, board);
    case Figure.Knight:
      return canKnightMoveTo(piece, square, board);
    case Figure.Pawn:
      return canPawnMoveTo(piece, square, board);
    case Figure.Queen:
      return canQueenMoveTo(piece, square, board);
    case Figure.Rook:
      return canRookMoveTo(piece, square, board);
  }
};
