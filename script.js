// Bananagrams letter distribution
const LETTER_DISTRIBUTION = {
    'A': 13, 'B': 3, 'C': 3, 'D': 6, 'E': 18, 'F': 3, 'G': 4, 'H': 3,
    'I': 12, 'J': 2, 'K': 2, 'L': 5, 'M': 3, 'N': 8, 'O': 11, 'P': 3,
    'Q': 2, 'R': 9, 'S': 6, 'T': 9, 'U': 6, 'V': 3, 'W': 3, 'X': 2,
    'Y': 3, 'Z': 2
};

// Scrabble points for visual reference (optional)
const LETTER_POINTS = {
    'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1, 'F': 4, 'G': 2, 'H': 4,
    'I': 1, 'J': 8, 'K': 5, 'L': 1, 'M': 3, 'N': 1, 'O': 1, 'P': 3,
    'Q': 10, 'R': 1, 'S': 1, 'T': 1, 'U': 1, 'V': 4, 'W': 4, 'X': 8,
    'Y': 4, 'Z': 10
};

// Predefined letter sets that can form multiple words
const LETTER_SETS = [
    ['S', 'T', 'A', 'R', 'E', 'T', 'S', 'H'], // STAR, STARS, HATS, TEARS, RATS, HASTE, etc.
    ['C', 'A', 'R', 'E', 'T', 'S', 'O', 'N'], // CARE, CARES, STORE, NOTES, STONE, etc.
    ['P', 'L', 'A', 'N', 'T', 'E', 'R', 'S'], // PLANT, PLANTS, ANTS, LANES, etc.
    ['G', 'R', 'O', 'W', 'T', 'H', 'S', 'E'], // GROW, GROWTH, WEST, HOSE, etc.
    ['B', 'R', 'E', 'A', 'K', 'S', 'T', 'O'], // BREAK, BREAKS, STORE, BOATS, etc.
    ['F', 'L', 'O', 'W', 'E', 'R', 'S', 'T'], // FLOWER, FLOWERS, WEST, SLOW, etc.
    ['M', 'A', 'S', 'T', 'E', 'R', 'S', 'I'], // MASTER, MASTERS, MIST, TIRES, etc.
    ['D', 'R', 'E', 'A', 'M', 'S', 'T', 'I'], // DREAM, DREAMS, MIST, TIDES, etc.
    ['S', 'P', 'R', 'I', 'N', 'T', 'E', 'S'], // PRINT, PRINTS, PINES, STEP, etc.
    ['C', 'L', 'E', 'A', 'R', 'S', 'T', 'O'], // CLEAR, CLEARS, STORE, COAST, etc.
    ['H', 'E', 'A', 'R', 'T', 'S', 'O', 'N'], // HEART, HEARTS, STONE, ANTS, etc.
    ['W', 'I', 'N', 'T', 'E', 'R', 'S', 'A'], // WINTER, WINTERS, ANTS, WEARS, etc.
    ['L', 'I', 'G', 'H', 'T', 'E', 'R', 'S'], // LIGHT, LIGHTS, TIRES, etc.
    ['S', 'H', 'A', 'R', 'E', 'D', 'O', 'T'], // SHARE, SHARED, TOAD, HOSE, etc.
    ['T', 'R', 'A', 'I', 'N', 'S', 'E', 'D']  // TRAIN, TRAINS, ANTS, DINES, etc.
];

// Game state
let gameState = {
    letters: [],
    grid: Array(10).fill(null).map(() => Array(10).fill(null)),
    letterBank: [],
    words: [],
    gridSize: 10
};

// Initialize game
function initGame() {
    gameState.letters = generateRandomLetters(8);
    gameState.letterBank = [...gameState.letters];
    gameState.grid = Array(10).fill(null).map(() => Array(10).fill(null));
    gameState.words = [];

    createGrid();
    renderLetterBank();
    updateStats();
    clearValidationResults();
}

// Generate letters from predefined sets that can form words
function generateRandomLetters(count) {
    // Pick a random letter set from the predefined sets
    const randomSetIndex = Math.floor(Math.random() * LETTER_SETS.length);
    const selectedSet = [...LETTER_SETS[randomSetIndex]];

    // Shuffle the letters for variety
    for (let i = selectedSet.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [selectedSet[i], selectedSet[j]] = [selectedSet[j], selectedSet[i]];
    }

    return selectedSet;
}

// Create the grid
function createGrid() {
    const gridElement = document.getElementById('grid');
    gridElement.innerHTML = '';

    for (let row = 0; row < gameState.gridSize; row++) {
        for (let col = 0; col < gameState.gridSize; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;

            // Add drop event listeners
            cell.addEventListener('dragover', handleDragOver);
            cell.addEventListener('drop', handleDrop);
            cell.addEventListener('dragleave', handleDragLeave);
            cell.addEventListener('click', handleCellClick);

            gridElement.appendChild(cell);
        }
    }
}

// Render letter bank
function renderLetterBank() {
    const letterBankElement = document.getElementById('letter-bank');
    letterBankElement.innerHTML = '';

    gameState.letterBank.forEach((letter, index) => {
        const tile = createLetterTile(letter, index);
        letterBankElement.appendChild(tile);
    });
}

// Create a letter tile
function createLetterTile(letter, index) {
    const tile = document.createElement('div');
    tile.className = 'letter-tile';
    tile.draggable = true;
    tile.textContent = letter;
    tile.dataset.letter = letter;
    tile.dataset.index = index;

    // Add points indicator
    const points = document.createElement('span');
    points.className = 'points';
    points.textContent = LETTER_POINTS[letter];
    tile.appendChild(points);

    // Add drag event listeners
    tile.addEventListener('dragstart', handleDragStart);
    tile.addEventListener('dragend', handleDragEnd);

    return tile;
}

// Drag and drop handlers
let draggedElement = null;
let draggedFrom = null;

function handleDragStart(e) {
    draggedElement = e.target;
    draggedElement.classList.add('dragging');

    // Check if dragging from grid or letter bank
    if (e.target.parentElement.classList.contains('cell')) {
        draggedFrom = {
            type: 'grid',
            row: parseInt(e.target.parentElement.dataset.row),
            col: parseInt(e.target.parentElement.dataset.col)
        };
    } else {
        draggedFrom = {
            type: 'bank',
            index: parseInt(e.target.dataset.index)
        };
    }

    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    draggedElement.classList.remove('dragging');
    draggedElement = null;
    draggedFrom = null;
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    const cell = e.target.classList.contains('cell') ? e.target : e.target.closest('.cell');
    if (cell && !cell.querySelector('.letter-tile')) {
        cell.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    const cell = e.target.classList.contains('cell') ? e.target : e.target.closest('.cell');
    if (cell) {
        cell.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();

    const cell = e.target.classList.contains('cell') ? e.target : e.target.closest('.cell');
    if (!cell) return;

    cell.classList.remove('drag-over');

    // Check if cell is already occupied
    if (cell.querySelector('.letter-tile')) {
        return;
    }

    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const letter = draggedElement.dataset.letter;

    // Remove from previous location
    if (draggedFrom.type === 'grid') {
        gameState.grid[draggedFrom.row][draggedFrom.col] = null;
        const oldCell = document.querySelector(`.cell[data-row="${draggedFrom.row}"][data-col="${draggedFrom.col}"]`);
        if (oldCell) {
            oldCell.classList.remove('occupied');
        }
    } else if (draggedFrom.type === 'bank') {
        const index = gameState.letterBank.indexOf(letter);
        if (index > -1) {
            gameState.letterBank.splice(index, 1);
        }
    }

    // Add to new location
    gameState.grid[row][col] = letter;
    cell.classList.add('occupied');

    // Move the tile
    draggedElement.remove();
    const newTile = createLetterTile(letter, -1);
    cell.appendChild(newTile);

    updateStats();
    clearValidationResults();
}

// Handle clicking on a cell to return letter to bank
function handleCellClick(e) {
    const cell = e.target.classList.contains('cell') ? e.target : e.target.closest('.cell');
    if (!cell) return;

    const tile = cell.querySelector('.letter-tile');
    if (!tile) return;

    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const letter = gameState.grid[row][col];

    // Remove from grid
    gameState.grid[row][col] = null;
    cell.classList.remove('occupied');
    tile.remove();

    // Add back to letter bank
    gameState.letterBank.push(letter);
    renderLetterBank();
    updateStats();
    clearValidationResults();
}

// Update game statistics
function updateStats() {
    const placedCount = gameState.letters.length - gameState.letterBank.length;
    document.getElementById('placed-count').textContent = `${placedCount}/${gameState.letters.length}`;
    document.getElementById('letter-count').textContent = gameState.letters.length;
}

// Find all words on the grid
function findWords() {
    const words = [];

    // Find horizontal words
    for (let row = 0; row < gameState.gridSize; row++) {
        let word = '';
        let positions = [];

        for (let col = 0; col < gameState.gridSize; col++) {
            if (gameState.grid[row][col]) {
                word += gameState.grid[row][col];
                positions.push({ row, col });
            } else {
                if (word.length > 1) {
                    words.push({ word, positions, direction: 'horizontal' });
                }
                word = '';
                positions = [];
            }
        }

        if (word.length > 1) {
            words.push({ word, positions, direction: 'horizontal' });
        }
    }

    // Find vertical words
    for (let col = 0; col < gameState.gridSize; col++) {
        let word = '';
        let positions = [];

        for (let row = 0; row < gameState.gridSize; row++) {
            if (gameState.grid[row][col]) {
                word += gameState.grid[row][col];
                positions.push({ row, col });
            } else {
                if (word.length > 1) {
                    words.push({ word, positions, direction: 'vertical' });
                }
                word = '';
                positions = [];
            }
        }

        if (word.length > 1) {
            words.push({ word, positions, direction: 'vertical' });
        }
    }

    return words;
}

// Check if a word is valid using dictionary API
async function checkWordInDictionary(word) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
        return response.ok;
    } catch (error) {
        console.error(`Error checking word "${word}":`, error);
        // If API fails, assume word is valid to not block gameplay
        return true;
    }
}

// Validate words with dictionary check
async function validateWords() {
    const words = findWords();
    gameState.words = words;

    // Check if all letters are placed
    if (gameState.letterBank.length > 0) {
        displayValidationResults(words, false, 'Not all letters have been placed on the board.');
        return;
    }

    // Check if all letters are connected
    if (!areAllLettersConnected()) {
        displayValidationResults(words, false, 'All letters must be connected in a single group.');
        return;
    }

    // Show loading state
    displayValidationResults(words, true, '', true);

    // Check each word against dictionary
    const wordValidations = await Promise.all(
        words.map(async (wordObj) => ({
            ...wordObj,
            isValid: await checkWordInDictionary(wordObj.word)
        }))
    );

    // Count valid words
    const validWords = wordValidations.filter(w => w.isValid);
    document.getElementById('word-count').textContent = validWords.length;

    displayValidationResults(wordValidations, true);
}

// Check if all letters on the grid are connected
function areAllLettersConnected() {
    // Find all occupied cells
    const occupiedCells = [];
    for (let row = 0; row < gameState.gridSize; row++) {
        for (let col = 0; col < gameState.gridSize; col++) {
            if (gameState.grid[row][col]) {
                occupiedCells.push({ row, col });
            }
        }
    }

    if (occupiedCells.length === 0) return false;
    if (occupiedCells.length === 1) return true;

    // BFS to check connectivity
    const visited = new Set();
    const queue = [occupiedCells[0]];
    visited.add(`${occupiedCells[0].row},${occupiedCells[0].col}`);

    while (queue.length > 0) {
        const { row, col } = queue.shift();

        // Check adjacent cells
        const adjacent = [
            { row: row - 1, col },
            { row: row + 1, col },
            { row, col: col - 1 },
            { row, col: col + 1 }
        ];

        for (const adj of adjacent) {
            if (adj.row >= 0 && adj.row < gameState.gridSize &&
                adj.col >= 0 && adj.col < gameState.gridSize &&
                gameState.grid[adj.row][adj.col] &&
                !visited.has(`${adj.row},${adj.col}`)) {

                visited.add(`${adj.row},${adj.col}`);
                queue.push(adj);
            }
        }
    }

    return visited.size === occupiedCells.length;
}

// Display validation results
function displayValidationResults(words, success, errorMessage = '', isLoading = false) {
    const resultsElement = document.getElementById('validation-results');
    resultsElement.classList.remove('hidden');

    let html = '<h3>Validation Results</h3>';

    if (!success) {
        html += `<p class="error">${errorMessage}</p>`;
    } else if (isLoading) {
        html += `<p>Checking words against dictionary...</p>`;
    } else {
        const validWords = words.filter(w => w.isValid !== false);
        const invalidWords = words.filter(w => w.isValid === false);

        if (invalidWords.length === 0) {
            html += `<p class="success">All letters are connected! You formed ${validWords.length} valid word${validWords.length !== 1 ? 's' : ''}!</p>`;
        } else {
            html += `<p class="success">All letters are connected!</p>`;
            html += `<p class="error">${invalidWords.length} invalid word${invalidWords.length !== 1 ? 's' : ''} found. Try rearranging your letters!</p>`;
        }
    }

    if (words.length > 0 && !isLoading) {
        html += '<div class="word-list">';
        words.forEach(({ word, direction, isValid }) => {
            const validClass = isValid === false ? 'invalid' : '';
            const statusIcon = isValid === false ? '❌' : '✓';
            const statusText = isValid === false ? 'not in dictionary' : direction;

            html += `<div class="word-item ${validClass}">
                <span class="word">${word} ${statusIcon}</span>
                <span class="status">(${statusText})</span>
            </div>`;
        });
        html += '</div>';
    }

    resultsElement.innerHTML = html;
}

function clearValidationResults() {
    const resultsElement = document.getElementById('validation-results');
    resultsElement.innerHTML = '';
    resultsElement.classList.add('hidden');
}

// Clear the board
function clearBoard() {
    // Return all letters to bank
    for (let row = 0; row < gameState.gridSize; row++) {
        for (let col = 0; col < gameState.gridSize; col++) {
            if (gameState.grid[row][col]) {
                gameState.letterBank.push(gameState.grid[row][col]);
                gameState.grid[row][col] = null;
            }
        }
    }

    // Re-render everything
    createGrid();
    renderLetterBank();
    updateStats();
    clearValidationResults();
}

// Event listeners
document.getElementById('new-game').addEventListener('click', initGame);
document.getElementById('validate').addEventListener('click', validateWords);
document.getElementById('clear-board').addEventListener('click', clearBoard);

// Initialize the game on page load
window.addEventListener('DOMContentLoaded', initGame);
