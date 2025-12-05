const fs = require('fs');

let productIdsRanges = new Array()
let productIds = new Array()
let isBlank = false;

fs.readFileSync('input.txt', 'utf8').trim().split('\n')
    .forEach((row) => {
        // if (row.trim() === '') {
        //     isBlank = true;
        // }

        productIdsRanges.push(row.trim())

        // if (!isBlank && row.trim() !== '') {
        // }
        // if (isBlank && row.trim() !== '') {
        //     productIds.push(row.trim())
        // }
    });


function partOne() {
    let countOfFreshProducts = 0;

    for (const productId of productIds) {
        let isFresh = false;

        for (const range of productIdsRanges) {
            const [start, end] = range.split('-').map(num => Number(num))

            if (Number(productId) >= start && Number(productId) <= end) {
                isFresh = true;
            }
        }

        if (isFresh) {
            countOfFreshProducts++
        }
    }

    return countOfFreshProducts;
}


function partTwo() {
    // Convert ranges to intervals and merge overlapping ones
    const intervals = productIdsRanges.map(range => {
        const [start, end] = range.split('-').map(num => BigInt(num));
        return { start, end };
    });

    // Sort by start position
    intervals.sort((a, b) => a.start < b.start ? -1 : 1);
    // console.log(intervals)

    // Merge overlapping intervals
    const merged = [];
    let current = intervals[0];

    for (let i = 1; i < intervals.length; i++) {
        const next = intervals[i];

        // Check if intervals overlap or are adjacent
        if (next.start <= current.end + 1n) {
            // Merge intervals
            current.end = current.end > next.end ? current.end : next.end;
        } else {
            // No overlap, save current and move to next
            merged.push(current);
            current = next;
        }
    }
    merged.push(current);

    console.log(merged)

    // Calculate total count across all merged intervals
    let totalCount = 0n;
    for (const interval of merged) {
        totalCount += (interval.end - interval.start + 1n);
    }

    return totalCount;
}
console.log(partTwo())