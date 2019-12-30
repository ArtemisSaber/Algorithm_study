//Truly correct way to calculate fibonacci sequence

var fibonacciArray = [[0],[1]]

var arrayAdd = (op1Array,op2Array) =>{  // Two arrays treated like a+b, to avoid precision loss due to 32bit integer
    var longOperator = op2Array
    var shortOperator = op1Array
    var resArray = []
    if(op1Array.length >= op2Array.length){
        longOperator = op1Array
        shortOperator = op2Array
    }
    var len = shortOperator.length
    var carryFlag = 0
    for( i = 0; i< len; i++){
        var intermidateRes = 0
        intermidateRes = shortOperator[i]+longOperator[i]+carryFlag
        carryFlag = 0
        if(intermidateRes >= 10){
            carryFlag = 1
            intermidateRes = intermidateRes - 10
        }
        resArray.push(intermidateRes)
    }
    var carryLen = len
    while(carryFlag === 1){
        if(longOperator[carryLen]){
            resArray[carryLen] = longOperator[carryLen]+1
            if(resArray[carryLen] >= 10){
                carryFlag = 1
                resArray[carryLen] = resArray[carryLen] - 10
            }else{
                carryFlag = 0
            }
        }
        else{
            resArray[carryLen] = 1
            carryFlag = 0
        }
        carryLen ++
    }
    while(longOperator[carryLen]){
        resArray[carryLen] = longOperator[carryLen]
        carryLen ++
    }
    return resArray
}


var fibonacci = (index,array)=>{

    if(index <= 1){
        return array[index]
    }
    if(array[index]){
        return array[index]
    }
    return array[index] = arrayAdd(fibonacci(index-1,array),fibonacci(index-2,array)) // Must use array add to avoid loss of precision
}


//console.log(arrayAdd([9,9,9,9],[1]))
var fibonacciNumber = fibonacci(300,fibonacciArray).reverse()
var fibonacciNumberStr = ""
fibonacciNumber.forEach(num=>{
    fibonacciNumberStr+=num.toString()
})
console.log(fibonacciNumberStr)