const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').trim().split(',');

function solve(input) {
    let sumInvalidIds = 0

    for (const rangeIds of input) {
        sumInvalidIds += range(rangeIds)
    }

    return sumInvalidIds
}

function range(inp) {
    const [startId, endId] = inp.split('-');
    let sum = 0;

    for (let i = Number(startId); i <= Number(endId);i++) {
        // find the duplicate digits
        let current = String(i)
        let len = String(i).length;
        let mid  = Math.floor(len / 2)

        if (i <= 10 || len % 2 === 1) continue;

        // checked

        is_invalid = true;

        for (j = 0, k = mid; j < mid && k < len; j++, k++) {
            if (current[j] !== current[k]) {
                is_invalid = false;
            };
        }

        if (is_invalid) {
            console.log("Invalid Id", i);
            sum += i;
        }

    }

    return sum;
}

console.log(solve(input))

// has duplicate digits -> >10
// 11, 22, 33, 44, 99
// 999, 2X, 4X
// 1010, 1111, 2020, 2121
// 101101