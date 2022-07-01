// Thanks to https://bobbyhadz.com/blog/typescript-extend-error-class
export class NoPieceFoundError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NoPieceFoundError.prototype);
  }
}

export class PieceOwnershipError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, PieceOwnershipError.prototype);
  }
}

// TODO: Move this in another file
export class IllegalMoveError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, IllegalMoveError.prototype);
  }
}
