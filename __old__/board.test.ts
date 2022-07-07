import { Color } from './common';
import { BoardCoordinates, BoardDirection, BoardSquare, getEmptyBoard, getSquareColor, getSquareCoordinates, getSquaresDiff, getSquaresDistance, getToSquare, NoSquareFoundError } from './board';

describe('Chessboard utils', () => {

  it('should provide an empty board', () => {
    const board = getEmptyBoard();
    const squares = Object.keys(board) as BoardSquare[];
    const emptySquares = squares.filter(s => board[s] === null);
    expect(emptySquares.length).toBe(squares.length);
  });

  it('should extract coordinates from square name', () => {
    const testCases: [BoardSquare, BoardCoordinates][] = [
      [BoardSquare.A1, [1, 1]],
      [BoardSquare.A8, [1, 8]],
      [BoardSquare.H1, [8, 1]],
      [BoardSquare.H8, [8, 8]],
      [BoardSquare.E4, [5, 4]],
      [BoardSquare.C3, [3, 3]],
      [BoardSquare.G5, [7, 5]],
    ];

    testCases.forEach(([input, expected]) => {
      const [file, rank] = getSquareCoordinates(input);
      const [expectedFile, expectedRank] = expected;
      expect(file).toBe(expectedFile);
      expect(rank).toBe(expectedRank);
    });
  });

  it('should extract square color', () => {
    const testCases: [BoardSquare, Color][] = [
      [BoardSquare.A1, Color.Black],
      [BoardSquare.A8, Color.White],
      [BoardSquare.H1, Color.White],
      [BoardSquare.H8, Color.Black],
      [BoardSquare.E4, Color.White],
      [BoardSquare.C3, Color.Black],
      [BoardSquare.G5, Color.Black],
    ];

    testCases.forEach(([input, expected]) => {
      const color = getSquareColor(input);
      expect(color).toBe(expected);
    });
  });

  it('should move to a square by given direction', () => {
    const testCases: {
      input: [BoardSquare, BoardDirection, number];
      expected: BoardSquare | null;
    }[] = [
      {
        input: [BoardSquare.A1, BoardDirection.Top, 1],
        expected: BoardSquare.A2,
      },
      {
        input: [BoardSquare.A1, BoardDirection.DiagonalTopLeft, 1],
        expected: null,
      },
      {
        input: [BoardSquare.A1, BoardDirection.DiagonalTopRight, 2],
        expected: BoardSquare.C3,
      },
      {
        input: [BoardSquare.A1, BoardDirection.Right, 3],
        expected: BoardSquare.D1,
      },
      {
        input: [BoardSquare.A1, BoardDirection.DiagonalBottomRight, 42],
        expected: null,
      },
      {
        input: [BoardSquare.H8, BoardDirection.DiagonalBottomLeft, 7],
        expected: BoardSquare.A1,
      },
      {
        input: [BoardSquare.H8, BoardDirection.DiagonalTopRight, -7],
        expected: BoardSquare.A1,
      },
      {
        input: [BoardSquare.F4, BoardDirection.Left, 3],
        expected: BoardSquare.C4,
      },
    ];

    testCases.forEach(({ input, expected }) => {
      if (expected === null) {
        expect(() => getToSquare(...input)).toThrow(NoSquareFoundError);
      } else {
        expect(getToSquare(...input)).toBe(expected);
      }
    });
  });

  it('should calculate distance between squares', () => {
    const testCases: [[BoardSquare, BoardSquare], number][] = [
      [[BoardSquare.A1, BoardSquare.A1], 0],
      [[BoardSquare.A1, BoardSquare.C6], 5],
      [[BoardSquare.A1, BoardSquare.H8], 7],
      [[BoardSquare.G3, BoardSquare.F5], 2],
    ];

    testCases.forEach(([[fromSquare, toSquare], expected]) => {
      const result = getSquaresDistance(fromSquare, toSquare);
      expect(result).toBe(expected);
    });
  });

  it('should calculate the difference in coordinates between two squares', () => {
    const testCases: [[BoardSquare, BoardSquare], [number, number]][] = [
      [[BoardSquare.A1, BoardSquare.H8], [7, 7]],
      [[BoardSquare.H8, BoardSquare.A1], [-7, -7]],
      [[BoardSquare.E3, BoardSquare.G4], [2, 1]],
      [[BoardSquare.E3, BoardSquare.C4], [-2, 1]],
      [[BoardSquare.E3, BoardSquare.C2], [-2, -1]],
      [[BoardSquare.E7, BoardSquare.H5], [3, -2]],
    ];

    testCases.forEach(([[fromSquare, toSquare], expected]) => {
      const [fileDiff, rankDiff] = getSquaresDiff(fromSquare, toSquare);
      const [expectedFileDiff, expectedRankDiff] = expected;
      expect(fileDiff).toBe(expectedFileDiff);
      expect(rankDiff).toBe(expectedRankDiff);
    });
  });
});

export {};
