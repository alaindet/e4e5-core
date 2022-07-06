import { Color, getOppositeColor } from '../common';
import { getInitialPosition } from '../initial';
import { Move } from '../move';
import { GamePosition, getPieceFromToken, getPieceId, getPiecesChecklist, getPieceToken, PlacedPiece } from '../piece';
import { getGameDefaults } from './default-state';
import { forceMove } from './force-move';
import { GameState } from './types';
import { inCheck, IllegalGameStateError } from './check';
import { validateKingsCount, validateCheckState } from './validate';

export function createGame(): GameState {
  return createGameFromPosition(getInitialPosition());
}

export function createGameFromPosition(
  position: GamePosition,
  turn?: Color,
): GameState {
  const game = getGameDefaults();
  const piecesChecklist = getPiecesChecklist();
  game.turn = turn ?? Color.White;

  for (const abstractPiece of position) {
    const token = getPieceToken(abstractPiece);
    const id = getPieceId(abstractPiece);
    const count = piecesChecklist.get(token) ?? 0;
    piecesChecklist.set(token, count - 1);
    const { figure, color, square } = abstractPiece;
    const piece = { id, figure, color };
    game.board[square] = piece;
    game.pieces.push({ ...piece, square, startingSquare: square } as PlacedPiece);
  }

  for (let [token, count] of Array.from(piecesChecklist)) {
    if (count <= 0) continue;
    const piece = getPieceFromToken(token);
    const oppositeColor = getOppositeColor(piece.color);
    while (count--) {
      game.capturedPieces[oppositeColor].push(piece);
    }
  }

  // Validation
  validateKingsCount(game);
  validateCheckState(game);

  game.inCheck = inCheck(game, game.turn);

  return game;
};

export function updateGame(game: GameState, move: Move): GameState {

  const nextGame = forceMove(game, move);
  const willBeInCheck = inCheck(nextGame, game.turn);

  if (willBeInCheck) {
    throw new IllegalGameStateError('Illegal game state');
  }

  // TODO: Check for win conditions
  // TODO: Check for temporary checks while castling

  return nextGame;
};
