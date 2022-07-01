import { assertBoardState } from '../utils/assert-board-state';
import { createMove, Move } from '../move';
import { createGame, updateGame } from '../state';
import { BoardSquare } from '../board';
import { Figure } from '../piece';
import { Color } from '../common';

describe('Castling', () => {

  it ('should perform king-side castling for light', () => {

    const moves: Move[] = [
      createMove('E2', 'E4'), createMove('E7', 'E5'),
      createMove('G1', 'F3'), createMove('G8', 'F6'),
      createMove('F1', 'B5'), createMove('B8', 'C6'),
      createMove('O-O'),
    ];

    let game = createGame();

    moves.forEach(move => {
      game = updateGame(game, move);
    });

    // Sample some squares, avoid testing all
    assertBoardState(game.board, [
      [BoardSquare.G1, { figure: Figure.King, color: Color.White }],
      [BoardSquare.F1, { figure: Figure.Rook, color: Color.White }],
    ]);
  });
});

export {};
