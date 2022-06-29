import { BoardState, getEmptyBoard, getToSquare } from './board';
import { Color, getOppositeColor } from './common';
import { getInitialPosition } from './initial';
import { createPawnDoubleStepMove, createPawnEnPassantMove, isPawnDoubleStepMove, isPawnEnPassantMove, Move, MoveType } from './move';
import { getCastlingSquares } from './castling';
import { PlacedPiece, Piece, GamePosition, getPiecesChecklist, getPieceToken, getPieceId, getPieceFromToken, getPawnSquares } from './piece';

export interface GameState {
  board: BoardState;
  turn: Color;
  inCheck: boolean;
  pieces: PlacedPiece[];
  lastMove: Move | null;
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

// TODO: Move this in another file
export class IllegalMoveError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, IllegalMoveError.prototype);
  }
}

export const createGame = (): GameState => {
  return createGameFromPosition(getInitialPosition(), Color.Light);
};

// TODO: Validate position?
export const createGameFromPosition = (
  position: GamePosition,
  turn: Color = Color.Light,
): GameState => {
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
    const { figure, color, square } = piece;
    board[square] = { id, figure, color };
    pieces.push({ ...board[square], square, startingSquare: square } as PlacedPiece);
  }

  for (const [token, count] of Array.from(piecesChecklist)) {
    if (count <= 0) continue;
    const piece = getPieceFromToken(token);
    const oppositeColor = getOppositeColor(piece.color);
    capturedPieces[oppositeColor].push(piece);
  }

  return {
    board,
    turn,
    lastMove: null,
    inCheck: false, // TODO: Check status,
    pieces,
    capturedPieces,
  };
};

export const updateGame = (game: GameState, _move: Move): GameState => {

  // Specify pawn move
  let move = _move;
  if (_move.type === MoveType.Basic) {
    if (isPawnEnPassantMove(game, _move)) {
      move = createPawnEnPassantMove(_move);
    } else if (isPawnDoubleStepMove(game, _move)) {
      move = createPawnDoubleStepMove(_move);
    }
  }

  // TODO: Check move legality
  // if (!isMoveLegal(game, move)) {
  //   throw new IllegalMoveError('The move is not legal');
  // }

  // Castling
  if (move.type === MoveType.Castling) {
    const squares = getCastlingSquares(game.turn, move.castling);
    game.board[squares.kingTo] = game.board[squares.kingFrom];
    game.board[squares.kingFrom] = null;
    game.board[squares.rookTo] = game.board[squares.rookFrom];
    game.board[squares.rookFrom] = null;
    return { ...game };
  }

  const fromPiece = game.board[move.from];

  // No piece to move!
  if (fromPiece === null) {
    throw new NoPieceFoundError(`No piece found on square ${move.from}`);
  }

  const toPiece = game.board[move.to];

  // It's not your piece!
  if (fromPiece.color !== game.turn) {
    throw new PieceOwnershipError('You cannot move pieces of your opponent');
  }

  // Capturing?
  if (toPiece !== null) {
    game.capturedPieces[game.turn].push(toPiece);
  }

  // En passant?
  if (move.type === MoveType.PawnEnPassant) {
    const ghostPawn = getToSquare(move.to, getPawnSquares(game.turn).ahead, -1);
    game.board[ghostPawn] = null;
  }

  // Promoting?
  if (move.type === MoveType.Promotion) {
    fromPiece.figure = move.promoteTo;
  }

  // Just move the piece
  game.board[move.from] = null;
  game.board[move.to] = fromPiece;

  // Update turn and last move
  game.turn = getOppositeColor(game.turn);
  game.lastMove = move;

  return { ...game };
};
