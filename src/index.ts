import { createGameFromPosition } from './state';
import { getPositionFromView, viewGame } from './view';

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

const pos = getPositionFromView(view);
const game = createGameFromPosition(pos);
viewGame(game);
