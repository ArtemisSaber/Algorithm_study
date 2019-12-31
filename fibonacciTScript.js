const calcFibonacci = (index) => {
    return new Promise((resolve, reject) => {
        console.time("FibonacciAsync");
        let fibonacciArray = [0n, 1n];
        let result = fibonacciAsync(index, fibonacciArray);
        result.then(res => {
            resolve(res);
            console.timeEnd("FibonacciAsync");
        });
    });
};
const fibonacciAsync = (index, array) => {
    return new Promise((resolve, reject) => {
        setImmediate(() => {
            if (array[index]) {
                resolve(array[index]);
            }
            else {
                let next = array[array.length - 1] + array[array.length - 2];
                array.push(next);
                resolve(fibonacciAsync(index, array));
            }
        }, index, array);
    });
};
const desiredIndex = parseInt(process.argv[2]);
var numericTrailing = `th`;
if (desiredIndex % 10 === 1) {
    numericTrailing = `st`;
}
else if (desiredIndex % 10 === 2) {
    numericTrailing = `nd`;
}
else if (desiredIndex % 10 === 3) {
    numericTrailing = `rd`;
}
const startString = `Calculating ${desiredIndex}${numericTrailing} of fibonacci sequence`;
var endString = `The ${desiredIndex}${numericTrailing} of fibonacci sequence is `;
console.log(startString);
calcFibonacci(desiredIndex).then(res => {
    console.log(`${endString}${res.toString()}`);
});
