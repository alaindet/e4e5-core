import { Color, DRAW, GameResult, getOppositeColor } from '../common';
import { GameState } from './types';

// https://en.wikipedia.org/wiki/Rules_of_chess
export function checkEndGame(game: GameState): GameResult | null {

  if (isCheckmated(game)) {
    return getOppositeColor(game.turn);
  }

  if (isDraw(game)) {
    return DRAW;
  }

  return null;
}

export function isCheckmated(game: GameState, color?: Color): boolean {
  const attackedColor = color ?? game.turn;

  // TODO: Check each king move
  // TODO: Check if you can take the attacking piece
  // TODO: Check if you can block

  return false;
}

export function isDraw(game: GameState): boolean {
  // TODO: Check stalemate - Not in check, no legal move
  // TODO: Is dead position
  // TODO: Agreement
  // TODO: Legal unilateral draw by condition: same position after 3 moves, fifty-move rule
  // TODO: fivefold repetition rule?
  // TODO: seventy-five-move-rule (mandatory)
  return false;
}

export function isDeadPosition(game: GameState): boolean {
  // TODO: Canonical positions - KvsK, KvsKB, KvsKN, KBvsKB same color
  // TODO: Impossible checkmate?
  return false;
}
