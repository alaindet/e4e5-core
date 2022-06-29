import { Color } from '../common';
import { AbstractPlacedPiece, Figure, PlacedPiece } from '../piece';
import { BoardSquare } from '../board';
import { createGameFromPosition } from '../state';
import { canMoveTo } from './can-move';

const testPosition: AbstractPlacedPiece[] = [
  { figure: Figure.King, color: Color.Dark, square: BoardSquare.C6 },
  { figure: Figure.Pawn, color: Color.Dark, square: BoardSquare.C5 },
  { figure: Figure.Pawn, color: Color.Dark, square: BoardSquare.D5 },
  { figure: Figure.Pawn, color: Color.Dark, square: BoardSquare.G7 },
  { figure: Figure.King, color: Color.Light, square: BoardSquare.E3 },
  { figure: Figure.Pawn, color: Color.Light, square: BoardSquare.E4 },
  { figure: Figure.Pawn, color: Color.Light, square: BoardSquare.D4 },
];

const testCases: [[BoardSquare, BoardSquare], boolean][] = [
  [[BoardSquare.D5, BoardSquare.D5], false],
  [[BoardSquare.D5, BoardSquare.D4], false],
  [[BoardSquare.D5, BoardSquare.C4], false],
  [[BoardSquare.D5, BoardSquare.E4], true],
  [[BoardSquare.C5, BoardSquare.C4], true],
  [[BoardSquare.G7, BoardSquare.G5], true],
];

describe('Validate pawn movements (no en-passant)', () => {
  it('should validate movement based on position', () => {
    let game = createGameFromPosition(testPosition, Color.Dark);
    testCases.forEach(([[fromSquare, toSquare], expected]) => {
      const pawn = { ...game.board[fromSquare], square: fromSquare } as PlacedPiece;
      const result = canMoveTo(pawn, toSquare, game.board);
      expect(result).toBe(expected);
    });
  });
});

export {}
