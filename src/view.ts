import { BoardSquare as B, BoardSquare, BoardState, getSquareColor } from './board';
import { Color } from './common';
import { Figure } from './piece';
import { GameState } from './state';
import { ConsoleColorBackground, ConsoleColorText, logWithColor } from './view-console';

export type ViewSymbols = {
  pieces: {
    [color in Color]: {
      [figure in Figure]: string;
    };
  },
  textColor: {
    [color in Color]: ConsoleColorText;
  },
  backgroundColor: {
    [color in Color]: ConsoleColorBackground;
  },
};

export const VIEW_SYMBOLS: ViewSymbols = {
  pieces: {
    [Color.Light]: {
      [Figure.King]: 'K ',
      [Figure.Queen]: 'Q ',
      [Figure.Bishop]: 'B ',
      [Figure.Knight]: 'N ',
      [Figure.Rook]: 'R ',
      [Figure.Pawn]: 'P ',
    },
    [Color.Dark]: {
      [Figure.King]: 'K ',
      [Figure.Queen]: 'Q ',
      [Figure.Bishop]: 'B ',
      [Figure.Knight]: 'N ',
      [Figure.Rook]: 'R ',
      [Figure.Pawn]: 'P ',
    },
  },
  textColor: {
    [Color.Light]: ConsoleColorText.Red,
    [Color.Dark]: ConsoleColorText.Green,
  },
  backgroundColor: {
    [Color.Light]: ConsoleColorBackground.White,
    [Color.Dark]: ConsoleColorBackground.Black,
  },
};

export const viewGame = (game: GameState): void => {
  const board = renderBoard(game.board);
  console.log(board);
};

const EMPTY_SQUARE = '  ';

const renderBoard = (board: BoardState): string => {
  return [
    ['_8', B.A8, B.B8, B.C8, B.D8, B.E8, B.F8, B.G8, B.H8],
    ['_7', B.A7, B.B7, B.C7, B.D7, B.E7, B.F7, B.G7, B.H7],
    ['_6', B.A6, B.B6, B.C6, B.D6, B.E6, B.F6, B.G6, B.H6],
    ['_5', B.A5, B.B5, B.C5, B.D5, B.E5, B.F5, B.G5, B.H5],
    ['_4', B.A4, B.B4, B.C4, B.D4, B.E4, B.F4, B.G4, B.H4],
    ['_3', B.A3, B.B3, B.C3, B.D3, B.E3, B.F3, B.G3, B.H3],
    ['_2', B.A2, B.B2, B.C2, B.D2, B.E2, B.F2, B.G2, B.H2],
    ['_1', B.A1, B.B1, B.C1, B.D1, B.E1, B.F1, B.G1, B.H1],
    ['_', '_A', '_B', '_C', '_D', '_E', '_F', '_G', '_H'],
  ]
  .map(rank => {
    return rank.map(squareOrRef => {

      // It is a ref
      if (squareOrRef[0] === '_') {
        if (squareOrRef.length === 1) {
          return '  ';
        }
        return logWithColor(`${squareOrRef[1]} `, ConsoleColorText.Yellow);
      }

      const square = squareOrRef as BoardSquare;
      const squareColor = getSquareColor(square);
      const piece = board[square];
      let renderContent = EMPTY_SQUARE;
      const renderBgColor = VIEW_SYMBOLS.backgroundColor[squareColor];
      let renderTxtColor = null;

      if (piece) {
        renderContent = VIEW_SYMBOLS.pieces[piece.color][piece.figure];
        renderTxtColor = VIEW_SYMBOLS.textColor[piece.color];
      }

      return logWithColor(renderContent, renderTxtColor, renderBgColor);
    }).join('');
  })
  .join('\n');
};
