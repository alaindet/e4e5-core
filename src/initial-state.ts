import { BoardCoordinate } from './board';
import { getBoardState } from './functions';
import { Color, Figure, PiecesList } from './piece';
import { BoardMap } from './state';

export const INITIAL_PIECES: PiecesList = [
  { figure: Figure.King, color: Color.Light, coordinate: BoardCoordinate.E1 },
  { figure: Figure.Queen, color: Color.Light, coordinate: BoardCoordinate.D1 },
  { figure: Figure.Bishop, color: Color.Light, coordinate: BoardCoordinate.C1 },
  { figure: Figure.Bishop, color: Color.Light, coordinate: BoardCoordinate.F1 },
  { figure: Figure.Knight, color: Color.Light, coordinate: BoardCoordinate.B1 },
  { figure: Figure.Knight, color: Color.Light, coordinate: BoardCoordinate.G1 },
  { figure: Figure.Rook, color: Color.Light, coordinate: BoardCoordinate.A1 },
  { figure: Figure.Rook, color: Color.Light, coordinate: BoardCoordinate.H1 },
  { figure: Figure.Pawn, color: Color.Light, coordinate: BoardCoordinate.A2 },
  { figure: Figure.Pawn, color: Color.Light, coordinate: BoardCoordinate.B2 },
  { figure: Figure.Pawn, color: Color.Light, coordinate: BoardCoordinate.C2 },
  { figure: Figure.Pawn, color: Color.Light, coordinate: BoardCoordinate.D2 },
  { figure: Figure.Pawn, color: Color.Light, coordinate: BoardCoordinate.E2 },
  { figure: Figure.Pawn, color: Color.Light, coordinate: BoardCoordinate.F2 },
  { figure: Figure.Pawn, color: Color.Light, coordinate: BoardCoordinate.G2 },
  { figure: Figure.Pawn, color: Color.Light, coordinate: BoardCoordinate.H2 },

  { figure: Figure.King, color: Color.Dark, coordinate: BoardCoordinate.E8 },
  { figure: Figure.Queen, color: Color.Dark, coordinate: BoardCoordinate.D8 },
  { figure: Figure.Bishop, color: Color.Dark, coordinate: BoardCoordinate.C8 },
  { figure: Figure.Bishop, color: Color.Dark, coordinate: BoardCoordinate.F8 },
  { figure: Figure.Knight, color: Color.Dark, coordinate: BoardCoordinate.B8 },
  { figure: Figure.Knight, color: Color.Dark, coordinate: BoardCoordinate.G8 },
  { figure: Figure.Rook, color: Color.Dark, coordinate: BoardCoordinate.A7 },
  { figure: Figure.Rook, color: Color.Dark, coordinate: BoardCoordinate.H7 },
  { figure: Figure.Pawn, color: Color.Dark, coordinate: BoardCoordinate.A7 },
  { figure: Figure.Pawn, color: Color.Dark, coordinate: BoardCoordinate.B7 },
  { figure: Figure.Pawn, color: Color.Dark, coordinate: BoardCoordinate.C7 },
  { figure: Figure.Pawn, color: Color.Dark, coordinate: BoardCoordinate.D7 },
  { figure: Figure.Pawn, color: Color.Dark, coordinate: BoardCoordinate.E7 },
  { figure: Figure.Pawn, color: Color.Dark, coordinate: BoardCoordinate.F7 },
  { figure: Figure.Pawn, color: Color.Dark, coordinate: BoardCoordinate.G7 },
  { figure: Figure.Pawn, color: Color.Dark, coordinate: BoardCoordinate.H7 },
];

export const INITIAL_BOARD: BoardMap = getBoardState(INITIAL_PIECES);
