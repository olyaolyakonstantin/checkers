
// Smicolons
// ---------
//

// for counter loop...
for(var i=0; i < 5; i++){
	console.log('i:', i)
}



// If a line starts with an array literal or priority braces, put a 
// semicolon before it
var i = 5

;[1,2,3]
	.map(function(e){ 
		return e * 2 })

//
console.log(123)

;(1 + 2) * 4



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
