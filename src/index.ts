import { fromFEN } from './serialization/fen';

const input = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const result = fromFEN(input).board;

console.log(result);
