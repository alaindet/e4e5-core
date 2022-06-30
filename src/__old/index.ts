import { createGameFromPosition } from '../state';
import { viewGame } from '../view';
import { fromPlainGrid } from '../serialization/plain-grid';

const view = `
  |r|n|b|q|k|b|n|r|
  |p|p|p|p|p|p|p|p|
  | | | | | | | | |
  | | | | | | | | |
  | | | | | | | | |
  | | | | | | | | |
  |P|P|P|P|P|P|P|P|
  |R|N|B|Q|K|B|N|R|
`;

const pos = fromPlainGrid(view);
const game = createGameFromPosition(pos);
viewGame(game);
