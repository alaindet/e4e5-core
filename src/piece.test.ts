import { Color } from './common';
import { AbstractPiece, AbstractPieceToken, Figure, getPieceFromToken, getPieceToken } from './piece';

describe('Piece', () => {

  const testCases: [AbstractPiece, AbstractPieceToken][] = [
    [{ figure: Figure.King, color: Color.Light }, `${Figure.King}${Color.Light}`],
    [{ figure: Figure.Queen, color: Color.Dark }, `${Figure.Queen}${Color.Dark}`],
    [{ figure: Figure.Bishop, color: Color.Light }, `${Figure.Bishop}${Color.Light}`],
    [{ figure: Figure.Rook, color: Color.Dark }, `${Figure.Rook}${Color.Dark}`],
  ];

  it('Get token from piece', () => {
    testCases.forEach(testCase => {
      const [input, expected] = testCase;
      const result = getPieceToken(input);
      expect(result).toBe(expected);
    });
  });

  it('Get piece from token', () => {
    testCases.forEach(testCase => {
      const [expected, input] = testCase;
      const result = getPieceFromToken(input);
      expect(result.figure).toBe(expected.figure);
      expect(result.color).toBe(expected.color);
    });
  });
});
