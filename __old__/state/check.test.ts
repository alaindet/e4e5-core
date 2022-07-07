import { Color } from '../common';
import { fromTextGrid } from '../serialization';
import { createGameFromPosition } from './state';

const assertInCheck = (color: Color, positionView: string) => {
  const position = fromTextGrid(positionView);
  const game = createGameFromPosition(position, color);
  expect(game.inCheck).toBe(true);
};

const assertNotInCheck = (color: Color, positionView: string) => {
  const position = fromTextGrid(positionView);
  const game = createGameFromPosition(position, color);
  expect(game.inCheck).toBe(false);
};

describe('Validate king check status', () => {

  it('white king checked by black queen', () => {
    assertInCheck(Color.White, `
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

  it('white king checked by black knight', () => {
    assertInCheck(Color.White, `
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

  it('white king checked by black pawn', () => {
    assertInCheck(Color.White, `
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

  it('white king is safe', () => {
    assertNotInCheck(Color.White, `
      | | | | | | | | |
      | | | | | | | |b|
      | | | | | | | | |
      | | |k| | |B| | |
      | | | |n|K| |R|r|
      | | | | |Q| | | |
      | | | | |q| | | |
      | | | | | | | | |
    `);
  });

  it('black king checked by white rook', () => {
    assertInCheck(Color.Black, `
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

  it('black king checked by white pawn', () => {
    assertInCheck(Color.Black, `
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

  it('black king is safe', () => {
    assertNotInCheck(Color.Black, `
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
