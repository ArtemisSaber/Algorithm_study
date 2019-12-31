//Truly correct way to calculate fibonacci sequence

//var fibonacciArray = [[0],[1]]
const process = require("process")

var arrayAdd = (op1Array, op2Array) => {
	// Two arrays treated like a+b, to avoid precision loss due to double precision restriction
	var longOperator = op2Array
	var shortOperator = op1Array
	var resArray = []
	if (op1Array.length >= op2Array.length) {
		longOperator = op1Array
		shortOperator = op2Array
	}
	var len = shortOperator.length
	var carryFlag = 0
	for (i = 0; i < len; i++) {
		var intermidateRes = 0
		intermidateRes = shortOperator[i] + longOperator[i] + carryFlag
		carryFlag = 0
		if (intermidateRes >= 10) {
			carryFlag = 1
			intermidateRes = intermidateRes - 10
		}
		resArray.push(intermidateRes)
	}
	var carryLen = len
	while (carryFlag === 1) {
		if (longOperator[carryLen]) {
			resArray[carryLen] = longOperator[carryLen] + 1
			if (resArray[carryLen] >= 10) {
				carryFlag = 1
				resArray[carryLen] = resArray[carryLen] - 10
			} else {
				carryFlag = 0
			}
		} else {
			resArray[carryLen] = 1
			carryFlag = 0
		}
		carryLen++
	}
	while (longOperator[carryLen]) {
		resArray[carryLen] = longOperator[carryLen]
		carryLen++
	}
	return resArray
}

var calcFibonacci = index => {
	return new Promise((resolve, reject) => {
		console.time("FibonacciAsync")
		let fibonacciArray = [0n, 1n]
		let result = fibonacciAsync(index, fibonacciArray)
		result.then(res => {
			resolve(res)
			console.timeEnd("FibonacciAsync")
		})
		//resolve(result);
	})
}

var calcFibonacciSync = index => {
	return new Promise((resolve, reject) => {
		console.time("FibonacciSync")
		let fibonacciArray = [[0], [1]]
		let result = fibonacci(index, fibonacciArray)
		resolve(result)
		console.timeEnd("FibonacciSync")
	})
}

const fibonacciAsync = (index, array) => {
	return new Promise((resolve, reject) => {
		setImmediate(
			() => {
				if (array[index]) {
					resolve(array[index])
				} else {
					let next = array[array.length - 1]+array[array.length - 2]
					array.push(next)
					resolve(fibonacciAsync(index, array))
				}
			},
			index,
			array
		)
	})
}

var fibonacci = (index, array) => {
	if (index <= 1) {
		return array[index]
	}
	if (array[index]) {
		return array[index]
	}
	return (array[index] = arrayAdd(
		fibonacci(index - 1, array),
		fibonacci(index - 2, array)
	)) // Must use array add to avoid loss of precision
}

//console.log(arrayAdd([9,9,9,9],[1]))
var desiredIndex = process.argv[2]
if (process.argv[3] === "async") {
	console.log(`Calculating ${desiredIndex}th of fibonacci sequence`)
	calcFibonacci(desiredIndex)
		.then(res => {
			// let fibonacciNumber = []
			// fibonacciNumber = res.reverse()
			// let fibonacciNumberStr = ""
			// fibonacciNumber.forEach(num => {
			// 	fibonacciNumberStr += num.toString()
			// })
			console.log(
				`The ${desiredIndex}th of fibonacci sequence is ${res.toString()}`
			)
		})
		.catch(reason => {
			console.log(`Reject because of ${reason}`)
		})
} else {
	calcFibonacciSync(desiredIndex)
		.then(res => {
			let fibonacciNumber = []
			fibonacciNumber = res.reverse()
			let fibonacciNumberStr = ""
			fibonacciNumber.forEach(num => {
				fibonacciNumberStr += num.toString()
			})
			console.log(
				`The ${desiredIndex}th of fibonacci sequence is ${fibonacciNumberStr}`
			)
		})
		.catch(reason => {
			console.log(`Reject because of ${reason}`)
		})
}
