import { Color } from '../common';
import { GamePosition, PlacedPiece } from '../piece';
import { BoardSquare } from '../board';
import { createGameFromPosition } from '../state/state';
import { canMoveTo } from './can-move';
import { fromPlainGrid } from '../serialization/plain-grid';

const testPosition: GamePosition = fromPlainGrid(`
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
    let game = createGameFromPosition(testPosition);
    game.turn = Color.White;
    const fromSquare = BoardSquare.D3;
    const bishop = { ...game.board[fromSquare], square: fromSquare } as PlacedPiece;
    testCases.forEach(([square, expected]) => {
      const result = canMoveTo(bishop, square, game.board);
      expect(result).toBe(expected);
    });
  });
});

export {}
