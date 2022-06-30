import { AbstractPlacedPiece } from '../piece';
import { getInitialPosition } from '../initial';
import { fromPlainGrid } from './plain-grid';

describe('Plain Grid serialization', () => {
  it('should deserialization from plain grid format', () => {

    const flatten = (p: AbstractPlacedPiece): string => {
      return `${p.square}${p.color}${p.figure}`;
    };

    const input = `
      |r|n|b|q|k|b|n|r|
      |p|p|p|p|p|p|p|p|
      | | | | | | | | |
      | | | | | | | | |
      | | | | | | | | |
      | | | | | | | | |
      |P|P|P|P|P|P|P|P|
      |R|N|B|Q|K|B|N|R|
    `;

    const expected = getInitialPosition().map(flatten).sort();
    const result = fromPlainGrid(input).map(flatten).sort();

    expect(result).toEqual(expected);
  });
});

export {};
