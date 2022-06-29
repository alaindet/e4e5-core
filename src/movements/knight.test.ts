import { Color } from '../common';
import { GamePosition, PlacedPiece } from '../piece';
import { BoardSquare } from '../board';
import { createGameFromPosition } from '../state';
import { canMoveTo } from './can-move';
import { getPositionFromView } from '../view';

const testPosition: GamePosition = getPositionFromView(`
  | | | |k| | | | |
  | | | | | | | | |
  | | |n| |p| | | |
  | | | |p|b|p| | |
  | | | |B|r| | | |
  | | | |N|N| | | |
  | | | | |K| | | |
  | | | | | | | | |
`);

const testCases: {
  input: [Color, BoardSquare, BoardSquare];
  expected: boolean;
}[] = [
  { input: [Color.Light, BoardSquare.E3, BoardSquare.F5], expected: true },
  { input: [Color.Light, BoardSquare.E3, BoardSquare.G2], expected: true },
  { input: [Color.Light, BoardSquare.E3, BoardSquare.H1], expected: false },
  { input: [Color.Light, BoardSquare.E3, BoardSquare.F2], expected: false },
  { input: [Color.Light, BoardSquare.D3, BoardSquare.E5], expected: true },
  { input: [Color.Light, BoardSquare.D3, BoardSquare.F4], expected: true },
  { input: [Color.Dark, BoardSquare.C6, BoardSquare.D4], expected: true },
  { input: [Color.Dark, BoardSquare.C6, BoardSquare.A7], expected: true },
  { input: [Color.Dark, BoardSquare.C6, BoardSquare.E5], expected: false },
];

describe('Validate knight movements', () => {
  it('should validate movement based on position', () => {
    testCases.forEach(({ input, expected }) => {
      const [color, fromSquare, toSquare] = input;
      let game = createGameFromPosition(testPosition, color);
      const knight = { ...game.board[fromSquare], square: fromSquare } as PlacedPiece;
      const result = canMoveTo(knight, toSquare, game.board);
      expect(result).toBe(expected);
    });
  });
});

export {}
