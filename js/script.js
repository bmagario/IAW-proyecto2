$(document).ready(function(){
  navbarTwitter();
  botonesFocus();
  randomValues();
  deleteAllValues();
  expandirGrupos();
  contraerGrupos();
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


/*
* Para cada Grupo podemos hacer focus al clickear en el respectivo boton.
* Se utiliza scrollTop y se calcula el offset para posicionarse en el grupo correcto.
*
*/
function botonesFocus(){
  var ids = ["grupoA","grupoB","grupoC","grupoD","grupoE","grupoF","grupoG","grupoH","PlayOff"];
  $(".grupo").each(function(index, val) {
      $(this).click(function(event) {
      	 var element = $("#"+ids[index]).find(".group-title");
         expandir(element);
         $(window).scrollTop($("#"+ids[index]).offset().top);
         
      });
    });
}

/*
* 
*/
function randomValues(){

	$("#cargar_aleatorio").click(function(event) {
		cargarInputsAleatorio();
	});
}


/*
* Para cada input se genera un valor aleatorio entre 0-7
* Se almacena el valor en localstorage.
* Se analiza el dato ingresado.
*/
function cargarInputsAleatorio(){
	deleteValues();
    $("input.grupos_i").each(function(index, val) {
    	var number;
        var fd1 = $(this).attr("id");

     	number = Math.floor(Math.random() * 9);
     	$('#'+fd1).val(number);
      	localStorage.setItem(fd1, number);
      	analizarDatos(fd1,number);
    });
    $("input.octavos").each(function(index, val) {
      var number;
        var fd1 = $(this).attr("id");

     	number = Math.floor(Math.random() * 7);
     	$('#'+fd1).val(number);
      	localStorage.setItem(fd1, number);
      	analizarDatos(fd1,number);
    });
    $("input.cuartos").each(function(index, val) {
      var number;
        var fd1 = $(this).attr("id");

     	number = Math.floor(Math.random() * 7);
     	$('#'+fd1).val(number);
      	localStorage.setItem(fd1, number);
      	analizarDatos(fd1,number);
    });
    $("input.semis").each(function(index, val) {
      var number;
        var fd1 = $(this).attr("id");

     	number = Math.floor(Math.random() * 7);
     	$('#'+fd1).val(number);
      	localStorage.setItem(fd1, number);
      	analizarDatos(fd1,number);        
    });
    $("input.final").each(function(index, val) {
        var number;
        var fd1 = $(this).attr("id");

     	number = Math.floor(Math.random() * 7);
     	$('#'+fd1).val(number);
      	localStorage.setItem(fd1, number);
      	analizarDatos(fd1,number);
        
    }); 

     $("input").each(function(index, val) {  
      if($(this).hasClass("grupos_i"))
          $(this).prop('disabled', true);
     });

}

/*
*
*/
function deleteAllValues(){

	$("#delete_fields").click(function(event) {
		deleteValues();
	});
}

/*
* Simplemente se borran todos los valores y se resetea el localstorage.
* Se analizan los datos para inhabilitar campos.
*/
function deleteValues () {
	var number;
	$("input").each(function(index, val)
     {
     	var fd1 = $(this).attr("id");

     	$('#'+fd1).val("");
      	localStorage.setItem(fd1, "");
      	analizarDatos(fd1,"");        
    });  
  	resetearTablas();
  	resetearPlayoff();

    
    $("input").each(function(index, val) {
        if($(this).hasClass("grupos_i"))
          $(this).prop('disabled', false);
     });

}

/*
* Se expanden (slideDown) todos los grupos.
*/
function expandirGrupos(){
	$("#expandir_groups").click(function(event) {
		$('.group-title').each(function(index, val){
       		var element = $(this);
      		 expandir(element);
    	});		
	});
}

/*
*
*/
function expandir(element){
	if(element.hasClass('fa-chevron-down')){
	    element.removeClass('fa-chevron-down');
	    element.addClass('fa-chevron-up');
	    element.parent().parent().siblings().slideDown("slow");
     }
}

/*
* Se contraen (slideUp) todos los grupos.
*/
function contraerGrupos(){
	$("#contraer_groups").click(function(event) {
		$('.group-title').each(function(index, val){
	       var element = $(this);
			contraer(element);
		});
	});
}

/*
*
*/
function contraer(element){
  if(element.hasClass('fa-chevron-up')){
    element.removeClass('fa-chevron-up');
    element.addClass('fa-chevron-down');
    element.parent().parent().siblings().slideUp("slow");
  }
}

/*
* Cada valor de cada tabla es seteado a 0.
*/
function resetearTablas(){
	for(var i=0;i<8;i++){
		$("#table"+i+" tbody tr").children('td').each(function(index){
			if(index !== 0 && index !== 1 && index !== 9 && index !== 10 &&
				index !== 18 && index !== 19 && index !== 27 && index !== 28)
		    {
			    var element = $(this);
			    element.text(0);		      
		    }
		});
	}
}

/*
* Funcion que muestra la caja de dialogo con los datos de los autores.
*/
function contact()
{
	$(function() {
		$("#dialogo").dialog({ resizable: false });	
	});
}

function resetearPlayoff()
{
  for(var i=1;i<=30;i++)
  {
    var element = $("#Partido"+i);
    element.text("Equipo ?");
    
    var image = $("#Imagen"+i);
    image.attr("src", "images/flags/fx.png");
    
  }

  for(var j = 1; j<=8; j++)
  {
    localStorage.setItem("Octavos1"+j, "");
    localStorage.setItem("Octavos2"+j, "");
    localStorage.setItem("Cuartos1"+j, "");
  }

 for(var x = 1; x<=4; x++)
 {
    localStorage.setItem("Semi"+x, "");
 }

  localStorage.setItem("Final1", "");
  localStorage.setItem("Final2", "");
}