import { getEmptyBoard } from '../board';
import { Color } from '../common';
import { Castling } from '../castling';
import { GameState } from './types';

export function getGameDefaults(): GameState {
    return {
    board: getEmptyBoard(),
    turn: Color.White,
    inCheck: false,
    pieces: [],
    capturedPieces: {
      [Color.White]: [],
      [Color.Black]: [],
    },
    enPassant: null,
    halfMovesCount: 0,
    movesCount: 1,
    moves: [],
    result: null,
    canProposeDraw: false,
    castlingAvailability: {
      [Color.White]: {
        [Castling.KingSide]: false,
        [Castling.QueenSide]: false,
      },
      [Color.Black]: {
        [Castling.KingSide]: false,
        [Castling.QueenSide]: false,
      },
    },
  };
}
