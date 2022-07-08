import { Figure } from '../common';
import { BinaryBoard, Board, getEmptyBinaryBoard, SquareIndex } from '../board';
import { getBishopAvailableSquares } from './bishop';
import { getKingAvailableSquares } from './king';
import { getKnightAvailableSquares } from './knight';
import { getPawnAvailableSquares } from './pawn';
import { getQueenAvailableSquares } from './queen';
import { getRookAvailableSquares } from './rook';

export function getAvailableSquares(board: Board, index: SquareIndex): BinaryBoard | null {

  const piece = board[index];

  if (piece === null) {
    return null;
  }

  switch(piece.figure) {
    case Figure.Bishop:
      return getBishopAvailableSquares(board, index);
    case Figure.King:
      return getKingAvailableSquares(board, index);
    case Figure.Knight:
      return getKnightAvailableSquares(board, index);
    case Figure.Pawn:
      return getPawnAvailableSquares(board, index);
    case Figure.Queen:
      return getQueenAvailableSquares(board, index);
    case Figure.Rook:
      return getRookAvailableSquares(board, index);
    default:
      return null;
  }
}
