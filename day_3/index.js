const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');


function partOne(input) {
    let sum = 0;

    for (const bank of input) {
        // find the max two numbers
        // range [1-9]
        // first find the large number,
        //

        const digitsList = bank.split('')

        let firstMaxDigit = Math.max(...digitsList.slice(0, digitsList.length - 2))
        let firstMaxIndex = digitsList.findIndex(d => firstMaxDigit === Number(d))
        let secondMaxDigit = Math.max(...digitsList.slice(firstMaxIndex+1))
        let maxDigits = String(firstMaxDigit) + String(secondMaxDigit);

        sum += Number(maxDigits)
    }

    return sum;
}

function partTwo(input) {
    let sum = 0;

    for (const bank of input) {
        sum += findMaxDigits(bank.trim())
    }

    return sum
}
function findMaxDigits(digits) {
    // let max twelve numbers

    let start = 0;
    let end = digits.length - 12;
    let result = ''
    // console.log('digit len: ', digits.length, digits)


    // for finding twelve numbers
    for (let i = 0; i < 12; i++) {

        let max = -Infinity;
        let maxIndex = 0;

        while (start <= end) {
            if (max < Number(digits[start])) {
                max = digits[start]
                maxIndex = start;
            }

            start++;
        }

        start = maxIndex+1;
        end++;

        // console.log('sub_array[]', [start, end], 'max: ', max)

        result += max;
    }

    console.log('max numbers', result)

    return Number(result)
}


// console.log(partOne(input))
console.log(partTwo(input))