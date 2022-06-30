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
    K: { figure: Figure.King, color: Color.Light },
    Q: { figure: Figure.Queen, color: Color.Light },
    R: { figure: Figure.Rook, color: Color.Light },
    B: { figure: Figure.Bishop, color: Color.Light },
    N: { figure: Figure.Knight, color: Color.Light },
    P: { figure: Figure.Pawn, color: Color.Light },
    k: { figure: Figure.King, color: Color.Dark },
    q: { figure: Figure.Queen, color: Color.Dark },
    r: { figure: Figure.Rook, color: Color.Dark },
    b: { figure: Figure.Bishop, color: Color.Dark },
    n: { figure: Figure.Knight, color: Color.Dark },
    p: { figure: Figure.Pawn, color: Color.Dark },
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
