export enum Color {
  Light = 0,
  Dark = 1,
}

export const getOppositeColor = (color: Color): Color => {
  return color === Color.Dark ? Color.Light : Color.Dark;
};
