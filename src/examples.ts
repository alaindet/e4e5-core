import { createMove } from './move';
import { createGame, updateGame } from './state';
import { viewGame } from './view';

// Initial board
export const example1 = () => {
  let game = createGame();
  viewGame(game);
};

// Basic moves
export const example2 = () => {
  let game = createGame();
  game = updateGame(game, createMove('E2', 'E4'));
  game = updateGame(game, createMove('E7', 'E5'));
  viewGame(game);
};

// Castling
export const example3 = () => {
  let game = createGame();
  game = updateGame(game, createMove('E2', 'E4'));
  game = updateGame(game, createMove('E7', 'E5'));
  game = updateGame(game, createMove('G1', 'F3'));
  game = updateGame(game, createMove('G8', 'F6'));
  game = updateGame(game, createMove('F1', 'B5'));
  game = updateGame(game, createMove('B8', 'C6'));
  game = updateGame(game, createMove('O-O'));
  viewGame(game);
};
