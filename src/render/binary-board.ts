import { BinaryBoard } from '../board';
import { chunk } from '../utils';

export function renderBinaryBoard(board: BinaryBoard | null): void {
  if (board === null) {
    console.log('\n\nNo binary board available\n\n');
    return;
  }

  const rendered = chunk(board, 8)
    .map(line => '|' + line.map(s => s ? '■' : '-').join('|') + '|')
    .join('\n');

  console.log(`\n\n${rendered}\n\n`);
}
