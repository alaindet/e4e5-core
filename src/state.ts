import { BoardCoordinate } from './board';
import { Piece } from './piece';

export type BoardMap = {
  [coord in BoardCoordinate]: Piece | null;
};
