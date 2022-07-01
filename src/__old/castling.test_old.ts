import { assertBoardState } from '../utils/assert-board-state';
import { createMove, Move } from '../move';
import { createGame, createGameFromPosition, updateGame } from '../state/state';
import { BoardSquare } from '../board';
import { Figure } from '../piece';
import { Color } from '../common';
import { fromPlainGrid } from '../serialization/plain-grid';

describe('Castling', () => {

  it('should perform king-side castling for light', () => {

    const moves: Move[] = [
      createMove('E2', 'E4'), createMove('E7', 'E5'),
      createMove('G1', 'F3'), createMove('G8', 'F6'),
      createMove('F1', 'B5'), createMove('B8', 'C6'),
      createMove('O-O'),
    ];

    let game = createGame();
    moves.forEach(move => game = updateGame(game, move));

    // Sample some squares, avoid testing all
    assertBoardState(game.board, [
      [BoardSquare.G1, { figure: Figure.King, color: Color.White }],
      [BoardSquare.F1, { figure: Figure.Rook, color: Color.White }],
    ]);
  });

  it('should perform queen-side castling for dark', () => {

    const position = fromPlainGrid(`
      |r| | | |k| | | |
      | | | | | | | | |
      | | | | | | | | |
      | | | | | | | | |
      | | | | | | | | |
      | | | | | |K| | |
      | | | | | | | | |
      | | | | | | | | |
    `);

    const moves: Move[] = [
      createMove('F3', 'G4'), createMove('O-O-O'),
    ];

    let game = createGameFromPosition(position, Color.White);
    moves.forEach(move => game = updateGame(game, move));

    assertBoardState(game.board, [
      [BoardSquare.C8, { figure: Figure.King, color: Color.Black }],
      [BoardSquare.D8, { figure: Figure.Rook, color: Color.Black }],
    ]);
  });

  // TODO
  // it('should prevent user from illegal castling', () => {
  //   const position = [
  //     { figure: Figure.King, color: Color.Black, square: BoardSquare.E8 },
  //     { figure: Figure.Rook, color: Color.Black, square: BoardSquare.A8 },
  //     { figure: Figure.King, color: Color.White, square: BoardSquare.F3 },
  //     { figure: Figure.Rook, color: Color.White, square: BoardSquare.C5 },
  //   ];

  //   let game = createGameFromPosition(position, Color.White);
  //   game = updateGame(game, createMove('F3', 'G4'));
  //   expect(updateGame(game, createMove('O-O-O'))).toThrow(IllegalMoveError);
  // });
});

export {};
