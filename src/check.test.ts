import { createGameFromPosition } from './state';
import { Color } from './common';
import { inCheck } from './check';
import { getPositionFromView } from './view';

const assertInCheck = (color: Color, positionView: string) => {
  const position = getPositionFromView(positionView);
  const game = createGameFromPosition(position, color);
  expect(inCheck(game)).toBe(true);
};

const assertNotInCheck = (color: Color, positionView: string) => {
  const position = getPositionFromView(positionView);
  const game = createGameFromPosition(position, color);
  expect(inCheck(game)).toBe(false);
};

describe('Validate king check status', () => {

  it('light king checked by dark queen', () => {
    assertInCheck(Color.Dark, `
      | | | | | | | | |
      | | | | | | | | |
      | | | | | | | | |
      | | |k| | | | | |
      | | | |q| | | | |
      | | | | |K| | | |
      | | | | | | | | |
      | | | | | | | | |
    `);
  });

  it('light king checked by dark knight', () => {
    assertInCheck(Color.Dark, `
      | | | | | | | | |
      | | | | | | | | |
      | | | | | | | | |
      | | |k|n| | | | |
      | | | | | | | | |
      | | | | |K| | | |
      | | | | | | | | |
      | | | | | | | | |
    `);
  });

  it('light king checked by dark pawn', () => {
    assertInCheck(Color.Dark, `
      | | | | | | | | |
      | | | | | | | | |
      | | | | | | | | |
      | | | | | | | | |
      | | | | | | | | |
      | | |k|p| | | | |
      | | | | |K| | | |
      | | | | | | | | |
    `);
  });

  it('light king is safe', () => {
    assertNotInCheck(Color.Dark, `
      | | | | | | | | |
      | | | | | | | |b|
      | | | | | | | | |
      | | |k|n| |B| | |
      | | | | |K| |R|r|
      | | | | |Q| | | |
      | | | | |q| | | |
      | | | | | | | | |
    `);
  });

  it('dark king checked by light rook', () => {
    assertInCheck(Color.Light, `
      | | | | | | | | |
      | | | | | | | | |
      | | | | | | | | |
      | | |R| | |k| | |
      | | |K| | | | | |
      | | | | | | | | |
      | | | | | | | | |
      | | | | | | | | |
    `);
  });

  it('dark king checked by light pawn', () => {
    assertInCheck(Color.Light, `
      | | | | | | | | |
      | | | | | | | | |
      | | | | | | | |p|
      | | | | | |k| | |
      | | |K| |P| | | |
      | | | |P| | | | |
      | | | | | | | | |
      | | | | | | | | |
    `);
  });

  it('dark king is safe', () => {
    assertNotInCheck(Color.Light, `
      | | |B| | | | | |
      | | | | | | | | |
      | | | | |p| | | |
      | | |R| |r|k| | |
      | | |K| | | | | |
      | | | | | | | | |
      | | | | | | | | |
      | | | | | | | | |
    `);
  });
});

export {};
