const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');

function solve(input) {
    let current = 50;
    let password = 0

    input.forEach(inp => {
        current = defineDirection(inp, current)
        console.log(current, inp)

        if (current === 0) {
            password++
        }
    })

    return password;
}


function defineDirection(str, current_point) {
    let direction = str[0]; // L, R
    let value = Number(str.slice(1, str.length - 1)) % 100;
    let final_point = current_point;

    if (direction === 'L') {
        let res = (current_point - value) % 100;

        if (res < 0) {
            res = 100 + res
        }

        final_point = res;
    }
    else {
        final_point = (value + current_point) % 100;
    }

    return final_point;
}

console.log(solve(input));
