import { Color } from '../common';
import { AbstractPlacedPiece, Figure, PlacedPiece } from '../piece';
import { BoardSquare } from '../board';
import { createGameFromPosition } from '../state';
import { canMoveTo } from './can-move';

const testPosition: AbstractPlacedPiece[] = [
  { figure: Figure.King, color: Color.Light, square: BoardSquare.F1 },
  { figure: Figure.Rook, color: Color.Light, square: BoardSquare.E2 },
  { figure: Figure.Bishop, color: Color.Light, square: BoardSquare.E4 },
  { figure: Figure.King, color: Color.Dark, square: BoardSquare.C3 },
  { figure: Figure.Rook, color: Color.Dark, square: BoardSquare.C2 },
  { figure: Figure.Pawn, color: Color.Dark, square: BoardSquare.B3 },
];

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
