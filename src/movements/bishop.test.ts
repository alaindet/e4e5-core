import { Color } from '../common';
import { AbstractPlacedPiece, Figure, PlacedPiece } from '../piece';
import { BoardSquare } from '../board';
import { createGameFromPosition } from '../state';
import { canMoveTo } from './can-move';

const testPosition: AbstractPlacedPiece[] = [
  { figure: Figure.King, color: Color.Light, square: BoardSquare.E1 },
  { figure: Figure.Bishop, color: Color.Light, square: BoardSquare.D3 },
  { figure: Figure.King, color: Color.Dark, square: BoardSquare.E8 },
  { figure: Figure.Knight, color: Color.Dark, square: BoardSquare.C4 },
];

const testCases: [BoardSquare, boolean][] = [
  [BoardSquare.G6, true],
  [BoardSquare.F1, true],
  [BoardSquare.F3, false],
  [BoardSquare.B5, false],
];

describe('Validate bishop movements', () => {
  it('should validate movement based on position', () => {
    let game = createGameFromPosition(testPosition, Color.Light);
    const fromSquare = BoardSquare.D3;
    const bishop = { ...game.board[fromSquare], square: fromSquare } as PlacedPiece;
    testCases.forEach(([square, expected]) => {
      const result = canMoveTo(bishop, square, game.board);
      expect(result).toBe(expected);
    });
  });
});

export {}
