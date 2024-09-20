
// Smicolons
// ---------
//

// for counter loop...
for(var i=0; i < 5; i++){
	console.log('i:', i)
}



// If a line starts with an array literal, priority braces or backquote, 
// put a semicolon before it
var i = 5

// array...
;[1,2,3]
	.map(function(e){ 
		return e * 2 })

// priority braces...
console.log(123)

;(1 + 2) * 4


// backquote...
;` this is a template string `


// Null values
// -----------

// Undefined value
// - used to represent empty or undefined values
//
// NOTE: do not use undefined to check if an array position is empty, 
// 		use the i in L operation
undefined

// Not a Number
// - NaN is a number
// - returned if an arethmetic peration failes
// - NaN is not equal to anything (incl. itself)
//
// NOTE: to check of a value is NaN us function isNaN(value)
NaN

// Null
//  - a basic null value to be used manually
null



// FUnctions
// ---------
//

function add(a, b){
	return a + b
}

var add = function(a, b){
	return a + b
}

// Arrwo function
// XXX we will NEVER use these!
// 		...because "the same but slightly different"
var add = (a, b) => a + b





// vim:set ts=4 sw=4 :
