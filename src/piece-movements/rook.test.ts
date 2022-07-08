import { SquareLabelEnum } from '../board';
import { fromTextGrid } from '../serialization';
import { getRookAvailableSquares } from './rook';

describe('Available squares for rook', () => {

  it('should return a valid binary board', () => {
    const board = fromTextGrid(`
      | | | | | | | | |
      | | | | |k| | | |
      | | | | | | | | |
      | | | | | | | | |
      | | | |R| | | | |
      | | | | |K| | | |
      | | | | | | | | |
      | | | | | | | | |
    `);
    const result = getRookAvailableSquares(board, SquareLabelEnum.D4);
    expect(result?.filter(s => s === true).length).toBe(15);
  });

  it('should stop when meets other pieces', () => {
    const board = fromTextGrid(`
      | | | | | | | | |
      | | | | |k| | | |
      | | | | | | | | |
      | |P| | |r|r| | |
      | | | | | | | | |
      | | | | |K| | | |
      | | | | | | | | |
      | | | | | | | | |
    `);
    const result = getRookAvailableSquares(board, SquareLabelEnum.E5);
    expect(result?.filter(s => s === true).length).toBe(7);
  });

  it('should return null if no squares are available', () => {
    const board = fromTextGrid(`
      | | | | | | | | |
      | | | | |k| | | |
      | | | | |P| | | |
      | | | |P|R|P| | |
      | | | | |P| | | |
      | | | | |K| | | |
      | | | | | | | | |
      | | | | | | | | |
    `);
    const result = getRookAvailableSquares(board, SquareLabelEnum.E5);
    expect(result).toBeNull();
  });
});
