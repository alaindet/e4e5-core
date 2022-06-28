import { BoardSquare, BoardState, getSquareColor, getSquareCoordinates, getSquareFromCoordinates, getSquaresDiff } from './board';
import { Figure, PlacedPiece } from './piece';

const isBishopAttacking = (
  piece: PlacedPiece,
  square: BoardSquare,
  board: BoardState,
): boolean => {
  const [fileDiff, rankDiff] = getSquaresDiff(piece.square, square);
  const [absFileDiff, absRankDiff] = [Math.abs(fileDiff), Math.abs(rankDiff)];

  // Movement is not diagonal?
  if (absFileDiff !== absRankDiff) {
    return false;
  }

  let [fileUnit, rankUnit] = [fileDiff / absFileDiff, rankDiff / absRankDiff];
  let pos = getSquareCoordinates(piece.square);

  // Is there a piece obstructing the line of sight?
  for (let i = 0; i < absFileDiff - 1; i++) {
    pos[0] += fileUnit;
    pos[1] += rankUnit;
    const square = getSquareFromCoordinates(...pos);
    if (board[square] !== null) {
      return false;
    }
  }

  return false;
};

const isKingAttacking = (
  piece: PlacedPiece,
  square: BoardSquare,
  board: BoardState,
): boolean => {
  return false;
};

const isKnightAttacking = (
  piece: PlacedPiece,
  square: BoardSquare,
  board: BoardState,
): boolean => {
  return false;
};

const isPawnAttacking = (
  piece: PlacedPiece,
  square: BoardSquare,
  board: BoardState,
): boolean => {
  return false;
};

const isQueenAttacking = (
  piece: PlacedPiece,
  square: BoardSquare,
  board: BoardState,
): boolean => {
  return false;
};

const isRookAttacking = (
  piece: PlacedPiece,
  square: BoardSquare,
  board: BoardState,
): boolean => {
  return false;
};

// TODO: Refactor
export const isAttacking = (
  piece: PlacedPiece,
  square: BoardSquare,
  board: BoardState,
): boolean => {
  switch (piece.figure) {
    case Figure.Bishop:
      return isBishopAttacking(piece, square, board);
    case Figure.King:
      return isKingAttacking(piece, square, board);
    case Figure.Knight:
      return isKnightAttacking(piece, square, board);
    case Figure.Pawn:
      return isPawnAttacking(piece, square, board);
    case Figure.Queen:
      return isQueenAttacking(piece, square, board);
    case Figure.Rook:
      return isRookAttacking(piece, square, board);
    default:
      return false;
  }
};
