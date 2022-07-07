import { Color, DRAW, getOppositeColor } from '../common';
import { GameState } from './types';

export function draw(game: GameState): GameState {
  game.result = DRAW;
  return game;
}

export function resign(game: GameState, color: Color): GameState {
  game.result = getOppositeColor(color);
  return game;
}
