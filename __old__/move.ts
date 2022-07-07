import { BoardSquare, BoardSquareLabel, getSquaresDistance, getToSquare } from './board';
import { Castling, CastlingLabel } from './castling';
import { Figure, getPawnDirections } from './piece';
import { GameState } from './state';

export enum MoveType {
  Basic,
  Castling,
  PawnPromotion,
  PawnEnPassant,
  PawnDoubleStep,
}

export interface BasicMove {
  type: MoveType.Basic;
  from: BoardSquare;
  to: BoardSquare;
}

export interface PawnDoubleStepMove {
  type: MoveType.PawnDoubleStep,
  from: BoardSquare;
  to: BoardSquare;
}

export interface PawnPromotionMove {
  type: MoveType.PawnPromotion;
  from: BoardSquare;
  to: BoardSquare;
  promoteTo: Figure;
}

export interface CastlingMove {
  type: MoveType.Castling;
  castling: Castling;
}

export interface PawnEnPassantMove {
  type: MoveType.PawnEnPassant;
  from: BoardSquare;
  to: BoardSquare;
}

export type Move = (
  | BasicMove
  | PawnPromotionMove
  | CastlingMove
  | PawnEnPassantMove
  | PawnDoubleStepMove
);

export function createMove(
  fromSquare: BoardSquareLabel | CastlingLabel,
  toSquare?: BoardSquareLabel,
  promoteTo?: Figure,
): Move {

  // Castling?
  if (fromSquare === Castling.KingSide || fromSquare === Castling.QueenSide) {
    const type = MoveType.Castling;
    const castling = fromSquare;
    return { type, castling: castling as Castling } as CastlingMove;
  }

  const from = fromSquare as BoardSquare;
  const to = toSquare as BoardSquare;

  // Promoting?
  if (promoteTo) {
    const type = MoveType.PawnPromotion;
    return { type, from, to, promoteTo } as PawnPromotionMove;
  }

  // Just a basic move
  const type = MoveType.Basic;
  return { type, from, to } as BasicMove;
}
