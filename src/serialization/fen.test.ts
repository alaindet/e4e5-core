import { Color } from '../common';
import { Castling } from '../castling';
import { createGame, GameState } from '../state';
import { fromFEN } from './fen';

const serializeBoardFromGame = (game: GameState): string[] => {
  const board = game.board as any;
  return Object.keys(board).reduce((tot: string[], square: string): string[] => {
    if (board[square] !== null) {
      const p = board[square];
      tot.push(`${p.square}${p.color}${p.figure}`);
    }
    return tot;
  }, []);
};

describe('Forsyth–Edwards Notation serialization', () => {
  it('should deserialize starting position from FEN', () => {
    const input = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    const game = fromFEN(input);
    const result = serializeBoardFromGame(game).sort();
    const expected = serializeBoardFromGame(createGame()).sort();
    expect(result).toEqual(expected);
    expect(game.castlingAvailability[Color.Black][Castling.QueenSide]).toBe(true);
  });
});

export {};
