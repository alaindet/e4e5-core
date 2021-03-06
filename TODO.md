- [ ] Add king checker function and add move legality check on updateGame()
- [ ] Add integration tests for: initial board, castling, promotion, checkmate, check positions
- [x] Special move: Promotion
- [x] Special move: Castling
- [x] Special move: En Passant
- [ ] Serialization/deserialization in common formats
- [x] Add custom errors
- [ ] Move examples into tests
- [x] Implement FEN deserializer (https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation)
- [ ] https://cameronnokes.com/blog/the-30-second-guide-to-publishing-a-typescript-package-to-npm/
- [ ] doc
- [ ] ESLint
- [ ] Husky
- [x] Rename "plain grid"?
- [ ] Validate win conditions
- [ ] Validate checkmate
- [x] Change game state based on FEN information https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
- [ ] Add FEN serialization
- [x] Add history to game state
- [x] Convert Color Enum to Color { White = 'w', Black = 'b' }
- [ ] Use PieceLetter into viewGame()
- [x] Move viewGame() into serialization
- [ ] Update README.md
- [x] Change all anonymous exported functions as proper functions
- [ ] Check end game conditions: half moves clock, checkmate, draw
- [ ] Add "resign" move
- [ ] Add "draw" agreement
- [ ] Add "result" to game state, lock updateGame and even forceMove if result !== null
