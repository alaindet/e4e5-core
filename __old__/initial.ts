import { BoardSquare } from './board';
import { Color } from './common';
import { Figure, GamePosition } from './piece';

export function getInitialPosition(): GamePosition {
  return [
    { figure: Figure.King, color: Color.White, square: BoardSquare.E1 },
    { figure: Figure.Queen, color: Color.White, square: BoardSquare.D1 },
    { figure: Figure.Bishop, color: Color.White, square: BoardSquare.C1 },
    { figure: Figure.Bishop, color: Color.White, square: BoardSquare.F1 },
    { figure: Figure.Knight, color: Color.White, square: BoardSquare.B1 },
    { figure: Figure.Knight, color: Color.White, square: BoardSquare.G1 },
    { figure: Figure.Rook, color: Color.White, square: BoardSquare.A1 },
    { figure: Figure.Rook, color: Color.White, square: BoardSquare.H1 },
    { figure: Figure.Pawn, color: Color.White, square: BoardSquare.A2 },
    { figure: Figure.Pawn, color: Color.White, square: BoardSquare.B2 },
    { figure: Figure.Pawn, color: Color.White, square: BoardSquare.C2 },
    { figure: Figure.Pawn, color: Color.White, square: BoardSquare.D2 },
    { figure: Figure.Pawn, color: Color.White, square: BoardSquare.E2 },
    { figure: Figure.Pawn, color: Color.White, square: BoardSquare.F2 },
    { figure: Figure.Pawn, color: Color.White, square: BoardSquare.G2 },
    { figure: Figure.Pawn, color: Color.White, square: BoardSquare.H2 },
    { figure: Figure.King, color: Color.Black, square: BoardSquare.E8 },
    { figure: Figure.Queen, color: Color.Black, square: BoardSquare.D8 },
    { figure: Figure.Bishop, color: Color.Black, square: BoardSquare.C8 },
    { figure: Figure.Bishop, color: Color.Black, square: BoardSquare.F8 },
    { figure: Figure.Knight, color: Color.Black, square: BoardSquare.B8 },
    { figure: Figure.Knight, color: Color.Black, square: BoardSquare.G8 },
    { figure: Figure.Rook, color: Color.Black, square: BoardSquare.A8 },
    { figure: Figure.Rook, color: Color.Black, square: BoardSquare.H8 },
    { figure: Figure.Pawn, color: Color.Black, square: BoardSquare.A7 },
    { figure: Figure.Pawn, color: Color.Black, square: BoardSquare.B7 },
    { figure: Figure.Pawn, color: Color.Black, square: BoardSquare.C7 },
    { figure: Figure.Pawn, color: Color.Black, square: BoardSquare.D7 },
    { figure: Figure.Pawn, color: Color.Black, square: BoardSquare.E7 },
    { figure: Figure.Pawn, color: Color.Black, square: BoardSquare.F7 },
    { figure: Figure.Pawn, color: Color.Black, square: BoardSquare.G7 },
    { figure: Figure.Pawn, color: Color.Black, square: BoardSquare.H7 },
  ];
}
