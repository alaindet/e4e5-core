import { BoardCoordinate } from './board';
import { Piece, PlacedPiece } from './piece';

export type BoardMap = {
  [coord in BoardCoordinate]: Piece | null;
};

export interface BoardState {
  board: BoardMap;
  pieces: PlacedPiece[];
  capturedPieces: Piece[];
}
