import { getEmptyBinaryBoard, getEmptyBoard } from './board';
import { Color, Figure } from './common';
import { getAvailableSquares } from './piece-movements/available-squares';
import { chunk } from './utils';

const board = getEmptyBoard();
const bishop = { id: Date.now(), color: Color.White, figure: Figure.Bishop };
const index = 35; // D4
board[35] = bishop;
const binaryBoard = getAvailableSquares(board, index);

if (binaryBoard === null) {
  console.log('No squares available');
  process.exit();
}

chunk(binaryBoard, 8).forEach(line => {
  console.log(line.map(b => b ? ' X ' : ' - ').join(''));
});

export {};
