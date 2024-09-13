

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



var Wpos = [
	82, 
	90, 
	98, 
	106, 
	152, 
	168, 
	246, 
	316,
]
var Bpos = []
for(var v in field){
	//avoids the 'B' line-name
	if(v == 148){ 
		continue 
	}
	if(field[v] == 'B'){ 
		Bpos.push(v)
	}
	if(field[v] == 'W'){
		Wpos.push(v)
	}
}
// Possible simple steps fro W_player
var Wsteps = 0
var Bsteps = 0
for(v of Wpos){
	//left border
	if((v-4) % 74 != 0 
			&& field[v+70] == ' '){ 
		Wsteps++ 
	} 
	//right border
	if((v-32) % 74 != 0 
			&& field[v+78] == ' '){
		Wsteps++ 
	}

	if(field[v-70] == 'B' 
			&& field[v-140] == ' '){
		Bteps++
	}
	if(field[v-78] == 'B' 
			&& field[v-156] == ' '){
		Bsteps++
	}
}
console.log('possible steps for W player: ', Wsteps )

// Possible simple steps fro B_player
for (v of Bpos) {
	if((v-4) % 74 != 0 
			&& field[v-70] == ' '){
		Bsteps++
	}

	if((v-32) % 74 != 0 
			&& field[v-78] == ' '){
		Bsteps++
	}
	if(field[v-70] == 'W' 
			&& field[v-140] == ' '){
		Bteps++
	}

	// in some cases we can use logical operations instead of if statements...
	field[v-78] == 'W' 
		&& field[v-156] == ' '
		&& Bsteps++

}
console.log('possible steps for B player: ', Bsteps )



