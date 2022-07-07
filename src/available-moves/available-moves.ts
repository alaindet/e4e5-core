import { BoardCoordinate } from 'board';
import { Move } from '../move';
import { GameState } from '../state';

export type BinaryBoard = Map<[BoardCoordinate, BoardCoordinate], boolean>;

export function range(fromOrTo: number, to?: number): number[] {
  const result: number[] = [];
  const [lower, upper] = to ? [fromOrTo, to] : [0, fromOrTo];
  for (let i = lower; i <= upper; i++) {
    result.push(i);
  }
  return result;
}

export function getEmptyBinaryBoard(): BinaryBoard {

  const initialMap: [[BoardCoordinate, BoardCoordinate], boolean][] = [];
  const coords = range(1, 8);

  coords.forEach(rank => {
    const line: [BoardCoordinate, BoardCoordinate][] = [];
    coords.forEach(file => {
      // ...
    });
    // ...
  });

  return new Map<[BoardCoordinate, BoardCoordinate], boolean>([
    [[1, 1], false],
  ]);
}

export function availableSquares(game: GameState): BinaryBoard {

}
