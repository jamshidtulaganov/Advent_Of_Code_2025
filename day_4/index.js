const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n').map((row) => row.trim());

let sum = 0;
function partOne(input) {
    const NUM_ROWS = input.length;
    if (NUM_ROWS === 0) return [];

    const NUM_COLS = input[0].length;
    const ROLL_CHAR = '@';


    const NEIGHBOR_OFFSETS = [
        [-1, -1], [-1, 0], [-1, 1], // Top row: Diagonal-Left, Up, Diagonal-Right
        [0, -1], /* [0, 0] */ [0, 1], // Middle row: Left, Right
        [1, -1], [1, 0], [1, 1]
    ];

    const grid = input.map(row => {
        if (Array.isArray(row)) {
            return row;
        }

        return row.split('')
    });
    let gridSum = 0;

    for (let row = 0; row < NUM_ROWS; row++) {
        for (let col = 0; col < NUM_COLS; col++) {

            if (input[row][col] !== ROLL_CHAR) {
                continue;
            }

            let rollsCount = 0;

            for (const [dr, dc] of NEIGHBOR_OFFSETS) {
                const neighborRow = row + dr;
                const neighborCol = col + dc;

                const isWithinBounds = (
                    neighborRow >= 0 && neighborRow < NUM_ROWS &&
                    neighborCol >= 0 && neighborCol < NUM_COLS
                );

                if (isWithinBounds) {
                    // 4. Check if the valid neighbor position contains a roll of paper
                    if (input[neighborRow][neighborCol] === ROLL_CHAR) {
                        rollsCount++;
                    }
                }
            }

            if (rollsCount < 4) {
                grid[row][col] = '.';
                sum++;
                gridSum++;
            }
        }
    }

    console.log('sum', grid)

    if (gridSum === 0) return; // base case
    partOne(grid, sum)
}

partOne(input)
console.log('sum', sum)