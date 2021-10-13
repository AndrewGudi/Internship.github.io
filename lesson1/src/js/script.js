function openItem(evt, item) {
	var i, maincontent, tablinks;

	maincontent = document.getElementsByClassName("main-content");
	for (i = 0; i < maincontent.length; i++) {
		maincontent[i].style.display = "none";
	}

	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	document.getElementById(item).style.display = "block";
	evt.currentTarget.className += " active";
}