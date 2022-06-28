import { Color } from '../common';
import { AbstractPlacedPiece, Figure, PlacedPiece } from '../piece';
import { BoardSquare } from '../board';
import { createGameFromPosition } from '../state';
import { canMoveTo } from './can-move';

const testPosition: AbstractPlacedPiece[] = [
  { figure: Figure.King, color: Color.Dark, square: BoardSquare.E5 },
  { figure: Figure.Rook, color: Color.Dark, square: BoardSquare.D5 },
  { figure: Figure.Pawn, color: Color.Dark, square: BoardSquare.D6 },
  { figure: Figure.King, color: Color.Light, square: BoardSquare.F3 },
  { figure: Figure.Knight, color: Color.Light, square: BoardSquare.F4 },
];

const testCases: [BoardSquare, boolean][] = [
  [BoardSquare.E4, true],
  [BoardSquare.D5, false],
  [BoardSquare.F4, true],
  [BoardSquare.D6, false],
];

describe('Validate king movements', () => {
  it('should validate movement based on position', () => {
    let game = createGameFromPosition(testPosition, Color.Dark);
    const fromSquare = BoardSquare.E5;
    const king = { ...game.board[fromSquare], square: fromSquare } as PlacedPiece;
    testCases.forEach(([square, expected]) => {
      const result = canMoveTo(king, square, game.board);
      expect(result).toBe(expected);
    });
  });
});

export {}
