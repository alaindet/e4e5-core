import { BoardCoordinates, BoardCoordinate, getSquareFromCoordinates, BoardSquare } from '@/board';
import { Color } from '@/common';
import { createGameFromPosition, GameState, inCheck } from '@/state';
import { GamePosition } from '@/piece';
import { getPieceLetters, PieceLetter } from './piece-letters';
import { Castling } from '@/castling';

export const toNumber = (input: string): number | null => {
  const result = +input;
  return isNaN(result) ? null : result;
};

export const fromFENBoard = (board: string): GamePosition => {
  const pos: GamePosition = [];
  const letterMap = getPieceLetters().fromLetters as any;
  let [rank, file] = [8, 1] as BoardCoordinates;

  // Go from top to bottom, from left to right
  board.split('/').forEach((line) => {
    line.split('').forEach((char) => {
      const n = toNumber(char);

      if (n === null) {
        const abstractPiece = letterMap[char];
        const square = getSquareFromCoordinates(file, rank);
        pos.push({ ...abstractPiece, square });
      }

      file += (n ?? 1);
    });

    rank = rank - 1 as BoardCoordinate;
    file = 1;
  });

  return pos;
};

export function fromFENActive(active: string): Color {
  return active === 'w' ? Color.White : Color.Black;
};

export function fromFENEnPassant(enPassant: string): BoardSquare | null {
  return (enPassant !== '-') ? enPassant.toUpperCase() as BoardSquare : null;
}

export function fromFENCastlingAvailability(
  castlings: string
): GameState['castlingAvailability'] {

  const availability = {
    [Color.White]: {
      [Castling.KingSide]: false,
      [Castling.QueenSide]: false,
    },
    [Color.Black]: {
      [Castling.KingSide]: false,
      [Castling.QueenSide]: false,
    },
  };

  if (castlings === '-') {
    return availability;
  }

  const available = castlings.split('').reduce(
    (tot, letter) => ({ ...tot, [letter]: true }),
    {} as { [letter: string]: boolean },
  )  

  if (PieceLetter.K in available) {
    availability[Color.White][Castling.KingSide] = true;
  }

  if (PieceLetter.Q in available) {
    availability[Color.White][Castling.QueenSide] = true;
  }

  if (PieceLetter.k in available) {
    availability[Color.Black][Castling.KingSide] = true;
  }

  if (PieceLetter.q in available) {
    availability[Color.Black][Castling.QueenSide] = true;
  }

  return availability;
}

// https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
// Example: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
export function fromFEN (fen: string): GameState {
  // TODO: Add this missing data to game
  const [board, active, castling, enPassant, halfMoves, fullMoves] = fen.split(' ');
  const position = fromFENBoard(board);
  const game = createGameFromPosition(position, fromFENActive(active));

  game.castlingAvailability = fromFENCastlingAvailability(castling);
  game.inCheck = inCheck(game);
  game.enPassant = fromFENEnPassant(enPassant);
  game.halfMovesCount = +halfMoves;
  game.movesCount = +fullMoves;

  return game;
};
