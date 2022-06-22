import { BoardCoordinate } from './board';

export enum Color {
  Light = 'light',
  Dark = 'dark',
}

export enum Figure {
  King = 'K',
  Queen = 'Q',
  Rook = 'R',
  Bishop = 'B',
  Knight = 'N',
  Pawn = 'p',
}

export interface AbstractPiece {
  figure: Figure;
  color: Color;
}

export interface AbstractPlacedPiece extends AbstractPiece {
  coordinate: BoardCoordinate;
}

export interface Piece extends AbstractPiece {
  id: number;
}

export interface PlacedPiece extends AbstractPlacedPiece {
  id: number;
}

export type PiecesList = AbstractPlacedPiece[];
