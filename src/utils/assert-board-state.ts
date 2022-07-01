import { BoardSquare, BoardState } from '../board';
import { AbstractPiece } from '../piece';

export const assertBoardState = (
  board: BoardState,
  testCases: [BoardSquare, AbstractPiece | null][],
) => {
  testCases.forEach(testCase => {
    const [input, expected] = testCase;
    if (expected === null) {
      expect(board[input]).toBeNull();
    } else {
      expect(board[input]?.figure).toBe(expected.figure);
      expect(board[input]?.color).toBe(expected.color);
    }
  });
};
