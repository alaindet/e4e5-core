import { BoardState, BoardSquare } from '../board';
import { Castling } from '../castling';
import { Color, GameResult } from '../common';
import { Move } from '../move';
import { PlacedPiece, Piece } from '../piece';

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
