import { Color } from '../common';
import { GamePosition, PlacedPiece } from '../piece';
import { BoardSquare } from '../board';
import { createGameFromPosition } from '../state';
import { fromTextGrid } from '../serialization';
import { canMoveTo } from './can-move';

const testPosition: GamePosition = fromTextGrid(`
  | | | | | | | | |
  | | | | | | | | |
  | | | |p| | | | |
  | | | |r|k| | | |
  | | | | | |N| | |
  | | | | | |K| | |
  | | | | | | | | |
  | | | | | | | | |
`);

const testCases: [BoardSquare, boolean][] = [
  [BoardSquare.E4, true],
  [BoardSquare.D5, false],
  [BoardSquare.F4, true],
  [BoardSquare.D6, false],
];

describe('Validate king movements', () => {
  it('should validate movement based on position', () => {
    let game = createGameFromPosition(testPosition, Color.Black);
    const fromSquare = BoardSquare.E5;
    const king = { ...game.board[fromSquare], square: fromSquare } as PlacedPiece;
    testCases.forEach(([square, expected]) => {
      const result = canMoveTo(king, square, game.board);
      expect(result).toBe(expected);
    });
  });
});

export {}
