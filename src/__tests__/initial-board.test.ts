import { BoardSquare } from '../board';
import { Color } from '../common';
import { createMove } from '../move';
import { Figure } from '../piece';
import { createGame, updateGame } from '../state';
import { assertBoardState } from '../utils/assert-board-state';

describe('Game basics', () => {

  it ('should create a game with default position', () => {
    let game = createGame();
    expect(game.pieces.length).toBe(32);
    expect(game.capturedPieces[Color.White].length).toBe(0);
    expect(game.capturedPieces[Color.Black].length).toBe(0);
    expect(game.inCheck).toBe(false);
    expect(game.lastMove).toBeNull();
    expect(game.turn).toBe(Color.White);

    // Sample some squares, avoid testing all
    assertBoardState(game.board, [
      [BoardSquare.E1, { figure: Figure.King, color: Color.White }],
      [BoardSquare.E8, { figure: Figure.King, color: Color.Black }],
      [BoardSquare.C3, null],
      [BoardSquare.A1, { figure: Figure.Rook, color: Color.White }],
      [BoardSquare.H1, { figure: Figure.Rook, color: Color.White }],
      [BoardSquare.A8, { figure: Figure.Rook, color: Color.Black }],
      [BoardSquare.H8, { figure: Figure.Rook, color: Color.Black }],
      [BoardSquare.G6, null],
    ]);
  });

  it('should accept basic moves', () => {
    let game = createGame();
    game = updateGame(game, createMove('E2', 'E4'));
    game = updateGame(game, createMove('E7', 'E5'));

    assertBoardState(game.board, [
      [BoardSquare.E2, null],
      [BoardSquare.E4, { figure: Figure.Pawn, color: Color.White }],
      [BoardSquare.E7, null],
      [BoardSquare.E5, { figure: Figure.Pawn, color: Color.Black }],
    ]);
  });
});

export {};
