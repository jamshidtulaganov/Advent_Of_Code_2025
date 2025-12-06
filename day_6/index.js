const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n')
    .map(row => row.split(' '))

function partOne() {
    let result = 0;
    console.log('inp', input)

    const operations = input[input.length - 1]

    for (let col = 0; col <= input[0].length - 1; col++) {
        result += calculate(operations[col], col)
    }

    return result;
}

function calculate(operation, col) {

    let isMultiple = operation === '*' ? true : false;
    let res = isMultiple ? 1 : 0;
    let columnNumbers = []

    for (let row = 0; row < input.length - 1; row++) {
        // make numbers here
        columnNumbers.push(input[row][col])
        // isMultiple ? res *= num : res += num;
    }

    console.log('column numbers', columnNumbers);

    let maxColumnNum = Math.max(...columnNumbers.map(num => Number(num)));
    let maxLen = String(maxColumnNum).length;

    let separatedColNumbers = columnNumbers.map(num => num.split(''))
    for (let col = 0; col < maxLen; col++){
        let num = defineNumbers(separatedColNumbers, col)
        isMultiple ? res *= num : res += num;
    }

    console.log('res', res)



    return res;
}

function defineNumbers(arr, col) {
    let num = ''
    for (let row = 0; row < arr.length; row++) {
        if (arr[row] && arr[row][col] ) {
            num += arr[row][col]
        }
    }

    return Number(num)
}

function partTwo() {
    const array = fs.readFileSync('input.txt', 'utf8').trim().split('\n')
    const operations = array[array.length - 1].split(' ').filter(o => o)
    let operationIdx = 0;
    const result = []
    let sub_arr = []

    for (let i = 0; i < array[0].length; i++) {
        const num = defineColumnNumbers(array.slice(0, array.length-1), i)
        if (num) {
            sub_arr.push(num)
        }
        else {
            result.push(sub_arr)
            sub_arr = []
        }
    }

    result.push(sub_arr)
    let sum = 0

    for (let j = 0; j < operations.length; j++) {stel
        if (operations[j] === '*') {
            sum += result[j].reduce((acc, num) => acc *= num, 1)
        }
        else {
            sum += result[j].reduce((acc, num) => acc += num, 0)
        }
    }

    return sum
}

const isNumber = (num) => ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(num)
function defineColumnNumbers(arr, col) {
    let num = ''

    for (let row = 0; row < arr.length; row++) {
        if (arr[row] && arr[row][col] && isNumber(arr[row][col])) {
            num += arr[row][col]
        }
    }

    return Number(num)
}


console.log(partTwo())