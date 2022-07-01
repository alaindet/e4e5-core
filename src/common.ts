export enum Color {
  White = 'w',
  Black = 'b',
}

export const getOppositeColor = (color: Color): Color => {
  return color === Color.Black ? Color.White : Color.Black;
};
