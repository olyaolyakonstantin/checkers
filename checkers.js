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

function posiibleMoves2(field, player){ //can I give a 'W' character instead of "player" value?
  var checkerPositions = []
  var moves = 0
  var leftStep = 70
  var rightStep = 78
  var oppositePlayer = ''
  if(player == 'W'){
    oppositePlayer = 'B'
  }else{
    oppositePlayer = 'W'
    leftStep *= -1
    rightStep *= -1
  }
  for (var v in field) { //change v to position
    
      //modifies 'stroke' values in Array to number
      v *= 1
      
      //avoids the B-line name
      if (v == 148){ // try to avoid all this vertic line
        continue
      }
      
      //finds the positions of all player's checkers
      if (field[v] == player){
        checkerPositions.push(v)
      }
  }
  console.log(checkerPositions)
  
  
  //possible simple steps 
  for(v of checkerPositions){
    //left border
    if((v-4) % 74 != 0 
        && field[v+leftStep] == ' '){
      moves++
    } 
    
    //right border
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
  console.log(moves)
}  
var player = 'B'
posiibleMoves2(field, player)

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