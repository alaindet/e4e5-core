import { Color } from './common';
import { AbstractPiece, AbstractPieceToken, Figure, getPieceFromToken, getPieceToken } from './piece';

describe('Piece', () => {

  const testCases: [AbstractPiece, AbstractPieceToken][] = [
    [{ figure: Figure.King, color: Color.White }, `${Figure.King}${Color.White}`],
    [{ figure: Figure.Queen, color: Color.Black }, `${Figure.Queen}${Color.Black}`],
    [{ figure: Figure.Bishop, color: Color.White }, `${Figure.Bishop}${Color.White}`],
    [{ figure: Figure.Rook, color: Color.Black }, `${Figure.Rook}${Color.Black}`],
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
