import { SquareIndex } from './board';
import { areOnSameDiagonal, areOnSameFile, areOnSameRank } from './board-movement';

describe('Squares relationship validators', () => {

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

export {};
