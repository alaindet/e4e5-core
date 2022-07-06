import { Color } from '@/common';
import { GamePosition, PlacedPiece } from '@/piece';
import { BoardSquare } from '@/board';
import { createGameFromPosition } from '@/state';
import { fromTextGrid } from '@/serialization';
import { canMoveTo } from './can-move';

const testPosition: GamePosition = fromTextGrid(`
  | | | | |k| | | |
  | | | | | | | | |
  | | | | | | | | |
  | | | | | | | | |
  | | |n| | | | | |
  | | | |B| | | | |
  | | | | | | | | |
  | | | | |K| | | |
`);

const testCases: [BoardSquare, boolean][] = [
  [BoardSquare.G6, true],
  [BoardSquare.F1, true],
  [BoardSquare.F3, false],
  [BoardSquare.B5, false],
];

describe('Validate bishop movements', () => {
  it('should validate movement based on position', () => {
    let game = createGameFromPosition(testPosition, Color.White);
    const fromSquare = BoardSquare.D3;
    const bishop = { ...game.board[fromSquare], square: fromSquare } as PlacedPiece;
    testCases.forEach(([square, expected]) => {
      const result = canMoveTo(bishop, square, game.board);
      expect(result).toBe(expected);
    });
  });
});

export {}
