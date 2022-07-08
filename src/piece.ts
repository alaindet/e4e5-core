import { Color, Figure } from './common';
import { SquareIndex } from './board';

export interface AbstractPiece {
  color: Color;
  figure: Figure;
}

export interface Piece extends AbstractPiece {
  // color: Color;
  // figure: Figure;
  id: number;
}

export interface AbstractPlacedPiece extends AbstractPiece {
  // color: Color;
  // figure: Figure;
  squareIndex: SquareIndex;
}

export interface PlacedPiece extends AbstractPlacedPiece {
  // color: Color;
  // figure: Figure;
  // squareIndex: number;
  id: number;
}

export function getPieceId(): number {
  return Math.floor(Math.random() * 10_000);
}
