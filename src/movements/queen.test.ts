import { Color } from '../common';
import { GamePosition, PlacedPiece } from '../piece';
import { BoardSquare } from '../board';
import { createGameFromPosition } from '../state';
import { canMoveTo } from './can-move';
import { getPositionFromView } from '../view';

const testPosition: GamePosition = getPositionFromView(`
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
    let game = createGameFromPosition(testPosition, Color.Light);
    const fromSquare = BoardSquare.D4;
    const queen = { ...game.board[fromSquare], square: fromSquare } as PlacedPiece;
    testCases.forEach(([square, expected]) => {
      const result = canMoveTo(queen, square, game.board);
      expect(result).toBe(expected);
    });
  });
});

export {}
