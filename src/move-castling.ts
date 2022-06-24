import { BoardSquare, Castling, CastlingSquares } from './board';
import { Color } from './common';
import { GameState } from './state';

export const isKingSideCastlingLegal = (game: GameState): boolean => {
  // TODO
  return true;
};

export const isQueenSideCastlingLegal = (game: GameState): boolean => {
  // TODO
  return true;
};

export const getCastlingSquares = (castling: Castling, color: Color): CastlingSquares => {
  if (castling === Castling.KingSide && color === Color.Light) {
    return {
      kingFrom: BoardSquare.E1,
      rookFrom: BoardSquare.H1,
      kingTo: BoardSquare.G1,
      rookTo: BoardSquare.F1,
    };
  }

  if (castling === Castling.QueenSide && color === Color.Light) {
    return {
      kingFrom: BoardSquare.E1,
      rookFrom: BoardSquare.A1,
      kingTo: BoardSquare.C1,
      rookTo: BoardSquare.D1,
    }
  }

  if (castling === Castling.KingSide && color === Color.Dark) {
    return {
      kingFrom: BoardSquare.E8,
      rookFrom: BoardSquare.H8,
      kingTo: BoardSquare.G8,
      rookTo: BoardSquare.F8,
    };
  }

  // castling === Castling.QueenSide && color === Color.Dark
  return {
    kingFrom: BoardSquare.E8,
    rookFrom: BoardSquare.A8,
    kingTo: BoardSquare.C8,
    rookTo: BoardSquare.D8,
  };
};
