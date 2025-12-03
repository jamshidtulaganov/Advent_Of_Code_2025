const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').trim().split(',');

function solve(input) {
    let sumInvalidIds = 0;
    for (const rangeIds of input) {
        sumInvalidIds += range(rangeIds);
    }
    return sumInvalidIds;
}

function isInvalid(id) {
    const s = String(id);
    const L = s.length;

    for (let p = 1; p <= L / 2; p++) {
        if (L % p !== 0) continue;

        const pattern = s.substring(0, p);
        const repeated = pattern.repeat(L / p);

        if (repeated === s) return true;
    }
    return false;
}

function range(inp) {
    const [startId, endId] = inp.split('-').map(Number);
    let sum = 0;

    for (let i = startId; i <= endId; i++) {
        if (isInvalid(i)) {
            console.log('invalid:', i);
            sum += i;
        }
    }

    return sum;
}

console.log(solve(input));
