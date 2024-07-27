var field = {
	cells: undefined,
	height: undefined,
	width: undefined,

	cellCount: undefined,
}

var setup = function()  {
    field.cells = document.querySelectorAll('td')
	field.height = document.querySelectorAll('tr').length
	field.cellCount = field.cells.length
	field.width = field.cellCount / field.height
}

field.cells.item().classList.add('green')


var some_text = "abcd"
console.log(some_text[1]) // -> b
for(var i=0; i < some_field.length; i++){
    console.log(some_field[i])
}