import { getPieceId } from '../piece';
import { Board } from '../board';
import { getPieceLetters, PieceLetter } from './piece-letters';

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
export function fromTextGrid(textGrid: string): Board {

  const pieces = getPieceLetters().fromLetters;

  return textGrid
    .replace(/^\s*(\|.+?\|)\s*$/gm, '$1') // Remove excess whitespace
    .replace(/[\|\n]/gm, '') // Remove pipes and newlines
    .split('')
    .map(symbol => {
      if (symbol === ' ') return null;
      return { ...pieces[symbol as PieceLetter], id: getPieceId() };
    });
}
