const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');

function solve(input) {
    let current = 50;
    let password = 0;

    for (let str of input) {
        let direction = str[0];
        let value = Number(str.slice(1));

        let k0;
        if (direction === 'R') {
            // distance to next zero going right
            k0 = (100 - current) % 100;
            if (k0 === 0) k0 = 100;

            if (k0 <= value) {
                password += 1 + Math.floor((value - k0) / 100);
            }

            current = (current + value) % 100;

        } else {
            // L direction
            k0 = current % 100;
            if (k0 === 0) k0 = 100;

            if (k0 <= value) {
                password += 1 + Math.floor((value - k0) / 100);
            }

            current = (current - value) % 100;
            if (current < 0) current += 100;
        }
    }

    return password;
}

console.log(solve(input));
