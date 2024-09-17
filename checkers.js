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
var field = `
            1   2   3   4   5   6   7   8
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
        H |    B  |    | B        |    | B     |  |    |   |
          +-------+----+----------+----+-------+--+----+---+
       `

// XXX BUG: adding cell at '-1'
// XXX BUG: returns 56 cells
function readCell(field, i, res, j){
	var content = ' '
	for(; i < field.length; i++){
		// exit conditions...
		if(field[i] == '\n'){
			return i - 1
		}
		if(field[i] == '|'){
			if(!(j in res)
					|| res[j] == ' '){
				res[j] = content
			}
			return i - 1
		}

		// read cell content...
		if(field[i] != ' '){
			content = field[i]
		}
	}
	return i
}
function readLine(field, i, res){
	var count = 0
	var len = 0
	for(; i < field.length; i++){
		if(field[i] == '\n'){
			len = count
			count = 0
			continue
		}
		if(field[i] == '+'){
			return i
		}
		if(field[i] == '|'){
			var j = res.length
			if(len > 0){
				j = j - len + count }
			i = readCell(field, i+1, res, j)
			count++
		}
	}
	return i
}
function readField(field, res=[]){
	for(var i=0; i < field.length; i++){
		if(field[i] == '|'){
			//i = readCell(field, i+1, res)
			i = readLine(field, i+1, res)
		}
	}
	return res
}

//console.log(readField(field))





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

//var player = 'B'
//console.log(`Moves for player ${ player }: ${
//	posiibleMoves2(field, player) }`)


//checks
//console.log(field[316+156] == ' ')

/*
function posiibleMoves(field){

		var  wpos = [
			82,
			90,
			98,
			106,
			152,
			168,
			246,
			316,
		]
		var bpos = []
		for (var v in field) {
			
			//avoids the B-line name
			// try to avoid all this vertic line 
			if (v == 148){
				continue
			}
			//finds the positions of all the checkers
			if (field[v] == 'B'){
				bpos.push(v)
			}
			if (field[v] == 'W'){
				wpos.push(v)
			}
		}
		// Possible steps for W_player
		var wsteps = 0
		var bsteps = 0
		for(v of wpos){
			//left border
			if((v-4) % 74 != 0 
					&& field[v+70] == ' '){
				wsteps++
			} 
			//right border
			if((v-32) % 74 != 0 
					&& field[v+78] == ' '){
				wsteps++ 
			}
			if(field[v-70] == 'B'
					&& field[v-140] == ' '){
				bteps++
			}
			if(field[v-78] == 'B'
					&& field[v-156] == ' '){
				bsteps++
			}
		}
		console.log('possible steps for W player: ', wsteps )
		
		// Possible steps for B_player
		for (v of bpos) {
			if ((v-4) % 74 != 0 && field[v-70] == ' '){
				bsteps++
			}
			if ((v-32) % 74 != 0 && field[v-78] == ' '){
				bsteps++
			}
			if (field[v-70] == 'W' && field[v-140] == ' '){
				bsteps++
			}
			if (field[v-78] == 'W' && field[v-156] == ' '){
			bsteps++
			}
		}
		console.log('possible steps for B player: ', bsteps)
} 
*/


// vim:set ts=4 sw=4 :
