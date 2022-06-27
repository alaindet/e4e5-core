import { BoardDirection, BoardSquare } from './board';
import { Color } from './common';

export enum Figure {
  King = 'K',
  Queen = 'Q',
  Rook = 'R',
  Bishop = 'B',
  Knight = 'N',
  Pawn = 'p',
}

export type PieceId = number;

export interface AbstractPiece {
  figure: Figure;
  color: Color;
}

export interface AbstractPlacedPiece extends AbstractPiece {
  // figure: Figure;
  // color: Color;
  square: BoardSquare;
}

export type GamePosition = AbstractPlacedPiece[];

export interface Piece extends AbstractPiece {
  // figure: Figure;
  // color: Color;
  id: PieceId;
}

export interface PlacedPiece extends AbstractPlacedPiece {
  // figure: Figure;
  // color: Color;
  // square: BoardSquare;
  startingSquare: BoardSquare;
  id: PieceId;
}

export type AbstractPieceToken = `${Figure}${Color}`;

export type PiecesChecklist = Map<AbstractPieceToken, number>;

export const PAWN_DIRECTION: {
  [color in Color]: {
    ahead: BoardDirection;
    capture: [BoardDirection, BoardDirection];
  };
} = {
  [Color.Light]: {
    ahead: BoardDirection.Top,
    capture: [BoardDirection.DiagonalTopLeft, BoardDirection.DiagonalTopRight],
  },
  [Color.Dark]: {
    ahead: BoardDirection.Bottom,
    capture: [BoardDirection.DiagonalBottomLeft, BoardDirection.DiagonalBottomRight],
  },
};

export const getPiecesChecklist = (): PiecesChecklist => {
  return new Map<AbstractPieceToken, number>([
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

export const getPieceId = (piece: AbstractPiece): PieceId => {
  return Math.random();
};

export const getPieceToken = (piece: AbstractPiece): AbstractPieceToken => {
  return `${piece.figure}${piece.color}`;
};

export const getPieceFromToken = (token: AbstractPieceToken): Piece => {
  const figure = token[0] as Figure;
  const color = +token[1] as Color;
  const id = getPieceId({ figure, color });
  return { id, figure, color };
};
