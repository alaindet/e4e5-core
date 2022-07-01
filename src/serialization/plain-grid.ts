import { getSquareFromCoordinates, BoardCoordinate } from '../board';
import { Color } from '../common';
import { GamePosition, AbstractPiece, Figure } from '../piece';

/*
Example of a plain grid

|r|n|b|q|k|b|n|r|
|p|p|p|p|p|p|p|p|
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |
|P|P|P|P|P|P|P|P|
|R|N|B|Q|K|B|N|R|
*/
export const fromPlainGrid = (view: string): GamePosition => {

  const EMPTY_SQUARE = ' ';
  const PIECES: { [s: string]: AbstractPiece } = {
    K: { figure: Figure.King, color: Color.White },
    Q: { figure: Figure.Queen, color: Color.White },
    R: { figure: Figure.Rook, color: Color.White },
    B: { figure: Figure.Bishop, color: Color.White },
    N: { figure: Figure.Knight, color: Color.White },
    P: { figure: Figure.Pawn, color: Color.White },
    k: { figure: Figure.King, color: Color.Black },
    q: { figure: Figure.Queen, color: Color.Black },
    r: { figure: Figure.Rook, color: Color.Black },
    b: { figure: Figure.Bishop, color: Color.Black },
    n: { figure: Figure.Knight, color: Color.Black },
    p: { figure: Figure.Pawn, color: Color.Black },
  };

  const pos: GamePosition = [];

  const lines = view
    .replace(/^\s*(\|.+?\|)\s*$/gm, '$1') // Remove excess whitespace
    .replace(/\|/gm, '') // Remove pipes |
    .split('\n');

  lines.forEach((line, i) => {
    for (let j = 0, len = line.length; j < len; j++) {
      const pieceSymbol = line[j];
      const square = getSquareFromCoordinates(
        j + 1 as BoardCoordinate,
        8 - i as BoardCoordinate,
      );
      if (pieceSymbol !== EMPTY_SQUARE) {
        pos.push({ ...PIECES[pieceSymbol], square });
      }
    }
  });

  return pos;
};
