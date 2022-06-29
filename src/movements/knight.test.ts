import { Color } from '../common';
import { AbstractPlacedPiece, Figure, PlacedPiece } from '../piece';
import { BoardSquare } from '../board';
import { createGameFromPosition } from '../state';
import { canMoveTo } from './can-move';

const testPosition: AbstractPlacedPiece[] = [
  { figure: Figure.King, color: Color.Light, square: BoardSquare.E2 },
  { figure: Figure.Knight, color: Color.Light, square: BoardSquare.D3 },
  { figure: Figure.Knight, color: Color.Light, square: BoardSquare.E3 },
  { figure: Figure.Bishop, color: Color.Light, square: BoardSquare.D4 },
  { figure: Figure.King, color: Color.Dark, square: BoardSquare.D8 },
  { figure: Figure.Rook, color: Color.Dark, square: BoardSquare.E4 },
  { figure: Figure.Bishop, color: Color.Dark, square: BoardSquare.E5 },
  { figure: Figure.Knight, color: Color.Dark, square: BoardSquare.C6 },
  { figure: Figure.Pawn, color: Color.Dark, square: BoardSquare.D5 },
  { figure: Figure.Pawn, color: Color.Dark, square: BoardSquare.E6 },
  { figure: Figure.Pawn, color: Color.Dark, square: BoardSquare.F5 },
];

const testCases: {
  input: [Color, BoardSquare, BoardSquare];
  expected: boolean;
}[] = [
  { input: [Color.Light, BoardSquare.E3, BoardSquare.F5], expected: true },
  { input: [Color.Light, BoardSquare.E3, BoardSquare.G2], expected: true },
  { input: [Color.Light, BoardSquare.E3, BoardSquare.H1], expected: false },
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
