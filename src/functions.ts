import { BoardCoordinate } from './board';
import { AbstractPlacedPiece, PiecesList } from './piece';
import { BoardMap } from './state';

export const getEmptyBoard = (): BoardMap => {
  return Object.values(BoardCoordinate).reduce((board, coord) => {
    board[coord] = null;
    return board;
  }, {} as BoardMap);
};

export const getPieceId = (piece: AbstractPlacedPiece): number => {
  const id = `${piece.figure}${piece.color}${piece.coordinate}`;

  let result = 0;
  const digits = Date.now().toString().split('');

  for (let i = 0; i < digits.length - 1; i++) {
    result += (+digits[i]) * (+digits[i + 1]);
  }

  for (let i = 0; i < id.length; i++) {
    result += id.charCodeAt(i);
  }

  return result;
};

export const getBoardState = (pieces: PiecesList): BoardMap => {
  const board = getEmptyBoard();

  pieces.forEach(piece => {
    const { figure, color, coordinate } = piece;
    const id = getPieceId(piece);
    board[coordinate] = { figure, color, id };
  });

  return board;
};
