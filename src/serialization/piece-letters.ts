import { Color } from '../common';
import { AbstractPiece, Figure } from '../piece';

export enum PieceLetter {
  K = 'K',
  Q = 'Q',
  R = 'R',
  B = 'B',
  N = 'N',
  P = 'P',
  k = 'k',
  q = 'q',
  r = 'r',
  b = 'b',
  n = 'n',
  p = 'p',
}

export function getPieceLetters(): {
  fromLetters: { [letter in PieceLetter]: AbstractPiece };
  toLetters: { [token: string]: PieceLetter };
} {
  return {
    fromLetters: {
      [PieceLetter.K]: { figure: Figure.King, color: Color.White },
      [PieceLetter.Q]: { figure: Figure.Queen, color: Color.White },
      [PieceLetter.R]: { figure: Figure.Rook, color: Color.White },
      [PieceLetter.B]: { figure: Figure.Bishop, color: Color.White },
      [PieceLetter.N]: { figure: Figure.Knight, color: Color.White },
      [PieceLetter.P]: { figure: Figure.Pawn, color: Color.White },
      [PieceLetter.k]: { figure: Figure.King, color: Color.Black },
      [PieceLetter.q]: { figure: Figure.Queen, color: Color.Black },
      [PieceLetter.r]: { figure: Figure.Rook, color: Color.Black },
      [PieceLetter.b]: { figure: Figure.Bishop, color: Color.Black },
      [PieceLetter.n]: { figure: Figure.Knight, color: Color.Black },
      [PieceLetter.p]: { figure: Figure.Pawn, color: Color.Black },
    },
    toLetters: {
      [`${Figure.King}${Color.White}`]: PieceLetter.K,
      [`${Figure.Queen}${Color.White}`]: PieceLetter.Q,
      [`${Figure.Rook}${Color.White}`]: PieceLetter.R,
      [`${Figure.Bishop}${Color.White}`]: PieceLetter.B,
      [`${Figure.Knight}${Color.White}`]: PieceLetter.N,
      [`${Figure.Pawn}${Color.White}`]: PieceLetter.P,
      [`${Figure.King}${Color.Black}`]: PieceLetter.k,
      [`${Figure.Queen}${Color.Black}`]: PieceLetter.q,
      [`${Figure.Rook}${Color.Black}`]: PieceLetter.r,
      [`${Figure.Bishop}${Color.Black}`]: PieceLetter.b,
      [`${Figure.Knight}${Color.Black}`]: PieceLetter.n,
      [`${Figure.Pawn}${Color.Black}`]: PieceLetter.p,
    },
  };
};
