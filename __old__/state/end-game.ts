import { Color, DRAW, GameResult, getOppositeColor } from '../common';
import { Figure, getPieceToken, getPieceTokens, Piece, AbstractPieceToken} from '../piece';
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

  if (isDeadPosition(game)) {
    return true;
  }

  // TODO: Check stalemate - Not in check, no legal move
  // TODO: Is dead position
  // TODO: Proposed draw by condition: same position after 3 moves, fifty-move rule
  // TODO: fivefold repetition rule?
  // TODO: seventy-five-move-rule (mandatory)
  return false;
}

export function isDeadPosition(game: GameState): boolean {
  // TODO: Canonical positions - KvsK, KvsKB, KvsKN, KBvsKB same color
  // TODO: Impossible checkmate?

  const pieces: { [piece: string]: Piece[] } = {};

  game.pieces.forEach(piece => {
    const token = getPieceToken(piece);
    if (!pieces[token]) {
      pieces[token] = [];
    }
    pieces[token].push(piece);
  });

  const tokens = Object.keys(pieces);

  if (tokens.length > 4) {
    return false;
  }

  if (tokens.length <= 2) {
    return true;
  }

  const tokensMap = getPieceTokens();
  const WHITE_KNIGHT = tokensMap.get([Figure.Knight, Color.White]) as AbstractPieceToken;
  const BLACK_KNIGHT = tokensMap.get([Figure.Knight, Color.Black]) as AbstractPieceToken;
  const WHITE_BISHOP = tokensMap.get([Figure.Bishop, Color.White]) as AbstractPieceToken;
  const BLACK_BISHOP = tokensMap.get([Figure.Bishop, Color.Black]) as AbstractPieceToken;

  if (tokens.length === 3) {
    for (const token of [WHITE_KNIGHT, BLACK_KNIGHT, WHITE_BISHOP, BLACK_BISHOP]) {
      if (token in tokens) {
        return true;
      }
    }
  }

  // TODO: Check for two bishops with same square

  return false;
}
