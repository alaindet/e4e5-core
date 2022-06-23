import { BoardCoordinate as B } from './board';
import { Color, Figure } from './piece';
import { BoardMap } from './state';

export type ViewSymbols = {
  pieces: {
    [color in Color]: {
      [figure in Figure]: string;
    };
  },
  squares: {
    [color in Color]: string;
  },
};

// export const SYMBOLS: ViewSymbols = {
//   pieces: {
//     [Color.Light]: {
//       [Figure.King]: '♔',
//       [Figure.Queen]: '♕',
//       [Figure.Bishop]: '♗',
//       [Figure.Knight]: '♘',
//       [Figure.Rook]: '♖',
//       [Figure.Pawn]: '♙',
//     },
//     [Color.Dark]: {
//       [Figure.King]: '♚',
//       [Figure.Queen]: '♛',
//       [Figure.Bishop]: '♝',
//       [Figure.Knight]: '♞',
//       [Figure.Rook]: '♜',
//       [Figure.Pawn]: '♟',
//     },
//   },
//   squares: {
//     [Color.Light]: '□',
//     [Color.Dark]: '■',
//   },
// };

export const SYMBOLS: ViewSymbols = {
  pieces: {
    [Color.Light]: {
      [Figure.King]: 'K',
      [Figure.Queen]: 'Q',
      [Figure.Bishop]: 'B',
      [Figure.Knight]: 'N',
      [Figure.Rook]: 'R',
      [Figure.Pawn]: 'P',
    },
    [Color.Dark]: {
      [Figure.King]: 'k',
      [Figure.Queen]: 'q',
      [Figure.Bishop]: 'b',
      [Figure.Knight]: 'n',
      [Figure.Rook]: 'r',
      [Figure.Pawn]: 'p',
    },
  },
  squares: {
    [Color.Light]: '□',
    [Color.Dark]: '■',
  },
};

export const viewBoard = (board: BoardMap): string => {
  return [
    [B.A8, B.B8, B.C8, B.D8, B.E8, B.F8, B.G8, B.H8],
    [B.A7, B.B7, B.C7, B.D7, B.E7, B.F7, B.G7, B.H7],
    [B.A6, B.B6, B.C6, B.D6, B.E6, B.F6, B.G6, B.H6],
    [B.A5, B.B5, B.C5, B.D5, B.E5, B.F5, B.G5, B.H5],
    [B.A4, B.B4, B.C4, B.D4, B.E4, B.F4, B.G4, B.H4],
    [B.A3, B.B3, B.C3, B.D3, B.E3, B.F3, B.G3, B.H3],
    [B.A2, B.B2, B.C2, B.D2, B.E2, B.F2, B.G2, B.H2],
    [B.A1, B.B1, B.C1, B.D1, B.E1, B.F1, B.G1, B.H1],
  ]
  .map(rank => {
    return rank.map(coord => {
      const piece = board[coord];
      return piece
        ? SYMBOLS.pieces[piece.color][piece.figure]
        : SYMBOLS.squares[Color.Light];
    }).join('');
  })
  .join('\n');
};
