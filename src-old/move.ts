import { BoardCoordinate, BoardMap, BoardState } from './board';

export interface Move {
  from: BoardCoordinate;
  to: BoardCoordinate;
}

export const move = (state: BoardState, move: Move ): BoardState => {
  const { from, to } = move;
  const piece = state.board[from];

  if (piece === null) {
    throw new Error(`Piece not found on ${from}`);
  }

  // TODO: Legality
  // TODO: capturing, castling, en passant

  return {
    board: { ...state.board, [from]: null, [to]: piece },
    pieces: state.pieces,
    capturedPieces: state.capturedPieces,
  };

  return { ...board, [from]: null, [to]: piece };
};

export const isMoveLegal = (board: BoardMap, move: Move): boolean => {
  return false;
};

export const tryMove = (board: BoardMap, m: Move): BoardMap => {
  if (!isMoveLegal(board, m)) {
    throw new Error('Illegal move');
  }

  return move(board, m);
};
