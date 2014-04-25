$(document).ready(function(){
  loadCookiesCSS();
});




//Reference: http://www.quirksmode.org/js/cookies.html
function createCookie(name,value,days) {
	if (days) {
		//Get the current date.
		var date = new Date();

		//Set the Time of the date to this new value, so that it now contains the date in milliseconds that the cookie should expire.
		date.setTime(date.getTime()+(days*24*60*60*1000));

		//Set the variable expires to this date in the UTC/GMT format required by cookies.
		var expires = "; expires="+date.toGMTString();
	}

	//If 0 is passed to the function, expires is not set and the cookie expires when the user closes his browser
	else var expires = "";

	//Write the new cookie.
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	//search for the name of the cookie, followed by an =
	var nameEQ = name + "=";

	//Then split document.cookie on semicolons. cookies becomes an array containing all cookies that are set for this domain and path.
	var cookies = document.cookie.split(';');
	for(var i=0;i < cookies.length;i++) {
		var cookie = cookies[i];

		//Remove the first character while it is a space.
		while (cookie.charAt(0)===' ') cookie = cookie.substring(1,cookie.length);

		//We now only need to return the value of the cookie, which is the part of  var cookie that comes after nameEQ.
		if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length,cookie.length);
	}
	return null;
}



//Looks into the href attribute of element with id=user_style and create de cookie according the case.
function createCookieCSS(){
	var currentCSS = document.getElementById("user_style");
	if (currentCSS.getAttribute("href") === "css/style.css"){
		createCookie("style", "css/style.css",31);
	}
	else{
		createCookie("style", "css/style2.css",31);
	}
	
}


//Reads the cookie of the stylesheet.
function readCookieCSS(){
	var currentCSS = document.getElementById("user_style");
	var cookieCSS=readCookie("style");
	if ( cookieCSS !== null)
		currentCSS.setAttribute("href",cookieCSS);
}


//When the user select the option Style, switches styles.
function changeTheme(){
	var currentCSS = document.getElementById("user_style");
	if (currentCSS.getAttribute("href") === "css/style.css")
		currentCSS.setAttribute("href","css/style2.css");
	else{
		currentCSS.setAttribute("href","css/style.css");
	}
	createCookieCSS();
}


//Loads the currents cookies.
function loadCookiesCSS(){
	readCookieCSS();
}