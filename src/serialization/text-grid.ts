import { Figure, Color } from '../common';
import { AbstractPiece } from '../piece';
import { Board, getEmptyBoard } from '../board';
import { getPieceLetters } from './piece-letters';

/*
Example of a text grid for the initial position

|r|n|b|q|k|b|n|r|
|p|p|p|p|p|p|p|p|
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |
|P|P|P|P|P|P|P|P|
|R|N|B|Q|K|B|N|R|
*/
export function fromTextGrid(view: string): Board {

  const EMPTY_SQUARE = ' ';
  const PIECES = getPieceLetters().fromLetters;
  const board = getEmptyBoard();

  const squares = view
    .replace(/^\s*(\|.+?\|)\s*$/gm, '$1') // Remove excess whitespace
    .replace(/\|/gm, '') // Remove pipes |
    .split('');

  return squares.map(symbol => {
    if (symbol === EMPTY_SQUARE) {
      return null;
    }
    const piece: AbstractPiece = PIECES[symbol as PieceLetter];

    return { ...PIECES[symbol as PieceLetter], id: Date.now() };
  });
}
