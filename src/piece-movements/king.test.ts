import { SquareLabelEnum } from '../board';
import { fromTextGrid } from '../serialization';
import { getKingAvailableSquares } from './king';

describe('Available squares for king', () => {

  it('should return a valid binary board', () => {
    const board = fromTextGrid(`
      | | | | | | | | |
      | | | | |k| | | |
      | | | | | | | | |
      | | | | | | | | |
      | | | | | | | | |
      | | | | | |K| | |
      | | | | | | | | |
      | | | | | | | | |
    `);
    const result = getKingAvailableSquares(board, SquareLabelEnum.F3);
    expect(result?.filter(s => s === true).length).toBe(9);
  });

  it('should stop when meets other pieces', () => {
    const board = fromTextGrid(`
      | | | | | | | | |
      | | | | |k| | | |
      | | | | | | | | |
      | | | | | | | | |
      | | | | |P|P|p| |
      | | | | | |K| | |
      | | | | | | |R| |
      | | | | | | | | |
    `);
    const result = getKingAvailableSquares(board, SquareLabelEnum.F3);
    expect(result?.filter(s => s === true).length).toBe(6);
  });

  it('should return null if no squares are available', () => {
    const board = fromTextGrid(`
      |r|n|b|q|k|b|n|r|
      |p|p|p|p|p|p|p|p|
      | | | | | | | | |
      | | | | | | | | |
      | | | | | | | | |
      | | | | | | | | |
      |P|P|P|P|P|P|P|P|
      |R|N|B|Q|K|B|N|R|
    `);
    const whiteKingSquares = getKingAvailableSquares(board, SquareLabelEnum.E8);
    expect(whiteKingSquares).toBeNull();

    const blackKingSquare = getKingAvailableSquares(board, SquareLabelEnum.E8);
    expect(blackKingSquare).toBeNull();
  });
});
