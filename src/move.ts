import { BoardSquare, BoardSquareLabel, Castling, CastlingLabel } from './board';
import { Figure } from './piece';

export enum MoveType {
  Basic,
  Castling,
  Promotion,
}

export interface BasicMove {
  type: MoveType.Basic;
  from: BoardSquare;
  to: BoardSquare;
}

export interface PromotingMove {
  type: MoveType.Promotion;
  from: BoardSquare;
  to: BoardSquare;
  promoteTo: Figure;
}

export interface CastlingMove {
  type: MoveType.Castling;
  castling: Castling;
}

export type Move = BasicMove | PromotingMove | CastlingMove;

export const createMove = (
  fromSquare: BoardSquareLabel | CastlingLabel,
  toSquare?: BoardSquareLabel,
  promoteTo?: Figure,
): Move => {

  // Castling?
  if (fromSquare === Castling.KingSide || fromSquare === Castling.QueenSide) {
    const type = MoveType.Castling;
    const castling = fromSquare;
    return { type, castling: castling as Castling };
  }

  const from = fromSquare as BoardSquare;
  const to = toSquare as BoardSquare;

  // Promoting?
  if (promoteTo) {
    const type = MoveType.Promotion;
    return { type, from, to, promoteTo };
  }

  const type = MoveType.Basic;
  return { type, from, to };
};
