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
        H |    B  |    |          |    |       |  |    |   |
        E |       |    |        B |    |       |  |    |   |
        E |       |    |          |    | B     |  |    |   |
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

function fieldToArray(field){
	var field_array = []
	for(var i in field){
		if(field[i] == '|'){
			i++	
			if(field[i] == '\n'){
				continue
			}
			i++
			field_array.push(field[i])
		}
	}

	return field_array
}
 
function drawField(field_array){
	var tpl = `   +---+---+---+---+---+---+---+---+`
	var letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
]
	console.log('\n     1   2   3   4   5   6   7   8\n',)
	console.log() 
	for (var i in field_array){
		if(i%7 == 0){
			console.log(' | ', field_array[i], ' |', tpl, letter.shift())
		}
		console.log(' | ', field_array[i])
	}	
}
drawField(fieldToArray(field))
//console.log(fieldToArray(field))




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
