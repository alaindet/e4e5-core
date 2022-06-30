import { BoardCoordinates, BoardCoordinate, getSquareFromCoordinates } from '../board';
import { Color } from '../common';
import { createGameFromPosition, GameState } from '../state';
import { GamePosition } from '../piece';
import { getPieceLetters } from './piece-letters';

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

export const fromFENActive = (active: string): Color => {
  return active === 'w' ? Color.Light : Color.Dark;
};

// https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
// Example: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
export const fromFEN = (fen: string): GameState => {
  // TODO: Add this missing data to game
  const [board, active, castling, enPassant, halfMoves, fullMoves] = fen.split(' ');
  const position = fromFENBoard(board);
  const turn = fromFENActive(active);
  return createGameFromPosition(position, turn);
};
