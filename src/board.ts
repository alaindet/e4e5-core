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

export const BOARD_MOVEMENT: { [dir in BoardDirection]: [number, number] } = {
  [BoardDirection.Top]: [0, 1],
  [BoardDirection.Right]: [1, 0],
  [BoardDirection.Bottom]: [0, -1],
  [BoardDirection.Left]: [-1, 0],
  [BoardDirection.DiagonalTopRight]: [1, 1],
  [BoardDirection.DiagonalBottomRight]: [1, -1],
  [BoardDirection.DiagonalTopLeft]: [-1, 1],
  [BoardDirection.DiagonalBottomLeft]: [-1, -1],
};

export const BOARD_FILE_TO_COORDINATE: { [file in BoardFile]: BoardCoordinate } = {
  [BoardFile.A]: 1,
  [BoardFile.B]: 2,
  [BoardFile.C]: 3,
  [BoardFile.D]: 4,
  [BoardFile.E]: 5,
  [BoardFile.F]: 6,
  [BoardFile.G]: 7,
  [BoardFile.H]: 8,
};

export const BOARD_COORDINATE_TO_FILE: { [c in BoardCoordinate]: BoardFile} = {
  1: BoardFile.A,
  2: BoardFile.B,
  3: BoardFile.C,
  4: BoardFile.D,
  5: BoardFile.E,
  6: BoardFile.F,
  7: BoardFile.G,
  8: BoardFile.H,
};

export const EMPTY_SQUARE = null;
export const MIN_BOARD_COORDINATE = 1;
export const MAX_BOARD_COORDINATE = 8;

export const getEmptyBoard = (): BoardState => {
  return Object.values(BoardSquare).reduce((board, square) => {
    board[square] = null;
    return board;
  }, {} as BoardState);
};

export const getSquareCoordinates = (square: BoardSquare): BoardCoordinates => {
  const file = BOARD_FILE_TO_COORDINATE[square[0] as BoardFile];
  const rank = +square[1];
  return [file, rank as BoardCoordinate];
};

export const getSquareFromCoordinates = (
  file: BoardCoordinate,
  rank: BoardCoordinate,
): BoardSquare => {
  return `${BOARD_COORDINATE_TO_FILE[file]}${rank}` as BoardSquare;
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

  if (Math.abs(amount) > MAX_BOARD_COORDINATE - 1) {
    throw new NoSquareFoundError(`You cannot move by ${amount} squares`);
  }

  const [file, rank] = getSquareCoordinates(square);
  let [fileDiff, rankDiff] = BOARD_MOVEMENT[dir];
  const nextFile = file + fileDiff * amount;
  const nextRank = rank + rankDiff * amount;

  if (
    nextFile < MIN_BOARD_COORDINATE ||
    nextFile > MAX_BOARD_COORDINATE ||
    nextRank < MIN_BOARD_COORDINATE ||
    nextRank > MAX_BOARD_COORDINATE
  ) {
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
