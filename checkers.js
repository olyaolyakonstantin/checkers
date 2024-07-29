

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


