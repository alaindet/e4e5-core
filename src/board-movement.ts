import { SquareIndex } from './board';

export enum BoardDirection {
  Vertical = 'v',
  Horizontal = 'h',
  AscendingDiagonal = 'a',
  DescendingDiagonal = 'd',
}

export function areOnSameRank(a: SquareIndex, b: SquareIndex): boolean {
  const width = 8;
  return Math.abs(Math.floor(a / width)) === Math.abs(Math.floor(b / width));
}

export function areOnSameFile(a: SquareIndex, b: SquareIndex): boolean {
  const width = 8;
  return Math.abs(a % width) === Math.abs(b % width);
}

export function areOnSameDiagonal(a: SquareIndex, b: SquareIndex): boolean {
  const width = 8;
  const ascDiff = 1 - width;
  const descDiff = 1 + width;
  return (b - a) % ascDiff === 0 || (b - a) % descDiff === 0;
}

export function getSquareDeltas(): { [dir in BoardDirection]: number } {
  const width = 8;
  return {
    [BoardDirection.Vertical]: -width,
    [BoardDirection.Horizontal]: 1,
    [BoardDirection.AscendingDiagonal]: -width + 1,
    [BoardDirection.DescendingDiagonal]: width + 1,
  };
}

export function getSquareDelta(
  dir: BoardDirection,
  amount: number,
  deltas?: { [dir in BoardDirection]: number },
): number {
  deltas = deltas ?? getSquareDeltas();
  return deltas[dir] * amount;
}

export function getToSquare(
  fromSquare: SquareIndex,
  dir: BoardDirection,
  amount: number,
  deltas?: { [dir in BoardDirection]: number },
): SquareIndex | null {

  if (amount === 0) {
    return fromSquare;
  }

  if (amount < -7 || amount > 7) {
    return null;
  }

  deltas = deltas ?? getSquareDeltas();
  const [v, h, asc, desc] = Object.values(BoardDirection);
  const delta = getSquareDelta(dir, amount, deltas);
  const toSquare = fromSquare + delta as SquareIndex;

  if (
    toSquare < 0 ||
    toSquare > 63 ||
    (dir === v && !areOnSameFile(fromSquare, toSquare)) ||
    (dir === h && !areOnSameRank(fromSquare, toSquare)) ||
    ((dir === asc || dir === desc) && !areOnSameDiagonal(fromSquare, toSquare))
  ) {
    return null;
  }

  return toSquare;
}
