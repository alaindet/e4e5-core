export enum Color {
  White = 'w',
  Black = 'b',
}

export const DRAW = 'draw';

export type GameResult = 'draw' | Color;

export function getOppositeColor(color: Color): Color {
  return color === Color.Black ? Color.White : Color.Black;
}
