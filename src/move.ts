import { BoardCoordinate } from './board';
import { PlacedPiece } from './piece';
import { BoardMap } from './state';

export interface Move {
  piece: PlacedPiece;
  to: BoardCoordinate;
}

export const move = (board: BoardMap, move: Move): BoardMap => {
  // TODO: Legality
  // TODO: capturing, castling, en passant

  const { piece, to } = move;

  // Capturing?

  return { ...board, [piece.coordinate]: null, [to]: piece };
};

export const isMoveLegal = (board: BoardMap, move: Move): boolean => {
  return false;
};

export const tryMove = (board: BoardMap, m: Move): BoardMap => {
  if (!isMoveLegal(board, m)) {
    throw new Error('Illegal move');
  }

  return move(board, m);
};
