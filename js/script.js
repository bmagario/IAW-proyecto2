$(document).ready(function(){
  navbarTwitter();
});

/*
* Se activa la clase "active" en la barra de navegacion
* en el elemento correspondiente.
*/
function navbarTwitter()
{
	$("#my-navbar > li > a").click(function(event) {
		if (!$(this).hasClass("active")) {
		   // Remove the class from anything that is active
		   $("#my-navbar > li > a.active").removeClass("active");
		   // And make this active
		   $(this).addClass("active");
		}
	});	
}


