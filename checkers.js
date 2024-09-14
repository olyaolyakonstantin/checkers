

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

/*/ Example...
console.log(' ---> ', field)

var line = ''
for(var c of field){
	if(c != '\n'){
		line += c
	} else {
		console.log(' --> ', line)
		line = ''
	}
}
//*/



//
//	possibleMoves(<field>, <player>)
//		-> <moves>
//
// Formats
//	<field>
//
//	// BNF
//	<player> ::= 
//		// NOTE: <field-player-A>, <field-player-B> depend on 
//		//	how the field is defined.
//		<field-player-A> 
//		| <field-player-B>
//
//	<moves>
//
function possibleMoves(field, player){
	var wpos = [
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
	for(var v in field){
		//avoids the 'B' line-name
		if(v == 148){ 
			continue 
		}
		if(field[v] == 'B'){ 
			bpos.push(v)
		}
		if(field[v] == 'W'){
			wpos.push(v)
		}
	}
	// Possible simple steps fro W_player
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

	// Possible simple steps fro B_player
	for (v of bpos) {
		if((v-4) % 74 != 0 
				&& field[v-70] == ' '){
			bsteps++
		}
		if((v-32) % 74 != 0 
				&& field[v-78] == ' '){
			bsteps++
		}

		if(field[v-70] == 'W' 
				&& field[v-140] == ' '){
			bteps++
		}
		if(field[v-78] == 'W' 
				&& field[v-156] == ' '){
			bsteps++
		}
	}
	console.log('possible steps for B player: ', bsteps )
}




possibleMoves(field)




// vim:set ts=4 sw=4 :
