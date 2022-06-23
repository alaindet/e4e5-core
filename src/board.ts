export type BoardCoordinate = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

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

export enum Color {
  Light = 0,
  Dark = 1,
}

export type BoardSquare = `${BoardFile}${BoardCoordinate}`;

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

export const getSquareColor = (square: BoardSquare): Color => {
  const file = BOARD_FILE_TO_COORDINATE[square[0] as BoardFile];
  const rank = +square[1];
  return file + rank % 2 === 0 ? Color.Dark : Color.Light;
};
