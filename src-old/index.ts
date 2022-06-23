import { BoardCoordinate } from './board';
import { INITIAL_BOARD_MAP, INITIAL_GAME } from './initial';
import { move } from './move';
import { viewBoard, viewGame } from './view';

let game = INITIAL_GAME;

board = move(board, { from: BoardCoordinate.E2, to: BoardCoordinate.E4 });
board = move(board, { from: BoardCoordinate.E7, to: BoardCoordinate.E5 });
board = move(board, { from: BoardCoordinate.B1, to: BoardCoordinate.C3 });
board = move(board, { from: BoardCoordinate.G8, to: BoardCoordinate.F6 });

// let board = getBoardMap();

console.log(viewGame(board));
