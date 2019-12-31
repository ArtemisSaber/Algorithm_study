const calcFibonacci = (index: number) => {
	return new Promise<bigint>((resolve, reject) => {
		console.time("FibonacciAsync")
		let fibonacciArray: Array<bigint> = [0n, 1n]
		let result = fibonacciAsync(index, fibonacciArray)
		result.then(res => {
			resolve(res)
			console.timeEnd("FibonacciAsync")
		})
	})
}

const fibonacciAsync = (index: number, array: Array<bigint>) => {
	return new Promise<bigint>((resolve, reject) => {
		setImmediate(
			() => {
				if (array[index]) {
					resolve(array[index])
				} else {
					let next: bigint =
						array[array.length - 1] + array[array.length - 2]
					array.push(next)
					resolve(fibonacciAsync(index, array))
				}
			},
			index,
			array
		)
	})
}

const desiredIndex: number = parseInt(process.argv[2])
var numericTrailing: string = `th`
if (desiredIndex % 10 === 1) {
	numericTrailing = `st`
} else if (desiredIndex % 10 === 2) {
	numericTrailing = `nd`
} else if (desiredIndex % 10 === 3) {
	numericTrailing = `rd`
}
const startString: string = `Calculating ${desiredIndex}${numericTrailing} of fibonacci sequence`
var endString: string = `The ${desiredIndex}${numericTrailing} of fibonacci sequence is `
console.log(startString)
calcFibonacci(desiredIndex).then(res => {
	console.log(`${endString}${res.toString()}`)
})
