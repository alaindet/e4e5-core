import { CastlingMove } from 'move';
import { BoardSquare, BoardState } from './board';
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

export const getCastlingSquares = (
  color: Color,
  castling: Castling,
): CastlingSquares => {
  if (color === Color.White && castling === Castling.KingSide) {
    return {
      kingFrom: BoardSquare.E1,
      rookFrom: BoardSquare.H1,
      kingTo: BoardSquare.G1,
      rookTo: BoardSquare.F1,
      inBetween: [BoardSquare.F1, BoardSquare.G1],
    };
  }

  if (color === Color.White && castling === Castling.QueenSide) {
    return {
      kingFrom: BoardSquare.E1,
      rookFrom: BoardSquare.A1,
      kingTo: BoardSquare.C1,
      rookTo: BoardSquare.D1,
      inBetween: [BoardSquare.D1, BoardSquare.C1, BoardSquare.B1],
    };
  }

  if (color === Color.Black && castling === Castling.KingSide) {
    return {
      kingFrom: BoardSquare.E8,
      rookFrom: BoardSquare.H8,
      kingTo: BoardSquare.G8,
      rookTo: BoardSquare.F8,
      inBetween: [BoardSquare.F8, BoardSquare.G8],
    };
  }

  // Color dark, castling queen-side
  return {
    kingFrom: BoardSquare.E8,
    rookFrom: BoardSquare.A8,
    kingTo: BoardSquare.C8,
    rookTo: BoardSquare.D8,
    inBetween: [BoardSquare.D8, BoardSquare.C8, BoardSquare.B8],
  };
};

// This does not account for threats
export const isCastlingAvailable = (
  game: GameState,
  color: Color,
  castling: Castling,
): boolean => {

  const squares = getCastlingSquares(color, castling);

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

export function performCastling(game: GameState, move: CastlingMove): GameState {

  const squares = getCastlingSquares(game.turn, move.castling);

  game.board[squares.kingTo] = game.board[squares.kingFrom];
  game.board[squares.kingFrom] = null;
  game.board[squares.rookTo] = game.board[squares.rookFrom];
  game.board[squares.rookFrom] = null;
  
  return game;
}


// This does not account for checking
export function updateCastlingAvailability(game: GameState): GameState {

  const castling: [Color, Castling][] = [
    [Color.White, Castling.KingSide],
    [Color.White, Castling.QueenSide],
    [Color.Black, Castling.KingSide],
    [Color.Black, Castling.QueenSide],
  ];

  castling.forEach(([color, side]) => {
    const isAvailable = isCastlingAvailable(game, color, side);
    game.castlingAvailability[color][side] = isAvailable;
  });

  return game;
};
