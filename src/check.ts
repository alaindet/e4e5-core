import { BoardState } from './board';
import { Color, getOppositeColor } from './common';
import { Figure, PlacedPiece } from './piece';

export const inCheck = (
  board: BoardState,
  pieces: PlacedPiece[],
  turn: Color,
): boolean => {

  let king: PlacedPiece;
  const opposingPieces: PlacedPiece[] = [];
  const oppositeColor = getOppositeColor(turn);

  pieces.forEach(piece => {
    switch (piece.color) {
      case turn:
        if (piece.figure === Figure.King) {
          king = piece;
        }
      case oppositeColor:
        opposingPieces.push(piece);
    }
  });

  // TODO
  // Check each opposing piece with the king

  return false;
};
