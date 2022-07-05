import { fromPlainGrid } from '../serialization';
import { Color } from '../common';
import { createGameFromPosition } from './state';
import { inCheck } from './check';

const assertInCheck = (color: Color, positionView: string) => {
  const position = fromPlainGrid(positionView);
  const game = createGameFromPosition(position, color);
  expect(inCheck(game)).toBe(true);
};

const assertNotInCheck = (color: Color, positionView: string) => {
  const position = fromPlainGrid(positionView);
  const game = createGameFromPosition(position, color);
  expect(inCheck(game)).toBe(false);
};

describe('Validate king check status', () => {

  it('light king checked by dark queen', () => {
    assertInCheck(Color.Black, `
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
    assertInCheck(Color.Black, `
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
    assertInCheck(Color.Black, `
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
    assertNotInCheck(Color.Black, `
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
    assertInCheck(Color.White, `
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
    assertInCheck(Color.White, `
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
    assertNotInCheck(Color.White, `
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
