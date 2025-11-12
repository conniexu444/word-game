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

// Game state
let gameState = {
    letters: [],
    grid: Array(15).fill(null).map(() => Array(15).fill(null)),
    letterBank: [],
    words: [],
    gridSize: 15
};

// Initialize game
function initGame() {
    gameState.letters = generateRandomLetters(14);
    gameState.letterBank = [...gameState.letters];
    gameState.grid = Array(15).fill(null).map(() => Array(15).fill(null));
    gameState.words = [];

    createGrid();
    renderLetterBank();
    updateStats();
    clearValidationResults();
}

// Generate random letters based on Bananagrams distribution
function generateRandomLetters(count) {
    const letterPool = [];
    for (const [letter, frequency] of Object.entries(LETTER_DISTRIBUTION)) {
        for (let i = 0; i < frequency; i++) {
            letterPool.push(letter);
        }
    }

    const selectedLetters = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * letterPool.length);
        selectedLetters.push(letterPool.splice(randomIndex, 1)[0]);
    }

    return selectedLetters;
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

// Validate words (basic English word validation)
// In a real implementation, you'd check against a dictionary API or word list
function validateWords() {
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

    document.getElementById('word-count').textContent = words.length;
    displayValidationResults(words, true);
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
function displayValidationResults(words, success, errorMessage = '') {
    const resultsElement = document.getElementById('validation-results');
    resultsElement.classList.remove('hidden');

    let html = '<h3>Validation Results</h3>';

    if (!success) {
        html += `<p class="error">${errorMessage}</p>`;
    } else {
        html += `<p class="success">All letters are connected! You formed ${words.length} word${words.length !== 1 ? 's' : ''}.</p>`;
    }

    if (words.length > 0) {
        html += '<div class="word-list">';
        words.forEach(({ word, direction }) => {
            html += `<div class="word-item">
                <span class="word">${word}</span>
                <span class="status">(${direction})</span>
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
