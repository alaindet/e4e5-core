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

export type AbstractPieces = AbstractPlacedPiece[];

export type CapturedPieces = Piece[];

export const getPieceId = (piece: AbstractPiece): number => {
  const id = `${piece.figure}${piece.color}`;

  let result = 0;
  const digits = Date.now().toString().split('');

  for (let i = 0; i < digits.length - 1; i++) {
    result += (+digits[i]) * (+digits[i + 1]);
  }

  for (let i = 0; i < id.length; i++) {
    result += id.charCodeAt(i);
  }

  return result;
};

export type PieceShorthand = `${Figure}${Color}`;

export type PiecesChecklist = Map<PieceShorthand, number>;

export const getPiecesChecklist = (): PiecesChecklist => {
  return new Map<PieceShorthand, number>([
    [`${Figure.King}${Color.Light}`, 1],
    [`${Figure.Queen}${Color.Light}`, 1],
    [`${Figure.Bishop}${Color.Light}`, 2],
    [`${Figure.Knight}${Color.Light}`, 2],
    [`${Figure.Rook}${Color.Light}`, 2],
    [`${Figure.Pawn}${Color.Light}`, 8],
    [`${Figure.King}${Color.Dark}`, 1],
    [`${Figure.Queen}${Color.Dark}`, 1],
    [`${Figure.Bishop}${Color.Dark}`, 2],
    [`${Figure.Knight}${Color.Dark}`, 2],
    [`${Figure.Rook}${Color.Dark}`, 2],
    [`${Figure.Pawn}${Color.Dark}`, 8],
  ]);
};
