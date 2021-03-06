import { BoardDirection, BoardSquare, getToSquare } from '../board';
import { Color } from '../common';
import { createMove } from '../move';
import { Figure } from '../piece';
import { createGame, createGameFromPosition, updateGame } from '../state/state';
import { viewGame } from '../serialization/view';

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

// Promotion
export const example4 = () => {

  const position = [
    { figure: Figure.King, color: Color.White, square: BoardSquare.D5 },
    { figure: Figure.King, color: Color.Black, square: BoardSquare.D8 },
    { figure: Figure.Pawn, color: Color.White, square: BoardSquare.F7 },
    { figure: Figure.Pawn, color: Color.Black, square: BoardSquare.B2 },
  ];

  let game = createGameFromPosition(position, Color.White);
  game = updateGame(game, createMove('F7', 'F8', Figure.Queen));
  viewGame(game);
};

// Movement
export const example5 = () => {

  let pos = BoardSquare.E5;

  const movements: [BoardDirection, number][] = [
    [BoardDirection.Top, 1],
    [BoardDirection.Right, 1],
    [BoardDirection.Left, 2],
    [BoardDirection.Bottom, 2],
    [BoardDirection.DiagonalTopRight, 2],
    [BoardDirection.DiagonalTopLeft, 1],
    [BoardDirection.DiagonalBottomLeft, 1],
    [BoardDirection.DiagonalBottomRight, 1],
  ];

  movements.forEach(m => {
    const oldPos = pos;
    const newPos = getToSquare(pos, m[0], m[1]);
    console.log(`${oldPos} + ${m[1]} * ${m[0]} = ${newPos}`);
    pos = newPos;
  });
};

// En passant
export const example6 = () => {

  const position = [
    { figure: Figure.King, color: Color.White, square: BoardSquare.E1 },
    { figure: Figure.King, color: Color.Black, square: BoardSquare.E8 },
    { figure: Figure.Pawn, color: Color.White, square: BoardSquare.E2 },
    { figure: Figure.Pawn, color: Color.Black, square: BoardSquare.F4 },
  ];

  const movesFirst = Color.White;

  const moves = [
    createMove('E2', 'E4'),
    createMove('F4', 'E3'),
  ];

  try {
    let game = createGameFromPosition(position, movesFirst);
    viewGame(game);
    moves.forEach(move => {
      game = updateGame(game, move)
      viewGame(game);
    });
  } catch (error) {
    console.log('ERROR', error);
  }
};

export const example7 = () => {
  const position = [
    { figure: Figure.King, color: Color.White, square: BoardSquare.E1 },
    { figure: Figure.King, color: Color.Black, square: BoardSquare.E8 },
    { figure: Figure.Bishop, color: Color.Black, square: BoardSquare.A1 },
  ];

  let game = createGameFromPosition(position, Color.Black);
  viewGame(game);
};

export const runExamples = () => {
  // example1();
  // example2();
  // example3();
  // example4();
  // example5();
  // example6();
  example7();
};
