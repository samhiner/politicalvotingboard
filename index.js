//TODO actually make person widgets a class
//TODO make mouseup a document function so that it gets caught when you are moving fast and you mouseup before the widget catches up with you
//TODO make it so that widgets collide better
//TODO make Person.area update with dragging; will require connecting widget to class better; or maybe keep a count of each area instead [far-right: 3, right: 2, etc]

class Person {

	constructor(name, area, party) {
		this.name = name;
		this.party = party;
		this.widget = document.createElement('span');
		this.widget.id = String(this.constructor.people.length);
		this.widget.className = 'person';
		this.widget.onmousedown = startMovePerson;
		this.widget.onmouseup = endMovePerson;
		this.widget.appendChild(document.createTextNode(name));
		document.getElementById('board').appendChild(this.widget);
		this.moveTo(area)

		this.widget.style.top = '101px';
	}

	moveTo(area) {
		this.area = area;
		//size of an area * (areasOnLeft + 0.1). so we are doing what area it is on and 0.1 for margin then scaling it to screen
		this.widget.style.left = (document.documentElement.clientWidth / 7) * (area  + 0.1) + "px";
	}

	static alongPartyLines() {
		for x
	}
}

Person.people = [];

var a = new Person('a', 1);
var b = new Person('a', 1);
var c = new Person('a', 2);
var d = new Person('a', 3);
var e = new Person('a', 4);


e.moveTo(2);


function setupAreas() {
	var colors = ['#163792', '#5176d3', '#84a9ff', '#b4b4b4', '#ff7d91', '#ff3655', '#d20000'];

	for (var x = 0; x < 7; x++) {
		document.getElementById('area' + x).style.backgroundColor = colors[x];
	}
}

var clickOn = false;

function startMovePerson(event) {
	div = event.srcElement;
	div.style.zIndex = 2;
	clickOn = [div.id, event.clientX - div.offsetLeft, event.clientY - div.offsetTop + 10];
}

function pxToNum(px) {
	return Number(px.slice(0, -2))
}

document.onmousemove = function() {
	if (clickOn !== false) {
		div = document.getElementById(clickOn[0]);
		div.style.left = String(event.clientX - clickOn[1]) + 'px';
		div.style.top = String(event.clientY - clickOn[2]) + 'px';

		if (pxToNum(div.style.top) <= 100) {
			div.style.top = '101px'; //this way it doesn't get stuck barely able to move out of 100px bc the drag would keep ending
			endMovePerson(div);
		} else if (pxToNum(div.style.top) + 30 >= document.documentElement.clientHeight) {
			div.style.top = 'auto';
			div.style.bottom = '0px';
			endMovePerson(div);
		}

		if (pxToNum(div.style.left) <= 0) {
			div.style.left = '0px'; //this way it doesn't get stuck barely able to move out of 100px bc the drag would keep ending
			endMovePerson(div);
		} else if (pxToNum(div.style.left) + document.documentElement.clientWidth / 7 * 0.8 >= document.documentElement.clientWidth) {
			div.style.left = 'auto';
			div.style.right = '0px';
			endMovePerson(div);
		}
	}
}

function endMovePerson(event) {
	//TODO make this less messy
	if (event.srcElement !== undefined) {
		//for when this func is called by mouseup on specific widget
		//this is a band aid that will need to be replaced soon
		var div = event.srcElement;
	} else {
		var div = event
	}
	clickOn = false;
	div.style.position = 'absolute';
	div.style.zIndex = 1;
	var screenWidth = document.documentElement.clientWidth;
	var personLeft = div.offsetLeft + (screenWidth / 7 * 0.8 / 2);
	var areaMargin;
	for (var x = 0; x < 7; x++) {
		if (screenWidth * x / 7 <= personLeft && personLeft < screenWidth * (x + 1) / 7) {
			areaMargin = 1/7 * screenWidth / 10; //the margin is just 1/10 of the area size bc widgets are 80% of the area
			div.style.left = screenWidth * x / 7 + areaMargin + 'px';
		}
	}
}

setupAreas();


/* This is all incomplete code to allow for a variable number of areas. Not sure if I'll finish it.


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

/ **
 * this returns a constant that makes your leftmost color ((areasPerSide + 1) / 2) * 5 x's
 * brighter than normal blue every area after this on the left is 5 x's darker, so the
 * middle of the left is normal blue (or normal blue is between the two colors closest to
 * middle color if areasPerSide is even)
 * /
//putting a negative on this switches it from brighter to darker
function getColor(areasPerSide) {
	return ((areasPerSide - 1) / 2) * 5;
}*/