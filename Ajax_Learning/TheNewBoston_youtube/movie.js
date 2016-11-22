function createList(){
	var s; /* string */
	s = "<ul>" /* unordered list */
		+ "<li> Avatar </li>"
		+ "<li> Kill Bill </li>"
		+ "<li> Norbit </li>"
		+ "<li> Zoro </li>"
		+ "</ul>";
	divMovies = document.getElementById("divMovies"); /* document = body of the webpage */
	divMovies.innerHTML = s;
}