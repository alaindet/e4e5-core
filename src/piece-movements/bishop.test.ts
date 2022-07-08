import { SquareLabelEnum } from '../board';
import { fromTextGrid } from '../serialization';
import { getBishopAvailableSquares } from './bishop';

describe('Available squares for bishop', () => {

  it('should return a valid binary board', () => {
    const board = fromTextGrid(`
      | | | | | | | | |
      | | | | |k| | | |
      | | | | | | | | |
      | | | | |b| | | |
      | | | | | | | | |
      | | | | |K| | | |
      | | | | | | | | |
      | | | | | | | | |
    `);
    const result = getBishopAvailableSquares(board, SquareLabelEnum.E5);
    expect(result?.filter(s => s === true).length).toBe(14);
  });

  it('should stop when meets other pieces', () => {
    const board = fromTextGrid(`
      | | | | | | | | |
      | | | | |k| | | |
      | | | | | |p| | |
      | | | | |b| | | |
      | | | | | |P| | |
      | | | | |K| | | |
      | |P| | | | | | |
      | | | | | | | | |
    `);
    const result = getBishopAvailableSquares(board, SquareLabelEnum.E5);
    expect(result?.filter(s => s === true).length).toBe(8);
  });

  it('should return null if no squares are available', () => {
    const board = fromTextGrid(`
      | | | | | | | | |
      | | | | |k| | | |
      | | | |p| |p| | |
      | | | | |b| | | |
      | | | |p| |p| | |
      | | | | |K| | | |
      | | | | | | | | |
      | | | | | | | | |
    `);
    const result = getBishopAvailableSquares(board, SquareLabelEnum.E5);
    expect(result).toBeNull();
  });
});

export {};
