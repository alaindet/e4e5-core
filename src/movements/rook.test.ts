import { Color } from '../common';
import { GamePosition, PlacedPiece } from '../piece';
import { BoardSquare } from '../board';
import { createGameFromPosition } from '../state';
import { canMoveTo } from './can-move';
import { getPositionFromView } from '../view';

const testPosition: GamePosition = getPositionFromView(`
  | | | | | | | | |
  | | | | | | | | |
  | | | | | | | | |
  | | | | | | | | |
  | | | | |B| | | |
  | |p|k| | | | | |
  | | |r| |R| | | |
  | | | | | |K| | |
`);

const testCases: [BoardSquare, boolean][] = [
  [BoardSquare.H2, true],
  [BoardSquare.B2, false],
  [BoardSquare.C2, true],
  [BoardSquare.E8, false],
  [BoardSquare.D2, true],
];

describe('Validate rook movements', () => {
  it('should validate movement based on position', () => {
    let game = createGameFromPosition(testPosition, Color.Light);
    const fromSquare = BoardSquare.E2;
    const rook = { ...game.board[fromSquare], square: fromSquare } as PlacedPiece;
    testCases.forEach(([square, expected]) => {
      const result = canMoveTo(rook, square, game.board);
      expect(result).toBe(expected);
    });
  });
});

export {}
