function changeAreas(areas) {

	var areasPerSide = areas % 2 == 1 ? (areas - 1) / 2 : areas / 2 

	blue = BLUECODE + getColor(areasPerSide);

	for (var x = 0; x < areas; x++) {
		//If area is 6, is 2.5 so 0, 1, 2 done by this; then 3, 4, 5 done by <.
		//If area is 7, is 3 so 0, 1, 2 done by this; 3 done by =; 4, 5, 6 done by <.
		if (x < (areas - 1) / 2) {
			areas[x] = blue;
			blue = blue + 5;
		}
	}
}

//this returns a constant that makes your leftmost color -(areasPerSide / 2) * 5) x's darker than normal blue
//every area after this on the left is 5 x's brighter, so the middle of the left is normal blue 
//(or normal blue is between the two colors closest to middle color if areasPerSide is even)
function getColor(areasPerSide) {
	return -(areasPerSide / 2) * 5;
}