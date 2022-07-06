import { Figure } from '../piece';
import { Color, getOppositeColor } from '../common';
import { inCheck, IllegalGameStateError } from './check';
import { GameState } from './types';

export function validateKingsCount(game: GameState): void {
  let whiteKings = 0;
  let blackKings = 0;

  for (const piece of game.pieces) {
    if (piece.figure !== Figure.King) {
      continue;
    }

    switch (piece.color) {
      case Color.White:
        whiteKings++;
        break;
      case Color.Black:
        blackKings++;
        break;
    }

    if (whiteKings !== 1 || blackKings !== 1) {
      throw new IllegalGameStateError('There must be exactly 1 white king and 1 black king');
    }
  }
}

export function validateCheckState(game: GameState): void {
  if (inCheck(game, getOppositeColor(game.turn))) {
    throw new IllegalGameStateError('Illegal position');
  }
}
