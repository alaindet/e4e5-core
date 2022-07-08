import { BinaryBoard, Board, getEmptyBinaryBoard, SquareIndex } from '../board';
import { BoardDirection, getToSquare } from '../board-movement';
import { Piece } from '../piece';

export function getKingAvailableSquares(board: Board, index: SquareIndex): (
  | BinaryBoard
  | null
) {
  const { color } = board[index] as Piece;
  const available = getEmptyBinaryBoard();
  available[index] = true;
  let availableCount = 1;

  const branches: [BoardDirection, number][] = [
    [BoardDirection.Vertical, 1],
    [BoardDirection.Vertical, -1],
    [BoardDirection.Horizontal, 1],
    [BoardDirection.Horizontal, -1],
    [BoardDirection.AscendingDiagonal, 1],
    [BoardDirection.AscendingDiagonal, -1],
    [BoardDirection.DescendingDiagonal, 1],
    [BoardDirection.DescendingDiagonal, -1],
  ];

  const exploreBranch = (dir: BoardDirection, travel: number) => {
    let nextSquare = getToSquare(index, dir, travel);

    // Done for this branch: either reached border or piece of same color
    if (nextSquare === null || board[nextSquare]?.color === color) {
      return;
    }

    // Found an opposing piece, add capturing square and exit
    if (board[nextSquare] !== null && board[nextSquare]?.color !== color) {
      available[nextSquare] = true;
      availableCount++;
      return;
    }

    available[nextSquare] = true;
    availableCount++;
  };

  branches.forEach(([dir, unitTravel]) => exploreBranch(dir, unitTravel));

  if (availableCount === 1) {
    return null;
  }

  return available;
}
