import { Color } from '../common';
import { GamePosition, PlacedPiece } from '../piece';
import { BoardSquare } from '../board';
import { createGameFromPosition } from '../state';
import { fromPlainGrid } from '../serialization/plain-grid';
import { canMoveTo } from './can-move';

const testPosition: GamePosition = fromPlainGrid(`
  | | | | | | | | |
  | | | | | | | | |
  | | |k| | | | | |
  | | | |n| | | | |
  | | | |q| | |P| |
  | | | | | | | |P|
  | | | | | | | | |
  | | | | | |K| | |
`);

const testCases: [BoardSquare, boolean][] = [
  [BoardSquare.A4, true],
  [BoardSquare.H4, false],
  [BoardSquare.E5, true],
  [BoardSquare.D5, false],
  [BoardSquare.D1, true],
  [BoardSquare.B6, true],
  [BoardSquare.F2, true],
];

describe('Validate queen movements', () => {
  it('should validate movement based on position', () => {
    let game = createGameFromPosition(testPosition, Color.White);
    const fromSquare = BoardSquare.D4;
    const queen = { ...game.board[fromSquare], square: fromSquare } as PlacedPiece;
    testCases.forEach(([square, expected]) => {
      const result = canMoveTo(queen, square, game.board);
      expect(result).toBe(expected);
    });
  });
});

export {}
