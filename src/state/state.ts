import { BoardSquare, BoardState, getEmptyBoard, getToSquare } from '../board';
import { Color, getOppositeColor } from '../common';
import { getInitialPosition } from '../initial';
import { Move, MoveType } from '../move';
import { Castling, getCastlingSquares, isCastlingAvailable } from '../castling';
import { PlacedPiece, Piece, GamePosition, getPiecesChecklist, getPieceToken, getPieceId, getPieceFromToken, getPawnDirections } from '../piece';
import { NoPieceFoundError, PieceOwnershipError } from 'state/errors';
import { GameState } from './types';
import { getGameDefaults } from './default-state';

export const createGame = (): GameState => {
  return createGameFromPosition(getInitialPosition());
};

export const createGameFromPosition = (
  position: GamePosition,
  turn?: Color,
): GameState => {
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

  for (const [token, count] of Array.from(piecesChecklist)) {
    if (count <= 0) continue;
    const piece = getPieceFromToken(token);
    const oppositeColor = getOppositeColor(piece.color);
    game.capturedPieces[oppositeColor].push(piece);
  }

  // TODO: Validate check status

  return game;
};

// This does not account for checking
export const updateCastlingAvailability = (game: GameState): GameState => {

  const castling: [Color, Castling][] = [
    [Color.White, Castling.KingSide],
    [Color.White, Castling.QueenSide],
    [Color.Black, Castling.KingSide],
    [Color.Black, Castling.QueenSide],
  ];

  castling.forEach(([color, side]) => {
    const isAvailable = isCastlingAvailable(game, color, side);
    game.castlingAvailability[color][side] = isAvailable;
  });

  return game;
};

export const updateGame = (game: GameState, move: Move): GameState => {

  // TODO

  return game;

  // Specify pawn move
  // let move = _move;
  // if (_move.type === MoveType.Basic) {
  //   if (isPawnEnPassantMove(game, _move)) {
  //     move = createPawnEnPassantMove(_move);
  //   } else if (isPawnDoubleStepMove(game, _move)) {
  //     move = createPawnDoubleStepMove(_move);
  //   }
  // }

  // TODO: Check move legality
  // if (!isMoveLegal(game, move)) {
  //   throw new IllegalMoveError('The move is not legal');
  // }

  // Castling
  // if (move.type === MoveType.Castling) {
  //   const squares = getCastlingSquares(game.turn, move.castling);
  //   game.board[squares.kingTo] = game.board[squares.kingFrom];
  //   game.board[squares.kingFrom] = null;
  //   game.board[squares.rookTo] = game.board[squares.rookFrom];
  //   game.board[squares.rookFrom] = null;
  //   return { ...game };
  // }

  // const fromPiece = game.board[move.from];

  // // No piece to move!
  // if (fromPiece === null) {
  //   throw new NoPieceFoundError(`No piece found on square ${move.from}`);
  // }

  // const toPiece = game.board[move.to];

  // // It's not your piece!
  // if (fromPiece.color !== game.turn) {
  //   throw new PieceOwnershipError('You cannot move pieces of your opponent');
  // }

  // // Capturing?
  // if (toPiece !== null) {
  //   game.capturedPieces[game.turn].push(toPiece);
  // }

  // // En passant?
  // if (move.type === MoveType.PawnEnPassant) {
  //   const ghostPawn = getToSquare(move.to, getPawnDirections(game.turn).ahead, -1);
  //   game.board[ghostPawn] = null;
  // }

  // // Promoting?
  // if (move.type === MoveType.PawnPromotion) {
  //   fromPiece.figure = move.promoteTo;
  // }

  // // Just move the piece
  // game.board[move.from] = null;
  // game.board[move.to] = fromPiece;

  // // Update turn and last move
  // game.turn = getOppositeColor(game.turn);
  // game.lastMove = move;

  // return { ...game };
};
