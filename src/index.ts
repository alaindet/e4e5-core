import { BoardCoordinate } from './board';
import { getBoardState } from './functions';
import { Color, Figure } from './piece';

const board = getBoardState([
  { figure: Figure.King, color: Color.Light, coordinate: BoardCoordinate.E1 },
  { figure: Figure.King, color: Color.Dark, coordinate: BoardCoordinate.E8 },
]);

console.log('board', board);
