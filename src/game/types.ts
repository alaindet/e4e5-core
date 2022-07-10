import { Color } from 'common';
import { Board } from '../board';

export interface Game {
  board: Board;
  turn: Color;
}

/*
export interface GameState {
  board: BoardState;
  turn: Color;
  inCheck: boolean;
  pieces: PlacedPiece[];
  capturedPieces: { [color in Color]: Piece[] };
  enPassant: BoardSquare | null;
  halfMovesCount: number;
  movesCount: number;
  moves: Move[];
  result: GameResult;
  canProposeDraw: boolean;
  castlingAvailability: {
    [color in Color]: {
      [castling in Castling]: boolean;
    }
  };
}
*/
