# Minimum Words Game

A word puzzle game where you try to connect all letters to form the **fewest words possible**!

## Game Rules

1. Start with 8 curated letters that can form multiple words
2. Drag and drop letters onto the grid to form words
3. All letters must be connected (like Scrabble/Bananagrams)
4. Words can be horizontal or vertical (minimum 2 letters)
5. Words are validated against an English dictionary
6. Goal: Use all 8 letters to make the **minimum number of valid words**

## How to Play

### Starting the Game
- Open `index.html` in a web browser
- Click "New Game" to get a fresh set of 8 random letters

### Placing Letters
- **Drag** letters from the "Available Letters" section to the grid
- **Drop** them in any cell to place them
- **Click** on a placed letter to return it to the available letters

### Game Controls
- **New Game**: Start over with new random letters
- **Validate Words**: Check if all letters are connected and count words formed
- **Clear Board**: Remove all letters from the grid back to the letter bank

### Winning Strategy
- Try to create longer words to minimize total word count
- Look for ways to connect words efficiently
- All letters must form a connected group (no isolated letters or groups)

## Features

- 10x10 draggable grid (optimized for 8 letters)
- Curated letter sets that guarantee valid word combinations
- Drag-and-drop interface
- Real-time letter placement tracking
- Dictionary-based word validation (using Free Dictionary API)
- Word validation and counting
- Connectivity checking (ensures all letters connect)
- Visual indicators for valid/invalid words
- Responsive design

## Technical Details

- Pure HTML, CSS, and JavaScript (no frameworks required)
- 15 curated letter sets designed to form multiple valid words
- Letters are shuffled randomly from predefined sets for fair gameplay
- 10x10 grid optimized for 8-letter puzzles
- Grid validates that all placed letters form a single connected group
- Finds all horizontal and vertical words automatically
- Dictionary validation using Free Dictionary API (https://dictionaryapi.dev/)
- Async word validation with loading states
- Visual feedback for valid and invalid words

## Future Enhancements

Possible improvements:
- Score tracking and leaderboards
- Adjustable difficulty (more/fewer letters)
- Hint system
- Save/load game state
- Multiplayer mode
- Mobile touch support optimization
- Alternative dictionary sources

## Running the Game

Simply open `index.html` in any modern web browser. No server or build process required!
