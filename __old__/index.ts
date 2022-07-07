import { createGameFromPosition } from './state';
import { fromTextGrid } from './serialization';
import { Color } from './common';

const pos = fromTextGrid(`
  | | | | | | | | |
  | | | | | | | | |
  | | | | | | | | |
  | | | | | | | | |
  | | | | | | | | |
  | | | |k|k| | | |
  | | | | | | | | |
  | | | | | |K| | |
`);

try {
  const game = createGameFromPosition(pos, Color.White);
  console.log('|||||||||||||||||||||| Game state is ok');
} catch (err) {
  console.log('|||||||||||||||||||||| Illegal game state');
  console.log(err);
}
