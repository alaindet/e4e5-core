import { Piece } from './piece';

export type BoardFile = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
export type BoardRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type SquareContent = Piece | null;
export type SquareLabel = `${BoardFile}${BoardRank}`;
export type SquareIndex = (
  |  0 |  1 |  2 |  3 |  4 |  5 |  6 |  7
  |  8 |  9 | 10 | 11 | 12 | 13 | 14 | 15
  | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23
  | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31
  | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39
  | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47
  | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55
  | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63
);

export type Board = SquareContent[];

export function getEmptyBoard(): any[] {
  return new Array(64).fill(null);
}

export function getSquareLabels(): SquareLabel[] {
  return [
    'A8', 'B8', 'C8', 'D8', 'E8', 'F8', 'G8', 'H8',
    'A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7',
    'A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6', 'H6',
    'A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5',
    'A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4',
    'A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3',
    'A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2',
    'A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1',
  ];
}

export function getSquareLabel(index: number, labels?: SquareLabel[]): (
  | SquareLabel
  | null
) {
  labels = labels ?? getSquareLabels();
  return (index >= 0 && index <= labels.length - 1) ? labels[index] : null;
}

export function getSquareIndices(labels?: SquareLabel[]): Map<SquareLabel, number> {
  labels = labels ?? getSquareLabels()
  return new Map<SquareLabel, number>(
    labels.map((label, index) => [label, index])
  );
}

export function getSquareIndex(label: SquareLabel, indices?: Map<SquareLabel, number>): (
  | number
  | null
) {
  indices = indices ?? getSquareIndices();
  return indices.get(label) ?? null;
}
