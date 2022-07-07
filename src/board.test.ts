import { getSquareIndex, getSquareIndices, getSquareLabel, getSquareLabels, SquareLabel } from './board';

describe('Board square labels to indices', () => {
  
  it('should convert square indices to labels', () => {

    const testCases: [number, SquareLabel | null][] = [
      [0, 'A8'],
      [1, 'B8'],
      [8, 'A7'],
      [37, 'F4'],
      [63, 'H1'],
      [-1, null],
      [-5, null],
      [64, null],
      [76, null],
    ];

    const labels = getSquareLabels();
    testCases.forEach(([index, expected]) => {
      const label = getSquareLabel(index, labels);
      if (expected === null) {
        expect(label).toBeNull();
      } else {
        expect(label).toEqual(expected);
      }
    });
  });

  it('should convert square labels', () => {

    const testCases: [SquareLabel, number | null][] = [
      ['A8', 0],
      ['B8', 1],
      ['A7', 8],
      ['F4', 37],
      ['H1', 63],
      ['hello' as SquareLabel, null],
      ['there' as SquareLabel, null],
    ];

    const indices = getSquareIndices();
    testCases.forEach(([label, expected]) => {
      const index = getSquareIndex(label, indices);
      if (expected === null) {
        expect(index).toBeNull();
      } else {
        expect(index).toBe(expected);
      }
    });
  });

});

export {};
