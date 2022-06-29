import { Color } from './common';
import { Piece } from './piece';

export type BoardCoordinate = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type BoardCoordinates = [BoardCoordinate, BoardCoordinate];

export enum BoardFile {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
  H = 'H',
}

export type BoardSquareLabel = `${BoardFile}${BoardCoordinate}`;

export type BoardState = {
  [square in BoardSquare]: Piece | null;
};

export enum BoardSquare {
  A1 = 'A1', A2 = 'A2', A3 = 'A3', A4 = 'A4', A5 = 'A5', A6 = 'A6', A7 = 'A7', A8 = 'A8',
  B1 = 'B1', B2 = 'B2', B3 = 'B3', B4 = 'B4', B5 = 'B5', B6 = 'B6', B7 = 'B7', B8 = 'B8',
  C1 = 'C1', C2 = 'C2', C3 = 'C3', C4 = 'C4', C5 = 'C5', C6 = 'C6', C7 = 'C7', C8 = 'C8',
  D1 = 'D1', D2 = 'D2', D3 = 'D3', D4 = 'D4', D5 = 'D5', D6 = 'D6', D7 = 'D7', D8 = 'D8',
  E1 = 'E1', E2 = 'E2', E3 = 'E3', E4 = 'E4', E5 = 'E5', E6 = 'E6', E7 = 'E7', E8 = 'E8',
  F1 = 'F1', F2 = 'F2', F3 = 'F3', F4 = 'F4', F5 = 'F5', F6 = 'F6', F7 = 'F7', F8 = 'F8',
  G1 = 'G1', G2 = 'G2', G3 = 'G3', G4 = 'G4', G5 = 'G5', G6 = 'G6', G7 = 'G7', G8 = 'G8',
  H1 = 'H1', H2 = 'H2', H3 = 'H3', H4 = 'H4', H5 = 'H5', H6 = 'H6', H7 = 'H7', H8 = 'H8',
}

export enum BoardDirection {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left',
  DiagonalTopRight = 'diagonal-top-right',
  DiagonalBottomRight = 'diagonal-bottom-right',
  DiagonalTopLeft = 'diagonal-top-left',
  DiagonalBottomLeft = 'diagonal-bottom-left',
}

export class NoSquareFoundError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NoSquareFoundError.prototype);
  }
}

export const getEmptyBoard = (): BoardState => {
  return Object.values(BoardSquare).reduce((board, square) => {
    board[square] = null;
    return board;
  }, {} as BoardState);
};

export const getSquareCoordinates = (square: BoardSquare): BoardCoordinates => {
  // In UTF-16 => A = 65, B = 66, ..., H = 72
  const file = square[0].charCodeAt(0) - 64 as BoardCoordinate;
  const rank = +square[1];
  return [file, rank as BoardCoordinate];
};

export const getSquareFromCoordinates = (
  _file: BoardCoordinate,
  rank: BoardCoordinate,
): BoardSquare => {
  // In UTF-16 => A = 65, B = 66, ..., H = 72
  const file = String.fromCharCode(_file + 64);
  return `${file}${rank}` as BoardSquare;
};

// Ex.: 'B3' => 2 + 5 is odd => light square
export const getSquareColor = (square: BoardSquare): Color => {
  const [file, rank] = getSquareCoordinates(square);
  return (file + rank) % 2 === 0 ? Color.Dark : Color.Light;
};

export const getToSquare = (
  square: BoardSquare,
  dir: BoardDirection,
  amount = 1,
): BoardSquare => {

  if (Math.abs(amount) > 8 - 1) {
    throw new NoSquareFoundError(`You cannot move by ${amount} squares`);
  }

  const BOARD_MOVEMENT: { [dir in BoardDirection]: [number, number] } = {
    [BoardDirection.Top]: [0, 1],
    [BoardDirection.Right]: [1, 0],
    [BoardDirection.Bottom]: [0, -1],
    [BoardDirection.Left]: [-1, 0],
    [BoardDirection.DiagonalTopRight]: [1, 1],
    [BoardDirection.DiagonalBottomRight]: [1, -1],
    [BoardDirection.DiagonalTopLeft]: [-1, 1],
    [BoardDirection.DiagonalBottomLeft]: [-1, -1],
  };

  const [file, rank] = getSquareCoordinates(square);
  let [fileDiff, rankDiff] = BOARD_MOVEMENT[dir];
  const nextFile = file + fileDiff * amount;
  const nextRank = rank + rankDiff * amount;

  if (nextFile < 1 || nextFile > 8 || nextRank < 1 || nextRank > 8) {
    throw new NoSquareFoundError('Square not found');
  }

  return getSquareFromCoordinates(
    nextFile as BoardCoordinate,
    nextRank as BoardCoordinate,
  );
};

export const getSquaresDistance = (a: BoardSquare, b: BoardSquare): number => {
  const [aFile, aRank] = getSquareCoordinates(a);
  const [bFile, bRank] = getSquareCoordinates(b);
  return Math.max(Math.abs(aFile - bFile), Math.abs(aRank - bRank));
};

export const getSquaresDiff = (a: BoardSquare, b: BoardSquare): [number, number] => {
  const [aFile, aRank] = getSquareCoordinates(a);
  const [bFile, bRank] = getSquareCoordinates(b);
  return [bFile - aFile, bRank - aRank];
};
