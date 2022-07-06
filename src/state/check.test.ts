import { Color } from '../common';
import { fromTextGrid } from '../serialization';
import { createGameFromPosition } from './state';
import { inCheck } from './check';

const assertInCheck = (color: Color, positionView: string) => {
  const position = fromTextGrid(positionView);
  const game = createGameFromPosition(position, color);
  expect(inCheck(game)).toBe(true);
};

const assertNotInCheck = (color: Color, positionView: string) => {
  const position = fromTextGrid(positionView);
  const game = createGameFromPosition(position, color);
  expect(game.inCheck).toBe(false);
};

describe('Validate king check status', () => {

  it('white king checked by black queen', () => {
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

  it('white king checked by black knight', () => {
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

  it('white king checked by black pawn', () => {
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

  // TODO
  // it('white king is safe', () => {
  //   assertNotInCheck(Color.Black, `
  //     | | | | | | | | |
  //     | | | | | | | |b|
  //     | | | | | | | | |
  //     | | |k|n| |B| | |
  //     | | | | |K| |R|r|
  //     | | | | |Q| | | |
  //     | | | | |q| | | |
  //     | | | | | | | | |
  //   `);
  // });

  it('black king checked by white rook', () => {
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

  // TODO
  // it('black king checked by white pawn', () => {
  //   assertInCheck(Color.White, `
  //     | | | | | | | | |
  //     | | | | | | | | |
  //     | | | | | | | |p|
  //     | | | | | |k| | |
  //     | | |K| |P| | | |
  //     | | | |P| | | | |
  //     | | | | | | | | |
  //     | | | | | | | | |
  //   `);
  // });

  it('black king is safe', () => {
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
