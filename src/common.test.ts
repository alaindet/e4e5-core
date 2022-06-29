import { Color, getOppositeColor } from './common';

describe('Get opposite color', () => {

  const testCases: [Color, Color][] = [
    [Color.Dark, Color.Light],
    [Color.Light, Color.Dark],
  ];

  it('should provide the opposite color', () => {
    testCases.forEach(([input, expected]) => {
      expect(getOppositeColor(input)).toBe(expected);
    });
  });
});

export {};
