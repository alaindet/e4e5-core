import { SquareLabelEnum } from '../board';
import { fromTextGrid } from '../serialization';
import { getQueenAvailableSquares } from './queen';

describe('Available squares for queen', () => {

  it('should return a valid binary board', () => {
    const board = fromTextGrid(`
      | | | | | | | | |
      | | | | |k| | | |
      | | | | | | | | |
      | | | | | | | | |
      | | | |q| | | | |
      | | | | | |K| | |
      | | | | | | | | |
      | | | | | | | | |
    `);
    const result = getQueenAvailableSquares(board, SquareLabelEnum.D4);
    expect(result?.filter(s => s === true).length).toBe(28);
  });

  it('should stop when meets other pieces', () => {
    const board = fromTextGrid(`
      | | |r| | | | | |
      | | | | |k| | | |
      | | |Q|P| | | | |
      | | | | | | | | |
      | | | | | | | | |
      | | | | | |K| | |
      | | | | | | | | |
      | | | | | | | | |
    `);
    const result = getQueenAvailableSquares(board, SquareLabelEnum.C6);
    expect(result?.filter(s => s === true).length).toBe(18);
  });

  it('should return null if no squares are available', () => {
    const board1 = fromTextGrid(`
      | | | | | | | | |
      | | | | |k| | | |
      | | | |B|P|B| | |
      | | | |P|Q|P| | |
      | | | |R|P|R| | |
      | | | | |K| | | |
      | | | | | | | | |
      | | | | | | | | |
    `);
    const result1 = getQueenAvailableSquares(board1, SquareLabelEnum.E5);
    expect(result1).toBeNull();

    const board2 = fromTextGrid(`
      | | | | | | | | |
      | | | | | | | | |
      | | | | | | | | |
      | | | | | | | | |
      | | | | | |k| | |
      | | | | | | | | |
      | | | | | | |P|K|
      | | | | | | |R|Q|
    `);
    const result2 = getQueenAvailableSquares(board2, SquareLabelEnum.H1);
    expect(result2).toBeNull();
  });
});
