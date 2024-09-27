//
// This field format is simple to print and understand on screen but is 
// very complicated to work with in code, the usual ways to work with 
// such structues are:
// 	- parse it into a more convinient form (XXX task 1) 
// 		Example form:
// 			field_array = [
// 				   , 'W',    , 'W',    , 'W',    , 'W',
// 				'W',    ,    ,    , 'W',    ,    ,    ,
// 				...
// 			]
// 		NOTE: this will also require us to generate the original from 
// 			the above (XXX task 2)
// 	- add a translation layer to/from the original form (XXX task 3)
// 		as an example this could be a list of cell indexes in field string
//
//
// Tasks:
// 	1) parse field to field_array
// 		parseField(<field>)
// 			-> <field-array>
// 	2) generate field from field_array
// 	3) parse field to a list of cell indexes
//
//


// Recursive descent parser example...
//
var field = `
            1       2    3            4   5      6   7  8
          +-------+----+----------+----+-------+--+----+---+
          |       |  W |          |    |       |  |    |  W|
        A |       |    |          | W  |       |W |    |   |
          +-------+----+----------+----+-------+--+----+---+
        B |    W  |    |          |    | W     |  |    |   |
          +-------+----+----------+----+-------+--+----+---+
        C |       |    |          |    |       |W |    |   |
          +-------+----+----------+----+-------+--+----+---+
        D |       |    |          |    | W     |  |    |   |
          +-------+----+----------+----+-------+--+----+---+               
        E |       |    |          |    |       |B |    |   |
          +-------+----+----------+----+-------+--+----+---+
        F |    B  |    |          |    |       |  |    |   |
          +-------+----+----------+----+-------+--+----+---+
        G |       |  B |          |    |       |B |    |  B|
          +-------+----+----------+----+-------+--+----+---+
          |    B  |    |          |    |       |  |    |   |
          |       |    |        B |    |       |  |    |   |
        h |       |    |          |    | B     |  |    |   |
          +-------+----+----------+----+-------+--+----+---+
       `

function readCell(field, i, res, j){
	var content = res[j] ?? ' '
	for(; i < field.length; i++){
		// end of line or horizontal border -> exit...
		if(field[i] == '\n' 
				|| field[i] == '+'){
			return i - 1 }
		// cell end -> exit...
		if(field[i] == '|'){
			res[j] = content 
			return i - 1 }
		// read cell content...
		if(field[i] != ' '){
			content = field[i] } }
	return i }

function readRow(field, i, res){
	var row = []
	var j = 0
	for(; i < field.length; i++){
		// possible multiline row -> read next line into row...
		if(field[i] == '\n'){
			j = 0
			continue }
		// horizontal border -> row is done...
		if(field[i] == '+'){
			break }
		// cell...
		if(field[i] == '|'){
			i = readCell(field, i+1, row, j) 
			j++ } }
	// add row to result...
	res.splice(res.length, 0, ...row)
	//res.push(row)
	return i }

function readField(field, res=[]){
	for(var i=0; i < field.length; i++){
		// row...
		if(field[i] == '|'){
			i = readRow(field, i, res) } }
	return res }

/*
var p = readField(field)
console.log('===', p.length, p)
process.exit()
//*/



var field = `
            1   2   3   4   5   6   7   8
          +---+---+---+---+---+---+---+---+
        A |   | W |   | W |   | W |   | W |
          +---+---+---+---+---+---+---+---+
        B | W |   |   |   | W |   |   |   |
          +---+---+---+---+---+---+---+---+
        C |   |   |   |   |   | W |   |   |
          +---+---+---+---+---+---+---+---+
        D |   |   |   |   | W |   |   |   |
          +---+---+---+---+---+---+---+---+
        E |   |   |   |   |   | B |   |   |
          +---+---+---+---+---+---+---+---+
        F | B |   |   |   |   |   |   |   |
          +---+---+---+---+---+---+---+---+
        G |   | B |   |   |   | B |   | B |
          +---+---+---+---+---+---+---+---+
        H | B |   | B |   | B |   |   |   |
          +---+---+---+---+---+---+---+---+
       `

// Losing vs. retaining information about the input...
//
// this parse result lost information about field topology...
a = [
	'a', 'b', 'c',
	'x', 'y', 'z',
]
//
// we can now infer topology data from structure...
b = [
	['a', 'b', 'c'],
	['x', 'y', 'z'],
]
//
// we explicitly include topology data...
c = {
	width: 3,
	cells: [
		'a', 'b', 'c',
		'x', 'y', 'z',
	],
}


function readCell2(field, i, res){
	var content = ' '
	for(; i < field.length; i++){
		
		if(field[i] == '\n'
				|| field[i] == '+'){
			res.width++
			return i-1
		}
		// NOTE: this is done prior to content handling to avoid 
		// 		overwriting of content...
		if(field[i] == '|'){
			res.cells.push(content)
			return i-1
		}
		// cell content...
		if(field[i] != ' '){
			content = field[i]
		}
	}
	return i
}
function readField2(field, res={}){
	res = { width: 0, cells: [] }
	for(var i=0; i < field.length; i++){
		if(field[i] == '|'){
			i = readCell2(field, i+1, res)
		}
	}
	return res 
}


function field2str(fieldArray){
	var field = []

	var numbers = Array.from(
		{ length: fieldArray.width },
		function(_, i){
			return i + 1 
		})
	field.push(`     ${ numbers.join('   ') } `)

	var line = `   +${ 
		(new Array(fieldArray.width))
			.fill('---')
			.join('+') 
	}+`
	field.push(line)

	var l = 65
	var w = fieldArray.width
	for(var i=0; i < w; i++){
		var row = 
			fieldArray.cells
				.slice(i*w, i*w + w)
		field.push(` ${ String.fromCharCode(l++) } | ${ row.join(' | ') } |`)		
		row = []

		field.push(line)
	}

	return field
		.join('\n')
}

var fieldArray = readField2(field)
//console.log(field2str(fieldArray))
console.log(fieldArray)

function possibleMoves(f){
	var wsteps = 0 
	var bsteps = 0
	for(var i=0; i < f.cells.length; i++){
		if(f.cells[i] == 'W'){
			if(i%f.width != 0){
				if(f.cells[i-1+f.width] == ' '){
					wsteps++
				}
				if(f.cells[i-1+f.width] == 'B'
						&& f.cells[i-2+f.width*2] == ' '){
					wsteps++
				}
			}
			if((i+1)%f.width != 0){
				if(f.cells[i+1+f.width] == ' '){
					wsteps++
				}
				if(f.cells[i+1+f.width] == 'B'
						&& f.cells[i+2+f.width*2] == ' '){
					wsteps++
				}
			}
		}	 
		if(f.cells[i] == 'B'){
			if(f.cells[(i-1)-f.width] == ' ' 
					&& i%f.width != 0){
				bsteps++ 
			}
			if(f.cells[(i+1)-f.width] == ' '
					&& (i+1)%f.width != 0){
				bsteps++
			}
		}
	}
	return {
		W: wsteps, 
		B: bsteps,
	}
}
console.log(possibleMoves(fieldArray))

// XXX using the above structure:
// 		- get a list of possible moves (incl. attacks)
// 		- get a list of attacks
// 		- attacks can be chained
// 		- sort moves/attacks by value (single turn value)
// 		- bonus: think/do the above for 2 or N steps (one player)...
//




// XXX this should return the value and lreave the printing to external code...y
function posiibleMoves2(field, player){ 
	var checkerPositions = []
	var moves = 0
	var leftStep = 70
	var rightStep = 78
	var oppositePlayer = ''

	if(player == 'W'){
		oppositePlayer = 'B'
	} else {
		oppositePlayer = 'W'
		leftStep *= -1
		rightStep *= -1
	}

	// build checkerPositions...
	//
	// format:
	// 	[ <player-piece-index>, ... ]
	//
	for(var i in field) { 
		// NOTE: we need to convert index to number -- for iterates attr 
		// 		names and not indexes...
		i *= 1
		// avoids the B-line name
		// XXX try to avoid all this vertic line
		if(i == 148){ 
			continue
		}
		if (field[i] == player){
			checkerPositions.push(i)
		}
	}
	
	//possible simple steps 
	for(var v of checkerPositions){
		// left border
		if((v-4) % 74 != 0 
				&& field[v+leftStep] == ' '){
			moves++
		} 
		
		// right border
		if((v-32) % 74 != 0 
				&& field[v+rightStep] == ' '){
			moves++ 
		}
		
		if(field[v+leftStep] == oppositePlayer
				&& field[v+leftStep*2] == ' '){
			moves++
		}
		if(field[v+rightStep] == oppositePlayer
				&& field[v+rightStep*2] == ' '){
			moves++
		}
	}

	return moves
}  



// vim:set ts=4 sw=4 :
