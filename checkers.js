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

// XXX this should return the value and lreave the printing to external code...
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

var player = 'B'
console.log(`Moves for player ${ player }: ${
	posiibleMoves2(field, player) }`)


//checks
//console.log((90-4) % 74!= 0)
//console.log(field[90+70] == ' ')
//console.log((82-32) % 74!= 0)
//console.log(field[316+78] == 'B')
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
