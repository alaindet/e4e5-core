import { SquareIndex } from './board';
import { areOnSameDiagonal, areOnSameFile, areOnSameRank, BoardDirection, getSquareDeltas, getToSquare } from './board-movement';

describe('Squares arrangement validators', () => {

  it('should validate squares on the same file', () => {
    const testCases: [[SquareIndex, SquareIndex], boolean][] = [
      [[2, 34], true],
      [[0, 56], true],
      [[0, 8], true],
      [[7, 15], true],
      [[12, 60], true],
      [[19, 27], true],
      [[2, 31], false],
      [[0, 63], false],
      [[0, 1], false],
      [[5, 12], false],
      [[42, 36], false],
    ];
    testCases.forEach(([[a, b], expected]) => {
      const result = areOnSameFile(a, b);
      expect(result).toBe(expected);
    });
  });

  it('should validate squares on the same rank', () => {
    const testCases: [[SquareIndex, SquareIndex], boolean][] = [
      [[0, 1], true],
      [[56, 63], true],
      [[10, 11], true],
      [[42, 40], true],
      [[14, 9], true],
      [[48, 55], true],
      [[7, 8], false],
      [[47, 48], false],
      [[1, 8], false],
      [[0, 63], false],
      [[15, 16], false],
      [[7, 18], false],
    ];
    testCases.forEach(([[a, b], expected]) => {
      const result = areOnSameRank(a, b);
      expect(result).toBe(expected);
    });
  });

  it('should validate squares on the same diagonal', () => {
    const testCases: [[SquareIndex, SquareIndex], boolean][] = [
      [[0, 63], true],
      [[63, 0], true],
      [[42, 21], true],
      [[42, 60], true],
      [[42, 49], true],
      [[42, 24], true],
      [[7, 56], true],
      [[56, 7], true],
      [[0, 62], false],
      [[3, 20], false],
      [[13, 21], false],
      [[0, 1], false],
      [[1, 17], false],
    ];
    testCases.forEach(([[a, b], expected]) => {
      const result = areOnSameDiagonal(a, b);
      expect(result).toBe(expected);
    });
  });
});

describe('Move around board via instructions', () => {
  it('should reach existing squares from a square', () => {
    const testCases: [[SquareIndex, BoardDirection, number], SquareIndex | null][] = [
      [[18, BoardDirection.Vertical, 1], 10],
      [[36, BoardDirection.Vertical, 3], 12],
      [[2, BoardDirection.Vertical, -2], 18],
      [[2, BoardDirection.Vertical, 2], null],
      [[60, BoardDirection.Vertical, -14], null],
      [[42, BoardDirection.Horizontal, 1], 43],
      [[42, BoardDirection.Horizontal, 0], 42],
      [[31, BoardDirection.Horizontal, -2], 29],
      [[31, BoardDirection.Horizontal, 2], null],
      [[0, BoardDirection.Horizontal, -1], null],
      [[32, BoardDirection.Horizontal, -1], null],
      [[56, BoardDirection.AscendingDiagonal, 7], 7],
      [[36, BoardDirection.AscendingDiagonal, -3], 57],
      [[36, BoardDirection.AscendingDiagonal, -8], null],
      [[36, BoardDirection.AscendingDiagonal, -7], null],
      [[36, BoardDirection.AscendingDiagonal, 10], null],
      [[36, BoardDirection.AscendingDiagonal, 7], null],
      [[58, BoardDirection.AscendingDiagonal, -1], null],
      [[10, BoardDirection.DescendingDiagonal, 1], 3],
      [[49, BoardDirection.DescendingDiagonal, 4], 28],
      [[21, BoardDirection.DescendingDiagonal, -3], 42],
      [[48, BoardDirection.DescendingDiagonal, 2], null],
      [[37, BoardDirection.DescendingDiagonal, -4], null],
      [[37, BoardDirection.DescendingDiagonal, -7], null],
      [[37, BoardDirection.DescendingDiagonal, 7], null],
      [[37, BoardDirection.DescendingDiagonal, -10], null],
      [[37, BoardDirection.DescendingDiagonal, 10], null],
    ];
    const deltas = getSquareDeltas();
    testCases.forEach(([[from, dir, amount], expected]) => {
      const result = getToSquare(from, dir, amount, deltas);
      expect(result).toBe(expected);
    });
  });
});

export {};
