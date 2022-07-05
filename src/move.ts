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

// export const isPawnEnPassantMove = (game: GameState, move: BasicMove): boolean => {
//   return (
//     game.lastMove !== null &&
//     game.lastMove.type === MoveType.PawnDoubleStep &&
//     getSquaresDistance(game.lastMove.to, move.from) === 1 &&
//     game.board[move.to] === null &&
//     move.to === getToSquare(game.lastMove.to, getPawnDirections(game.turn).ahead, 1)
//   );
// };

// export const createPawnEnPassantMove = (move: BasicMove): PawnEnPassantMove => ({
//   type: MoveType.PawnEnPassant,
//   from: move.from,
//   to: move.to,
// });

// export const isPawnDoubleStepMove = (game: GameState, move: BasicMove): boolean => {
//   return (
//     game.board[move.from]?.figure === Figure.Pawn &&
//     game.board[move.to] === null &&
//     getSquaresDistance(move.from, move.to) === 2
//   )
// };

// export const createPawnDoubleStepMove = (move: BasicMove): PawnDoubleStepMove => ({
//   type: MoveType.PawnDoubleStep,
//   from: move.from,
//   to: move.to,
// });

export const createMove = (
  fromSquare: BoardSquareLabel | CastlingLabel,
  toSquare?: BoardSquareLabel,
  promoteTo?: Figure,
): Move => {

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
};
