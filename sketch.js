// Main grid and tracking arrays
let y = Array(9).fill().map(() => Array(9).fill(0));
let x = [];
let globalNinth = [];
let globalNinthIndices = [];
let globalRow = [];
let globalCol = [];

let workingExample = [

  [0, 0, 3, 0, 0, 0, 2, 0, 0],

  [0, 6, 0, 9, 8, 0, 0, 4, 3],

  [4, 9, 0, 0, 3, 1, 0, 0, 6],

  [9, 0, 7, 0, 0, 0, 8, 6, 0],

  [0, 4, 0, 0, 9, 8, 0, 0, 0],

  [0, 0, 5, 4, 0, 7, 1, 0, 9],

  [6, 0, 0, 0, 0, 3, 9, 0, 5],

  [5, 0, 8, 1, 0, 0, 0, 7, 2],

  [2, 0, 9, 0, 5, 6, 0, 3, 8],

];



let cryptic1 = [

  [0, 0, 0, 2, 0, 0, 1, 0, 0],

  [0, 3, 0, 0, 4, 0, 0, 5, 0],

  [0, 0, 6, 0, 0, 8, 0, 0, 0],

  [5, 0, 0, 7, 0, 0, 2, 0, 0],

  [0, 4, 0, 0, 1, 0, 0, 0, 8],

  [0, 0, 0, 0, 0, 9, 0, 6, 0],

  [0, 1, 0, 0, 0, 0, 3, 0, 0],

  [7, 0, 0, 0, 0, 0, 0, 4, 0],

  [0, 0, 2, 6, 0, 0, 0, 0, 9],

];



let easy1 = [

  [0, 0, 4, 0, 5, 0, 0, 0, 0],

  [9, 0, 0, 7, 3, 4, 6, 0, 0],

  [0, 0, 3, 0, 2, 1, 0, 4, 9],

  [0, 3, 5, 0, 9, 0, 4, 8, 0],

  [0, 9, 0, 0, 0, 0, 0, 3, 0],

  [0, 7, 6, 0, 1, 0, 9, 2, 0],

  [3, 1, 0, 9, 7, 0, 2, 0, 0],

  [0, 0, 9, 1, 8, 2, 0, 0, 3],

  [0, 0, 0, 0, 6, 0, 0, 0, 1],

];



let easy2 = [

  [0, 7, 0, 0, 2, 0, 0, 4, 6],

  [0, 6, 0, 0, 0, 0, 8, 9, 0],

  [2, 0, 0, 8, 0, 0, 7, 1, 5],

  [0, 8, 4, 0, 9, 7, 0, 0, 0],

  [7, 1, 0, 0, 0, 0, 0, 5, 9],

  [0, 0, 0, 1, 3, 0, 4, 8, 0],

  [6, 9, 7, 0, 0, 2, 0, 0, 8],

  [0, 5, 8, 0, 0, 0, 0, 6, 0],

  [4, 3, 0, 0, 8, 0, 0, 7, 0],

];



let medium1 = [

  [0, 9, 0, 0, 0, 3, 0, 0, 1],

  [5, 0, 0, 6, 2, 0, 3, 0, 0],

  [0, 0, 0, 1, 0, 0, 2, 0, 0],

  [0, 0, 0, 0, 1, 0, 4, 0, 0],

  [9, 0, 7, 0, 5, 2, 0, 8, 0],

  [4, 3, 0, 7, 0, 0, 0, 1, 0],

  [0, 6, 0, 0, 7, 4, 0, 0, 0],

  [3, 0, 4, 0, 6, 0, 5, 0, 8],

  [0, 2, 0, 0, 0, 5, 0, 0, 0],

];



let medium2 = [

  [0, 0, 0, 0, 0, 1, 0, 0, 0],

  [6, 0, 0, 0, 0, 0, 9, 0, 5],

  [0, 0, 0, 0, 0, 0, 4, 2, 7],

  [0, 4, 0, 2, 6, 0, 0, 7, 0],

  [0, 2, 0, 0, 1, 0, 0, 0, 9],

  [0, 9, 1, 0, 3, 4, 0, 0, 6],

  [0, 0, 9, 8, 0, 6, 1, 0, 0],

  [1, 0, 0, 0, 4, 0, 0, 0, 0],

  [0, 0, 8, 0, 0, 0, 7, 6, 0],

];



let cryptic2 = [

  [8, 0, 0, 0, 0, 0, 0, 0, 0],

  [0, 0, 3, 6, 0, 0, 0, 0, 0],

  [0, 7, 0, 0, 9, 0, 2, 0, 0],

  [0, 5, 0, 0, 0, 7, 0, 0, 0],

  [0, 0, 0, 0, 4, 5, 7, 0, 0],

  [0, 0, 0, 1, 0, 0, 0, 3, 0],

  [0, 0, 1, 0, 0, 0, 0, 6, 8],

  [0, 0, 8, 5, 0, 0, 0, 1, 0],

  [0, 9, 0, 0, 0, 0, 4, 0, 0],

];


function consoleOutput(x) {
    for (let i = 0; i < 9; i++) {
        console.log(i + ": " + x[i].join(" "));
    }
}

function indexFromRowCol(r, c) {
    return 9 * r + c;
}

function pickUpNinth(row, col) {
    let sectionStartRow = Math.floor(row / 3) * 3;
    let sectionStartCol = Math.floor(col / 3) * 3;
    
    globalNinth = [];
    globalNinthIndices = [];
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let currentRow = sectionStartRow + i;
            let currentCol = sectionStartCol + j;
            globalNinth.push(y[currentRow][currentCol]);
            globalNinthIndices.push(indexFromRowCol(currentRow, currentCol));
        }
    }
}

class Boxes {
    constructor(sel, q) {
        this.sel = createSelect();
        this.sel.style("appearance", "none");
        this.sel.style("width", "30px");
        this.sel.style("height", "30px");
        this.sel.style("text-align", "center");
        this.sel.style("font-weight", "900");
        this.sel.style("background-color", "#FFB6C1");
        this.sel.val = q;
    }
}

function setup() {
  
    document.body.style.backgroundColor = '#FFDAB9';
    
    // Initialize grid with workingExample
    for (let i = 0; i < 81; i++) {
        x[i] = new Boxes(x[i], i);
        let c = Math.floor(i / 9);
        let r = i % 9;
        y[r][c] = workingExample[r][c];
    }
    
    createCanvas(913, 914);
    outputSections();
    
    // Create difficulty selection dropdown
    let difficultySelect = createSelect();
    difficultySelect.position(20, 325);
    difficultySelect.option('EASY');
    difficultySelect.option('MEDIUM');
    difficultySelect.option('HARD');
    difficultySelect.style("background-color", "#FFFFE0");
    
    // Create "Generate New Puzzle" button
    let generateButton = createButton("Generate New Puzzle");
    generateButton.position(20, 355);
    generateButton.style("background-color", "#FFFFE0");
    generateButton.mousePressed(() => generatePuzzle(difficultySelect.value()));
    
    // Create "Solve" button
    let solveButton = createButton("Solve");
    solveButton.position(170, 355);
    solveButton.style("background-color", "#FFFFE0")
    solveButton.mousePressed(solve);

    // Update the display with initial workingExample
    setAnswers(y);
}

function outputSections() {
    for (let i = 0; i < 81; i++) {
        let a = 20 + 30 * (i % 3) + Math.floor((i % 9) / 3) * 92;
        let c = Math.floor(i / 27) * 2;
        let b = 20 + Math.floor(i / 9) * 30 + c;
        
        x[i].sel.position(a + 8, b + 8);
        for (let k = 0; k < 10; k++) {
            x[i].sel.option(k);
        }
    }
}

function isValid(grid, row, col, num) {
    // Check row
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num) return false;
    }
    
    // Check column
    for (let x = 0; x < 9; x++) {
        if (grid[x][col] === num) return false;
    }
    
    // Check 3x3 box
    let startRow = row - row % 3;
    let startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[i + startRow][j + startCol] === num) return false;
        }
    }
    
    return true;
}

let lastEasyPuzzle = 0;
let lastMediumPuzzle = 0;
let lastHardPuzzle = 0;

function generatePuzzle(difficulty) {
    let selectedPuzzle;
    
    if (difficulty === 'EASY') {
        if (lastEasyPuzzle === 0) {
            selectedPuzzle = easy1;
            lastEasyPuzzle = 1;
        } else {
            selectedPuzzle = easy2;
            lastEasyPuzzle = 0;
        }
    } else if (difficulty === 'MEDIUM') {
        if (lastMediumPuzzle === 0) {
            selectedPuzzle = medium1;
            lastMediumPuzzle = 1;
        } else {
            selectedPuzzle = medium2;
            lastMediumPuzzle = 0;
        }
    } else if (difficulty === 'HARD') {
        if (lastHardPuzzle === 0) {
            selectedPuzzle = cryptic1;
            lastHardPuzzle = 1;
        } else {
            selectedPuzzle = cryptic2;
            lastHardPuzzle = 0;
        }
    } else if (difficulty === 'EXPERT') {
        selectedPuzzle = workingExample;
    } else {
        selectedPuzzle = workingExample;
    }
    
    // Clear the grid
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            y[i][j] = selectedPuzzle[i][j];
        }
    }
    
    // Update the display
    setAnswers(y);
}

function solve() {
    let grid = y;
    let emptyCells = [];

    // Collect all empty cells
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                emptyCells[emptyCells.length] = { row, col };
            }
        }
    }

    let currentIndex = 0;

    while (currentIndex < emptyCells.length) {
        let { row, col } = emptyCells[currentIndex];
        let valuePlaced = false;

        // Try the next number for the current cell
        for (let num = grid[row][col] + 1; num <= 9; num++) {
            if (isValid(grid, row, col, num)) {
                grid[row][col] = num;
                valuePlaced = true;
                break;
            }
        }

        if (valuePlaced) {
            // Move to the next empty cell
            currentIndex++;
        } else {
            // Reset the current cell and backtrack
            grid[row][col] = 0;
            currentIndex--;

            // If backtracking beyond the first cell, the puzzle is unsolvable
            if (currentIndex < 0) {
                console.log("No solution exists for this Sudoku.");
                return;
            }
        }
    }

    setAnswers(grid); // Output the solved grid
}

function setAnswers(n) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            x[indexFromRowCol(i, j)].sel.selected(n[i][j]);
            y[i][j] = n[i][j];
        }
    }
}
