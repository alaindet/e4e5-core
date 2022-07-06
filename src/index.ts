import { fromFEN } from './serialization/fen';

const input = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const game = fromFEN(input);

console.log(game);
