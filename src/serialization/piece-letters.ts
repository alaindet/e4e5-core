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

export const getPieceLetters = (): {
  fromLetters: { [letter in PieceLetter]: AbstractPiece };
  // toLetters: { [token in AbstractPieceToken]: PieceLetter };
  toLetters: { [token: string]: PieceLetter };
} => {
  return {
    fromLetters: {
      [PieceLetter.K]: { figure: Figure.King, color: Color.Light },
      [PieceLetter.Q]: { figure: Figure.Queen, color: Color.Light },
      [PieceLetter.R]: { figure: Figure.Rook, color: Color.Light },
      [PieceLetter.B]: { figure: Figure.Bishop, color: Color.Light },
      [PieceLetter.N]: { figure: Figure.Knight, color: Color.Light },
      [PieceLetter.P]: { figure: Figure.Pawn, color: Color.Light },
      [PieceLetter.k]: { figure: Figure.King, color: Color.Dark },
      [PieceLetter.q]: { figure: Figure.Queen, color: Color.Dark },
      [PieceLetter.r]: { figure: Figure.Rook, color: Color.Dark },
      [PieceLetter.b]: { figure: Figure.Bishop, color: Color.Dark },
      [PieceLetter.n]: { figure: Figure.Knight, color: Color.Dark },
      [PieceLetter.p]: { figure: Figure.Pawn, color: Color.Dark },
    },
    toLetters: {
      [`${Figure.King}${Color.Light}`]: PieceLetter.K,
      [`${Figure.Queen}${Color.Light}`]: PieceLetter.Q,
      [`${Figure.Rook}${Color.Light}`]: PieceLetter.R,
      [`${Figure.Bishop}${Color.Light}`]: PieceLetter.B,
      [`${Figure.Knight}${Color.Light}`]: PieceLetter.N,
      [`${Figure.Pawn}${Color.Light}`]: PieceLetter.P,
      [`${Figure.King}${Color.Dark}`]: PieceLetter.k,
      [`${Figure.Queen}${Color.Dark}`]: PieceLetter.q,
      [`${Figure.Rook}${Color.Dark}`]: PieceLetter.r,
      [`${Figure.Bishop}${Color.Dark}`]: PieceLetter.b,
      [`${Figure.Knight}${Color.Dark}`]: PieceLetter.n,
      [`${Figure.Pawn}${Color.Dark}`]: PieceLetter.p,
    },
  };
};
