import { BoardState, Castling, EMPTY_SQUARE, getEmptyBoard, BoardSquare } from './board';
import { Color, getOppositeColor } from './common';
import { INITIAL_POSITION } from './initial';
import { Move, CastlingMove, MoveType } from './move';
import { getCastlingSquares } from './move-castling';
import { PlacedPiece, Piece, GamePosition, getPiecesChecklist, AbstractPieceToken, getPieceToken, getPieceId, getPieceFromToken } from './piece';

export interface GameState {
  board: BoardState;
  turn: Color;
  pieces: PlacedPiece[];
  capturedPieces: {
    [color in Color]: Piece[];
  };
}

// Thanks to https://bobbyhadz.com/blog/typescript-extend-error-class
export class NoPieceFoundError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NoPieceFoundError.prototype);
  }
}

export class PieceOwnershipError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, PieceOwnershipError.prototype);
  }
}

export const createGame = (): GameState => {
  return createGameFromPosition(INITIAL_POSITION, Color.Light);
};

export const createGameFromPosition = (position: GamePosition, turn: Color): GameState => {
  const board = getEmptyBoard();
  const pieces: PlacedPiece[] = [];
  const capturedPieces: GameState['capturedPieces'] = {
    [Color.Dark]: [],
    [Color.Light]: [],
  };
  const piecesChecklist = getPiecesChecklist();

  for (const piece of position) {
    const token = getPieceToken(piece);
    const id = getPieceId(piece);
    const count = piecesChecklist.get(token) ?? 0;
    piecesChecklist.set(token, count - 1);
    const boardPiece = { id, figure: piece.figure, color: piece.color };
    board[piece.square] = boardPiece;
    pieces.push({ ...boardPiece, square: piece.square });
  }

  for (const [token, count] of Array.from(piecesChecklist)) {
    if (count <= 0) continue;
    const piece = getPieceFromToken(token);
    const oppositeColor = getOppositeColor(piece.color);
    capturedPieces[oppositeColor].push(piece);
  }

  return { board, turn, pieces, capturedPieces };
};

export const updateGame = (game: GameState, move: Move): GameState => {

  if (move.type === MoveType.Castling) {
    const squares = getCastlingSquares(move.castling, game.turn);
    game.board[squares.kingTo] = game.board[squares.kingFrom];
    game.board[squares.kingFrom] = null;
    game.board[squares.rookTo] = game.board[squares.rookFrom];
    game.board[squares.rookFrom] = null;
    return { ...game };
  }

  const fromPiece = game.board[move.from];

  // No piece to move!
  if (fromPiece === EMPTY_SQUARE) {
    throw new NoPieceFoundError(`No piece found on square ${move.from}`);
  }

  const toPiece = game.board[move.to];

  // TODO: Check king status legality
  // TODO: Check figure movement legality

  // It's not your piece!
  if (fromPiece.color !== game.turn) {
    throw new PieceOwnershipError('You cannot move pieces of your opponent');
  }

  // Capturing?
  if (toPiece !== EMPTY_SQUARE) {
    game.capturedPieces[game.turn].push(toPiece);
  }

  // TODO: pawn promote
  // TODO: en passant
  // TODO: castling

  // Just move the piece
  game.board[move.from] = EMPTY_SQUARE;
  game.board[move.to] = fromPiece;

  // Update turn
  game.turn = getOppositeColor(game.turn);

  return { ...game };
};
