import { BoardSquare } from './board';
import { Color } from './common';
import { Figure, PlacedPiece } from './piece';
import { GameState } from './state';

export enum Castling {
  KingSide = 'O-O',
  QueenSide = 'O-O-O',
}

export interface CastlingSquares {
  kingFrom: BoardSquare;
  kingTo: BoardSquare;
  rookFrom: BoardSquare;
  rookTo: BoardSquare;
  inBetween: BoardSquare[];
}

export type CastlingLabel = 'O-O' | 'O-O-O';

export const CASTLING_SQUARES: {
  [color in Color]: {
    [side in Castling]: CastlingSquares;
  }
} = {
  [Color.Light]: {
    [Castling.KingSide]: {
      kingFrom: BoardSquare.E1,
      rookFrom: BoardSquare.H1,
      kingTo: BoardSquare.G1,
      rookTo: BoardSquare.F1,
      inBetween: [BoardSquare.F1, BoardSquare.G1],
    },
    [Castling.QueenSide]: {
      kingFrom: BoardSquare.E1,
      rookFrom: BoardSquare.A1,
      kingTo: BoardSquare.C1,
      rookTo: BoardSquare.D1,
      inBetween: [BoardSquare.D1, BoardSquare.C1, BoardSquare.B1],
    },
  },
  [Color.Dark]: {
    [Castling.KingSide]: {
      kingFrom: BoardSquare.E8,
      rookFrom: BoardSquare.H8,
      kingTo: BoardSquare.G8,
      rookTo: BoardSquare.F8,
      inBetween: [BoardSquare.F8, BoardSquare.G8],
    },
    [Castling.QueenSide]: {
      kingFrom: BoardSquare.E8,
      rookFrom: BoardSquare.A8,
      kingTo: BoardSquare.C8,
      rookTo: BoardSquare.D8,
      inBetween: [BoardSquare.D8, BoardSquare.C8, BoardSquare.B8],
    },
  },
};

export const isCastlingLegal = (game: GameState, castling: Castling): boolean => {

  if (game.inCheck) {
    return false;
  }

  const squares = CASTLING_SQUARES[game.turn][castling];

  let king: PlacedPiece | null = null;
  let rook: PlacedPiece | null = null;

  // Extract king and rook
  for (const piece of game.pieces) {

    if (
      piece.color === game.turn &&
      piece.square === squares.kingFrom &&
      piece.figure === Figure.King &&
      piece.startingSquare === squares.kingFrom
    ) {
      king = piece;
      if (rook) break;
    }

    if (
      piece.color === game.turn &&
      piece.square === squares.rookFrom &&
      piece.figure === Figure.Rook &&
      piece.startingSquare === squares.rookFrom
    ) {
      rook = piece;
      if (king) break;
    }
  }

  // TODO: Should not transit on attacked squares
  // ...

  // There should be a king and a rook with no previous movements
  if (!king || !rook) {
    return false;
  }

  // There should be nothing in between
  for (const square of squares.inBetween) {
    if (game.board[square as BoardSquare] !== null) {
      return false;
    }
  }

  return true;
};
