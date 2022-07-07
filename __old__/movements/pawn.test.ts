import { Color } from '../common';
import { GamePosition, PlacedPiece } from '../piece';
import { BoardSquare } from '../board';
import { createGameFromPosition } from '../state';
import { fromTextGrid } from '../serialization';
import { canMoveTo } from './can-move';

const testPosition: GamePosition = fromTextGrid(`
  | | | | | | | | |
  | | | | | | |p| |
  | | |k| | | | | |
  | | |p|p| | | | |
  | | | |P|P| | | |
  | | | | |K| | | |
  | | | | | | | | |
  | | | | | | | | |
`);

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
    let game = createGameFromPosition(testPosition, Color.Black);
    testCases.forEach(([[fromSquare, toSquare], expected]) => {
      const pawn = { ...game.board[fromSquare], square: fromSquare } as PlacedPiece;
      const result = canMoveTo(pawn, toSquare, game.board);
      expect(result).toBe(expected);
    });
  });
});

export {}
