import { BoardSquare } from './board';
import { Color } from './common';
import { Figure, GamePosition } from './piece';

export const INITIAL_POSITION: GamePosition = [
  { figure: Figure.King, color: Color.Light, square: BoardSquare.E1 },
  { figure: Figure.Queen, color: Color.Light, square: BoardSquare.D1 },
  { figure: Figure.Bishop, color: Color.Light, square: BoardSquare.C1 },
  { figure: Figure.Bishop, color: Color.Light, square: BoardSquare.F1 },
  { figure: Figure.Knight, color: Color.Light, square: BoardSquare.B1 },
  { figure: Figure.Knight, color: Color.Light, square: BoardSquare.G1 },
  { figure: Figure.Rook, color: Color.Light, square: BoardSquare.A1 },
  { figure: Figure.Rook, color: Color.Light, square: BoardSquare.H1 },
  { figure: Figure.Pawn, color: Color.Light, square: BoardSquare.A2 },
  { figure: Figure.Pawn, color: Color.Light, square: BoardSquare.B2 },
  { figure: Figure.Pawn, color: Color.Light, square: BoardSquare.C2 },
  { figure: Figure.Pawn, color: Color.Light, square: BoardSquare.D2 },
  { figure: Figure.Pawn, color: Color.Light, square: BoardSquare.E2 },
  { figure: Figure.Pawn, color: Color.Light, square: BoardSquare.F2 },
  { figure: Figure.Pawn, color: Color.Light, square: BoardSquare.G2 },
  { figure: Figure.Pawn, color: Color.Light, square: BoardSquare.H2 },
  { figure: Figure.King, color: Color.Dark, square: BoardSquare.E8 },
  { figure: Figure.Queen, color: Color.Dark, square: BoardSquare.D8 },
  { figure: Figure.Bishop, color: Color.Dark, square: BoardSquare.C8 },
  { figure: Figure.Bishop, color: Color.Dark, square: BoardSquare.F8 },
  { figure: Figure.Knight, color: Color.Dark, square: BoardSquare.B8 },
  { figure: Figure.Knight, color: Color.Dark, square: BoardSquare.G8 },
  { figure: Figure.Rook, color: Color.Dark, square: BoardSquare.A8 },
  { figure: Figure.Rook, color: Color.Dark, square: BoardSquare.H8 },
  { figure: Figure.Pawn, color: Color.Dark, square: BoardSquare.A7 },
  { figure: Figure.Pawn, color: Color.Dark, square: BoardSquare.B7 },
  { figure: Figure.Pawn, color: Color.Dark, square: BoardSquare.C7 },
  { figure: Figure.Pawn, color: Color.Dark, square: BoardSquare.D7 },
  { figure: Figure.Pawn, color: Color.Dark, square: BoardSquare.E7 },
  { figure: Figure.Pawn, color: Color.Dark, square: BoardSquare.F7 },
  { figure: Figure.Pawn, color: Color.Dark, square: BoardSquare.G7 },
  { figure: Figure.Pawn, color: Color.Dark, square: BoardSquare.H7 },
];