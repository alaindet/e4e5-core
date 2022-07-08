import { SquareLabelEnum } from './board';
import { getBishopAvailableSquares } from './piece-movements/bishop';
import { fromTextGrid } from './serialization';
import { renderBinaryBoard } from './render';

const board = fromTextGrid(`
  | | | | | | | | |
  | | | | |k| | | |
  | | | | | | | | |
  | | | | |b| | | |
  | | | | | | | | |
  | | | | |K| | | |
  | | | | | | | | |
  | | | | | | | | |
`);

const result = getBishopAvailableSquares(board, SquareLabelEnum.E5);

console.log(
  'available squares',
  result?.filter(s => s).length,
);

renderBinaryBoard(result);

export {};
