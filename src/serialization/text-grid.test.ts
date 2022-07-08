import { Color, Figure } from '../common';
import { SquareContent } from '../board';
import { fromTextGrid } from './text-grid';

describe('Text Grid format', () => {
  it('should deserialize the initial position in text grid', () => {

    const input = `
      |r|n|b|q|k|b|n|r|
      |p|p|p|p|p|p|p|p|
      | | | | | | | | |
      | | | | | | | | |
      | | | | | | | | |
      | | | | | | | | |
      |P|P|P|P|P|P|P|P|
      |R|N|B|Q|K|B|N|R|
    `;

    const board = fromTextGrid(input);

    const pieces = board.filter(s => s !== null);
    expect(pieces.length).toBe(32);

    const isWhiteBishop = (s: SquareContent) => (
      s?.figure === Figure.Bishop &&
      s?.color === Color.White
    );
    const whiteBishops = board.filter(isWhiteBishop);
    expect(whiteBishops.length).toBe(2);

    const pawns = board.filter(s => s?.figure === Figure.Pawn);
    expect(pawns.length).toBe(16);
  });
});

export {};
