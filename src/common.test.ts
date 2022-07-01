import { Color, getOppositeColor } from './common';

describe('Get opposite color', () => {

  const testCases: [Color, Color][] = [
    [Color.Black, Color.White],
    [Color.White, Color.Black],
  ];

  it('should provide the opposite color', () => {
    testCases.forEach(([input, expected]) => {
      expect(getOppositeColor(input)).toBe(expected);
    });
  });
});

export {};
