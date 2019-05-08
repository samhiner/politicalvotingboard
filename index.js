class person {
	constructor(politician) {
		this.area = 3;
		this.politician = politician;
	}

}

function setupAreas() {
	var colors = ['#163792', '#5176d3', '#84a9ff', '#A9A9A9', '#ff7d91', '#ff3655', '#d20000'];

	for (var x = 0; x < 7; x++) {
		document.getElementById('area' + x).style.backgroundColor = colors[x];
	}
}

var clickOn = false;

function startMovePerson(event) {
	div = event.srcElement
	div.style.position = 'fixed';
	div.style.zIndex = 2;
	clickOn = [div.id, event.clientX - div.offsetLeft, event.clientY - div.offsetTop + 10];
}

document.onmousemove = function() {
	if (clickOn !== false) {
		div = document.getElementById(clickOn[0]);
		div.style.left = String(event.clientX - clickOn[1]) + 'px';
		div.style.top = String(event.clientY - clickOn[2]) + 'px';
	}
}

function endMovePerson(event) {
	clickOn = false;
	event.srcElement.style.position = 'absolute';
	event.srcElement.style.zIndex = 1;
}

setupAreas();

//EVERYTHING BELOW THIS COMMENT IS INCOMPLETE

//incomplete function to let you do a variable number of areas
function changeAreas(numAreas) {
	var areasPerSide = areas.length() % 2 == 1 ? (areas.length() - 1) / 2 : areas.length() / 2;
	var blue = BLUECODE + getColor(areasPerSide);
	var red = REDCODE - getColor(areasPerSide);

	for (var x = 0; x < areas; x++) {
		//If area is 6, is 2.5 so 0, 1, 2 done by this; then 3, 4, 5 done by <.
		//If area is 7, is 3 so 0, 1, 2 done by this; 3 done by =; 4, 5, 6 done by <.
		if (x < (areas - 1) / 2) {
			areas[x].style.backgroundColor = blue;
			red = shadeChange(blue, 5);
		} else if (x == (areas - 1) / 2) {
			areas[x].style.backgroundColor = '#A9A9A9';
		} else {
			areas[x].style.backgroundColor = red;
			red = shadeChange(red, -5);
		}
	}
}

function shadeChange() {

}

/**
 * this returns a constant that makes your leftmost color ((areasPerSide + 1) / 2) * 5 x's
 * brighter than normal blue every area after this on the left is 5 x's darker, so the
 * middle of the left is normal blue (or normal blue is between the two colors closest to
 * middle color if areasPerSide is even)
 */
//putting a negative on this switches it from brighter to darker
function getColor(areasPerSide) {
	return ((areasPerSide - 1) / 2) * 5;
}