var grupos_json;
var playoffs_json;
var participantes_json;

$(document).ready(function(){
  load_DOCS();
});


function load_playoffs(){
   playoffs_json = playoffs.playoff;
}

function load_DOCS(){
  buildGroups();
  load_playoffs();
  buildPlayoffs();
}

function buildGroups(){
    analizarInputs();
  cargarInputs(); 
  sortTablePositions();
  slideToggleGroups();
  coatsZoom();
  description();
  myTableSorterWidget();
  botonesFocus();
  randomValues();
  deleteAllValues();
  expandirGrupos();
  contraerGrupos();
}

var divCuartos1, divCuartos2;
var divOctavos1, divOctavos2;
var divSemi1, divSemi2;
var linksOctavos1, linksOctavos2; 
var linksCuartos1, linksCuartos2;
var linksSemi1, linksSemi2;
var linksFinal;
var divFinal;

function buildPlayoffs()
{
  divOctavos1 = document.getElementById('octavos1');
  linksOctavos1 = playoffs_json.octavos1;
  generarCuadrado(divOctavos1, linksOctavos1);
  divOctavos2 = document.getElementById('octavos2');
  linksOctavos2 = playoffs_json.octavos2;
  generarCuadrado(divOctavos2, linksOctavos2);
  divCuartos1 = document.getElementById('cuartos1');
  linksCuartos1 = playoffs_json.cuartos1;
  generarCuadrado(divCuartos1, linksCuartos1);
  divCuartos2 = document.getElementById('cuartos2');
  linksCuartos2 = playoffs_json.cuartos2;
  generarCuadrado(divCuartos2, linksCuartos2);
  divSemi1 = document.getElementById('semi1');
  linksSemi1 = playoffs_json.semi1;
  generarCuadrado(divSemi1, linksSemi1);
  divSemi2 = document.getElementById('semi2');
  linksSemi2 = playoffs_json.semi2;
  generarCuadrado(divSemi2, linksSemi2);   

  divFinal = document.getElementById('final');
  linksFinal = playoffs_json.final;
  generarCuadrado(divFinal, linksFinal); 
}


function generarCuadrado(variable1, variable2)
{
    for (var i = 0; i < variable2.length; i++) 
    {  
      var cont = 0;
      var datei  = variable2[i].date;
      var placei = variable2[i].place;
      var stringi="";

      if((variable1 === divCuartos1 || variable1 === divCuartos2) && i === 0){cont = 1;}
      else if((variable1 === divCuartos1 || variable1 === divCuartos2) && i === 1) {cont = 2;}
      else if (variable1 === divSemi1 || variable1 === divSemi2) {cont = 3;}      

      stringi += '<div class="estiloPartidoNo'+cont+'"></div>';

      if(variable1 !== divFinal){stringi +='<div class="estiloPartido ancho-play">';}
      else  {stringi+='<div class="estiloPartido2">';}

      stringi +='<span class="fecha">'+datei+'<br>'+placei+'</span><br>';

      if(variable1 === divFinal)
      {
        stringi +='<div class="row">';
        stringi +='<div class="col-md-3"> <img class="imagen100" id="Imagen29" src="images/flags/fx.png"></div>';
        stringi +='<div class="col-md-3"> <input id="29" class="form-control final" type="text" disabled></div>';
        stringi +='<div class="col-md-3"> <input id="30" class="form-control final" type="text" disabled></div>';
        stringi +='<div class="col-md-3"> <img class="imagen100" id="Imagen30" src="images/flags/fx.png"></div>';
        stringi +='</div>';

        stringi+='<br   class="brStyleClear">';
        stringi+='<div  class="floatLeftDiv"> <span class="claseSpan"><strong> <div id="Partido29"> Equipo ? </div></strong></span></div>';
        stringi+='<div  class="floatRightDiv"> <span class="claseSpan"><strong> <div id="Partido30"> Equipo ? </div></strong></span></div>';

      }      

      var numero;
      var texto = "disabled";
      var clase;
      if(variable1 !== divFinal)
      {          
          if(variable1===divOctavos1)  { numero = 1; texto = "";clase = "octavos"; }
          if(variable1===divOctavos2)  { numero = 9; texto = "";clase = "octavos"; }
          if(variable1===divCuartos1){ numero = 17; clase = "cuartos";}
          if(variable1===divCuartos2) {numero = 21;   clase = "cuartos";}       
          if(variable1===divSemi1) {numero = 25;clase = "semis";}
          if(variable1===divSemi2) {numero = 27;clase = "semis";}

          var j = i+i+numero;
          var h = j+1;          

          stringi +='<br class="brStyleClear">'; 
          stringi +='<div class="row">';
          stringi +='<div class="col-md-6"><img class="imagen100" id="Imagen'+j+'" src="images/flags/fx.png"></div>';
          stringi +='<div class="col-md-6"><img class="imagen100" id="Imagen'+h+'" src="images/flags/fx.png"></div>';
          stringi +='</div>';  

          stringi +='<br class="brStyleClear">';
          stringi +='<div class="row">'; 
          stringi +='<div class="col-md-6"><span class="claseSpan"><strong> <div id="Partido'+j+'"> Equipo ? </div> </strong></span></div>'; 
          stringi +='<div class="col-md-6"><span class="claseSpan"><strong> <div id="Partido'+h+'"> Equipo ? </div> </strong></span></div>';
          stringi +='</div>';            

          stringi +='<br class="brStyleClear">'; 
          stringi +='<div class="row">';  
          stringi +='<div class="col-md-6"> <input id="'+j+'" class="form-control '+clase+'" type="text"'+texto+'></div>';
          stringi +='<div class="col-md-6"> <input id="'+h+'" class="form-control '+clase+'" type="text"'+texto+'></div>';  
          stringi +='</div>';
      }

      stringi +='</div>';   

      variable1.innerHTML += stringi; 
    }         
}

function sortTablePositions(){

  for(var i=0;i<8;i++){
    var table = "#table"+i;
    $(table).tablesorter({
      widgets:["indexFirstColumn"],
      sortList: [[8, 1],[2, 1],[6, 1],[7, 1],[3, 1],[4, 1],[5, 1],[0, 0],[1, 0]],
      headers :{
        0: {sorter: false},
        1: {sorter: false},
        2: {sorter: false},
        3: {sorter: false},
        4: {sorter: false},
        5: {sorter: false},
        6: {sorter: false},
        7: {sorter: false},
        8: {sorter: false}
      }
    });
  }
}

function actualizarSorter(tabla) {
    //Una vez que realice la modificacion debo indicar que me ordene por puntaje
    $(tabla).trigger("update");
    $(tabla).trigger("appendCache");

    //Dado que la tabla se modifico, es como si volviera a agregar el sorter
    $(tabla).tablesorter({
      widgets:["indexFirstColumn"],
      sortList: [[8, 1],[2, 1],[6, 1],[7, 1],[3, 1],[4, 1],[5, 1], [0, 0],[1, 0]],
      headers :{
        0: {sorter: false},
        1: {sorter: false},
        2: {sorter: false},
        3: {sorter: false},
        4: {sorter: false},
        5: {sorter: false},
        6: {sorter: false},
        7: {sorter: false},
        8: {sorter: false}
      }
    });
}

function slideToggleGroups(){
    $('.group-title').click(function(){
       var element = $(this);
      if(element.hasClass('fa-chevron-down')){
        element.removeClass('fa-chevron-down');
        element.addClass('fa-chevron-up');
      }else{
        element.removeClass('fa-chevron-up');
        element.addClass('fa-chevron-down');
      }
      element.parent().parent().siblings().slideToggle("slow");
    });
}

function coatsZoom(){
    $('.coat').mouseover(function(event) {
      var element = $(this);
      //element.removeClass('coat');
      element.addClass('coat-zoom');
    }).mouseout(function(event) {
      var element2 = $(this);
      element2.removeClass('coat-zoom');
    });
}

function analizarDatos(id, value)
{
  var numero =  parseInt(id);
  var x = numero +'';
  //habilitarCampos(numero, value);
  if(x.length>2)
    logica(numero,value);
  else{

    logicaPlayoff(numero,value);       

  }

}

function habilitarCampos(i, v)
{
  habilitarOctavos(i,v);
  habilitarCuartos(i,v);
  habilitarSemis(i,v);
  habilitarFinal(i,v);
}

function analizarInputs(){
        /*$("input").each(function(index, val) {
     var fd1 = $(this).attr("id");
     var resp = getItem(fd1);
     var entero = parseInt(resp);
    if($(this).hasClass("grupos_i")){
        if(entero !== -1) 
            $(this).prop('disabled', true);
        else 
            $(this).prop('disabled', false);
    }
    else $(this).prop('disabled', true);
    
  });*/
  $("input.grupos_i").each(function(index, val) {
      var fd1 = $(this).attr("id");
      var value = getItem(fd1);
      analizarDatos(fd1,value);
    });
    /*$("input.octavos").each(function(index, val) {
      var fd1 = $(this).attr("id");
      var value = getItem(fd1); 
      var entero = parseInt(value);
      if (entero !== -1) {
            $('#'+fd1).val(entero);
            analizarDatos(fd1,value);
        } 
    });
    $("input.cuartos").each(function(index, val) {
      var fd1 = $(this).attr("id");
      var value = getItem(fd1); 
      var entero = parseInt(value);
      if (entero !== -1) {
            $('#'+fd1).val(entero);
            analizarDatos(fd1,value);
        }
    });
    $("input.semis").each(function(index, val) {
      var fd1 = $(this).attr("id");
      var value = getItem(fd1); 
      var entero = parseInt(value);
      if (entero !== -1) {
            $('#'+fd1).val(entero);
            analizarDatos(fd1,value);
        }
    });
    $("input.final").each(function(index, val) {
      var fd1 = $(this).attr("id");
      var value = getItem(fd1); 
      var entero = parseInt(value);
      if (entero !== -1) {
            $('#'+fd1).val(entero);
            analizarDatos(fd1,value);
        }
    });*/
}
function cargarInputs(){
    $("input").change(function(index, element)
    {
        
        var value = $(this).val();
        var fd = $(this).attr("id");
        var value_string = ''+value;
        if(isNaN(value) || value == -1 || value_string.indexOf(' ') !== -1){
          alert("Ingrese un Numero entero y sin espacios");
          $('#'+fd).val("");
          setItem(fd,-1);
          $(this).prop('disabled', false);
        }else{      
          
          if($(this).hasClass("grupos_i")){
            if(value !== "" && value !== null) $(this).prop('disabled', true);
            else $(this).prop('disabled', false);
          }
          else{
            setItem(fd,-1);
            analizarDatos(fd,-1);
          }
          setItem(fd,value);
          analizarDatos(fd,value);
        }
    });   


}


function habilitarOctavos(i,v){
  if(todosLlenos(0))
  {
    pasarEquiposOctavos(0);
    $("#1").prop('disabled', false);
    $("#10").prop('disabled', false);
  }
  else
  {
    $("#1").prop('disabled', true);
    $("#10").prop('disabled', true);
  } 

  if(todosLlenos(1))
  {
    pasarEquiposOctavos(1);
    $("#2").prop('disabled', false);
    $("#9").prop('disabled', false);
  }
  else
  {
    $("#2").prop('disabled', true);
    $("#9").prop('disabled', true);
  }

  if(todosLlenos(2))
  {
    pasarEquiposOctavos(2);
    $("#3").prop('disabled', false);
    $("#12").prop('disabled', false);
  }
  else
  {
    $("#3").prop('disabled', true);
    $("#12").prop('disabled', true);
  }

  if(todosLlenos(3))
  {
    pasarEquiposOctavos(3);
    $("#4").prop('disabled', false);
    $("#11").prop('disabled', false);
  }
  else
  {
    $("#4").prop('disabled', true);
    $("#11").prop('disabled', true);
  }

  if(todosLlenos(4))
  {
    pasarEquiposOctavos(4);
    $("#5").prop('disabled', false);
    $("#14").prop('disabled', false);
  }
  else
  {
    $("#5").prop('disabled', true);
    $("#14").prop('disabled', true);
  }

  if(todosLlenos(5))
  {
    pasarEquiposOctavos(5);
    $("#6").prop('disabled', false);
    $("#13").prop('disabled', false);
  }
  else
  {
    $("#6").prop('disabled', true);
    $("#13").prop('disabled', true);
  }

  if(todosLlenos(6))
  {
    pasarEquiposOctavos(6);
    $("#7").prop('disabled', false);
    $("#16").prop('disabled', false);
  }
  else
  {
    $("#7").prop('disabled', true);
    $("#16").prop('disabled', true);
  }

  if(todosLlenos(7))
  {
    pasarEquiposOctavos(7);
    $("#8").prop('disabled', false);
    $("#15").prop('disabled', false);
  }
  else
  {
    $("#8").prop('disabled', true);
    $("#15").prop('disabled', true);
  }
}

function habilitarCuartos(i,v){
  if(i === 1  || i === 2){
    var r1 = noEsVacio(1) && noEsVacio(2);
    $("#17").prop('disabled', !r1);
  }
  if(i === 3  || i === 4){
    var r2 = noEsVacio(3) && noEsVacio(4);
    $("#18").prop('disabled', !r2);
  } 

  if(i === 5  || i === 6){
    var r3 = noEsVacio(5) && noEsVacio(6);
    $("#19").prop('disabled', !r3);
  } 
  if(i === 7  || i === 8) {
    var r4 = noEsVacio(7) && noEsVacio(8);
    $("#20").prop('disabled', !r4);
  } 
  if(i === 9  || i === 10){
    var r5 = noEsVacio(9) && noEsVacio(10);
    $("#21").prop('disabled', !r5);
  } 
  if(i === 11 || i === 12){
    var r6 = noEsVacio(11) && noEsVacio(12);
    $("#22").prop('disabled', !r6);
  } 
  if(i === 13 || i === 14) {
    var r7 = noEsVacio(13) && noEsVacio(14);
    $("#23").prop('disabled', !r7);
  } 
  if(i === 15 || i === 16){
    var r8 = noEsVacio(15) && noEsVacio(16);
    $("#24").prop('disabled', !r8);
  } 
}


function habilitarSemis(i,v){

  if(i === 17 || i === 18){
    var r1 = noEsVacio(17) && noEsVacio(18);
    $("#25").prop('disabled', !r1);
  } 
  if(i === 19 || i === 20){
    var r2 = noEsVacio(19) && noEsVacio(20);
    $("#26").prop('disabled', !r2);
  }
  if(i === 21 || i === 22){
    var r3 = noEsVacio(21) && noEsVacio(22);
    $("#27").prop('disabled', !r3);
  } 
  if(i === 23 || i === 24){
    var r4 = noEsVacio(23) && noEsVacio(24);
    $("#28").prop('disabled', !r4);
  }  
}

function habilitarFinal(i,v){
  if(i === 25 || i === 26){
    var r1 = noEsVacio(25) && noEsVacio(26);
    $("#29").prop('disabled', !r1);
  } 
  if(i === 27 || i === 28){
    var r2 = noEsVacio(27) && noEsVacio(28);
    $("#30").prop('disabled', !r2);
  }
}


function todosLlenos(n_grupo){
  var inp1;
  var inp2;
  var result  = true;
  for(var i=0;i<6;i++){
    inp1 = 1+ ''+ n_grupo + '' + i +'' +101;
    inp2 = 1+ ''+ n_grupo + '' + i +'' +102;
    result = noEsVacio(inp1) && noEsVacio(inp2) && result;
  }
  return result;
}

function noEsVacio(id){
    var item = parseInt(getItem(id));
  return (item !== -1) ;
}

function description(){
 $( ".coat" ).qtip({
    overwrite: true,
    content: {
        text: $(this).attr('title'),
        title: function(event, api) {
            // Retrieve content from ALT attribute of the $('.selector') element
            return $(this).attr('alt');
        }
    },

    style: {
        tip: { // Now an object instead of a string
           corner: 'bottom center',
            //mimic: 'bottom left',
            border: 1,
            width: 20,
            height: 20
         },
        classes: 'qtip-youtube qtip-rounded my-clase-tip'
    },
    position: {
        my: 'bottom center',
        at: 'top center'
    },
    show: {
        effect: function(offset) {
            $(this).slideDown(350); // "this" refers to the tooltip
        }
    }  
  });
}
function logica(id,value)
{
  var no_vacios = false;
  var label_right;
  var label_left;
  var value_vs_left;
  var value_vs_right;
  if(id%2===0)
  {
    no_vacios = noEsVacio(id) && noEsVacio(id-1);
    if(no_vacios)
    {
      label_left = getRowTableLeft(id-1);
      label_right = getRowTableRight(id);
      value_vs_left = getValueVsLeft(id-1);
      value_vs_right = value;

    }
  }else
  {
    no_vacios = noEsVacio(id) && noEsVacio(id+1);
    if(no_vacios)
    {
      label_left = getRowTableLeft(id);
      label_right = getRowTableRight(id+1);
      value_vs_right = getValueVsRight(id+1);
      value_vs_left = value;
    }
  }

  if(no_vacios)
  {
    var x = id+'';
    var id_table = x.charAt(1);
    if(value_vs_left !== "" && value_vs_left !== null && value_vs_right !== "" && value_vs_right !== null)
    {
      //console.log(label_left+': '+value_vs_left + '  ' +label_right+': '+value_vs_right);
      var label1;
      var label2;
      if(label_left.indexOf(' ') !== -1)
      {
       label1 = label_left.replace(/\s/g,'_');
      }
       

      else
        label1 = label_left;
      if(label_right.indexOf(' ') !== -1){
         label2 = label_right.replace(/\s/g,'_');
     }
      else 
        label2 = label_right;
      modificarTabla(id_table,label1,value_vs_left,label2,value_vs_right);
    }
      
  }
  
}

function getRowTableRight(id)
{
  var label_text = $('#'+id).parent().next().find(".name_right").text();
  return label_text;
}

function getRowTableLeft(id)
{
  var label_text = $('#'+id).parent().prev().find(".name_left").text();
  return label_text;
}

function getValueVsLeft(id)
{
  var valor = $('#'+id).val();
  return valor;
}

function getValueVsRight(id)
{
  var valor = $('#'+id).val();
  return valor;
}

function modificarTabla(id_table,label_left,value_vs_left,label_right,value_vs_right)
{
  var tabla = "#table"+id_table;
  var array_left;
  var array_right;
  if(value_vs_left > value_vs_right)
  {
    array_left = [1,1,0,0,value_vs_left,value_vs_right,3];
    array_right = [1,0,0,1,value_vs_right,value_vs_left,0]; 
  }
  else
  {
    if(value_vs_left < value_vs_right)
    {
      array_left = [1,0,0,1,value_vs_left,value_vs_right,0];
      array_right = [1,1,0,0,value_vs_right,value_vs_left,3];
    }else
    {
      array_left = [1,0,1,0,value_vs_left,value_vs_right,1];
      array_right = [1,0,1,0,value_vs_right,value_vs_left,1];
    }
  }

  $("#"+label_left).children("td").each(function (index) {
    if(index !== 0 && index !== 1)
    {
      var element1 = $(this);
      
      var numero1 = parseInt(element1.text()) + parseInt(array_left[index-2]);
      element1.text(numero1);
    }
   });
  $("#"+label_right).children("td").each(function (index) {

    if(index !== 0 && index !== 1)
    {
      var element2 = $(this);
      var numero2 = parseInt(element2.text()) + parseInt(array_right[index-2]);
      element2.text(numero2);
    }
   });

  actualizarSorter(tabla);
}


function myTableSorterWidget()
{
  $.tablesorter.addWidget({
      // give the widget a id
      id: "indexFirstColumn",
      // format is called when the on init and when a sorting has finished
      format: function(table) {       
        // loop all tr elements and set the value for the first column  
        var value;
        for(var i=1; i <= table.tBodies[0].rows.length; i++) {
          value = i;
          $("tbody tr:eq(" + (i - 1) + ") td:first",table).html(value);
        }                   
      }
    });
}

function pasarEquiposOctavos(id_table)
{
  var table = "#table"+id_table;
  var nombre_primero;
  var nombre_segundo;
  var element1;
  var element2;


  element1 = $("tbody tr:eq(0) td:eq(1)",table);
  nombre_primero = element1.text();
  
  element2 = $("tbody tr:eq(1) td:eq(1)",table);
  nombre_segundo = element2.text();  
  

  nombre_primero = nombre_primero.toLowerCase();
  nombre_segundo = nombre_segundo.toLowerCase();
  switch(id_table)
  {
    case 0:
      localStorage.setItem("Octavos11", nombre_primero);
      document.getElementById("Partido1").innerHTML = arreglarString(localStorage.getItem("Octavos11"));
      document.getElementById("Imagen1").src = "images/flags/f"+localStorage.getItem("Octavos11")+".png";
      localStorage.setItem("Octavos22", nombre_segundo);
      document.getElementById("Partido10").innerHTML = arreglarString(localStorage.getItem("Octavos22"));
      document.getElementById("Imagen10").src = "images/flags/f"+localStorage.getItem("Octavos22")+".png";
      break;
    case 1:
      if(nombre_primero === "españa")
      {
        nombre_primero = "espana";
      }
      else
      {
        if(nombre_segundo === "españa")
        {
          nombre_segundo = "espana";
        }
      }
      localStorage.setItem("Octavos12", nombre_primero);
      document.getElementById("Partido2").innerHTML = arreglarString(localStorage.getItem("Octavos12"));
      document.getElementById("Imagen2").src = "images/flags/f"+localStorage.getItem("Octavos12")+".png";
      localStorage.setItem("Octavos21", nombre_segundo);
      document.getElementById("Partido9").innerHTML = arreglarString(localStorage.getItem("Octavos21"));
      document.getElementById("Imagen9").src = "images/flags/f"+localStorage.getItem("Octavos21")+".png";
      break;
    case 2:
      if(nombre_primero === "costa de marfil")
      {
        nombre_primero = "costademarfil";
      }
      else
      {
        if(nombre_segundo === "costa de marfil")
        {
          nombre_segundo = "costademarfil";
        }
      }
      localStorage.setItem("Octavos13", nombre_primero);
      document.getElementById("Partido3").innerHTML = arreglarString(localStorage.getItem("Octavos13"));
      document.getElementById("Imagen3").src = "images/flags/f"+localStorage.getItem("Octavos13")+".png";
      localStorage.setItem("Octavos24", nombre_segundo);
      document.getElementById("Partido12").innerHTML = arreglarString(localStorage.getItem("Octavos24"));
      document.getElementById("Imagen12").src = "images/flags/f"+localStorage.getItem("Octavos24")+".png";
      break;
    case 3:
      if(nombre_primero === "costa rica")
      {
        nombre_primero = "costarica";
      }
      else
      {
        if(nombre_segundo === "costa rica")
        {
          nombre_segundo = "costarica";
        }
      }
      localStorage.setItem("Octavos14", nombre_primero);
      document.getElementById("Partido4").innerHTML = arreglarString(localStorage.getItem("Octavos14"));
      document.getElementById("Imagen4").src = "images/flags/f"+localStorage.getItem("Octavos14")+".png";
      localStorage.setItem("Octavos23", nombre_segundo);
      document.getElementById("Partido11").innerHTML = arreglarString(localStorage.getItem("Octavos23"));
      document.getElementById("Imagen11").src = "images/flags/f"+localStorage.getItem("Octavos23")+".png";
      break;
    case 4:
      localStorage.setItem("Octavos15", nombre_primero);
      document.getElementById("Partido5").innerHTML = arreglarString(localStorage.getItem("Octavos15"));
      document.getElementById("Imagen5").src = "images/flags/f"+localStorage.getItem("Octavos15")+".png";
      localStorage.setItem("Octavos26", nombre_segundo);
      document.getElementById("Partido14").innerHTML = arreglarString(localStorage.getItem("Octavos26"));
      document.getElementById("Imagen14").src = "images/flags/f"+localStorage.getItem("Octavos26")+".png";
      break;
    case 5:
      localStorage.setItem("Octavos16", nombre_primero);
      document.getElementById("Partido6").innerHTML = arreglarString(localStorage.getItem("Octavos16"));
      document.getElementById("Imagen6").src = "images/flags/f"+localStorage.getItem("Octavos16")+".png";
      localStorage.setItem("Octavos25", nombre_segundo);
      document.getElementById("Partido13").innerHTML = arreglarString(localStorage.getItem("Octavos25"));
      document.getElementById("Imagen13").src = "images/flags/f"+localStorage.getItem("Octavos25")+".png";
      break;
    case 6:
      var flag1;
      var flag2;
      localStorage.setItem("Octavos17", nombre_primero);
      document.getElementById("Partido7").innerHTML = arreglarString(localStorage.getItem("Octavos17"));
      if(localStorage.getItem("Octavos17") === "usa") 
        flag1 = "USA";
      else
        flag1 =localStorage.getItem("Octavos17");
      document.getElementById("Imagen7").src = "images/flags/f"+flag1+".png";
      localStorage.setItem("Octavos28", nombre_segundo);

      document.getElementById("Partido16").innerHTML = arreglarString(localStorage.getItem("Octavos28"));

      if(localStorage.getItem("Octavos28") === "usa") 
        flag2 = "USA";
      else
        flag2 = localStorage.getItem("Octavos28");
      document.getElementById("Imagen16").src = "images/flags/f"+flag2+".png";
      break;
    case 7:
      if(nombre_primero === "corea del sur")
      {
        nombre_primero = "corea";
      }
      else
      {
        if(nombre_segundo === "corea del sur")
        {
          nombre_segundo = "corea";
        }
      }
      localStorage.setItem("Octavos18", nombre_primero);
      document.getElementById("Partido8").innerHTML = arreglarString(localStorage.getItem("Octavos18"));
      document.getElementById("Imagen8").src = "images/flags/f"+localStorage.getItem("Octavos18")+".png";
      localStorage.setItem("Octavos27", nombre_segundo);
      document.getElementById("Partido15").innerHTML = arreglarString(localStorage.getItem("Octavos27"));
      document.getElementById("Imagen15").src = "images/flags/f"+localStorage.getItem("Octavos27")+".png";
      break;
  }
}

function arreglarString(string){
 var arrayWords;
 var returnString = "";
 var len;
 arrayWords = string.split(" ");
 len = arrayWords.length;
 for(i=0;i < len ;i++){
  if(i !== (len-1)){
   returnString = returnString+ucFirst(arrayWords[i])+" ";
  }
  else{
   returnString = returnString+ucFirst(arrayWords[i]);
  }
 }

 if(returnString === "Costademarfil") return "Costa de Marfil";
 else if(returnString === "Espana") return "España";
 else if(returnString === "Costarica") return "Costa Rica";
 else return returnString;
}
function ucFirst(string){
 return string.substr(0,1).toUpperCase()+string.substr(1,string.length).toLowerCase();
}

function logicaP2(i, v)
{
  if(i === 1  || i === 2)   $("#17").prop('disabled', false);    
  if(i === 3  || i === 4)   $("#18").prop('disabled', false);
  if(i === 5  || i === 6)   $("#19").prop('disabled', false);
  if(i === 7  || i === 8)   $("#20").prop('disabled', false);
  if(i === 17 || i === 18)  $("#25").prop('disabled', false);
  if(i === 19 || i === 20)  $("#26").prop('disabled', false);
  if(i === 9  || i === 10)  $("#21").prop('disabled', false);
  if(i === 11 || i === 12)  $("#22").prop('disabled', false);
  if(i === 13 || i === 14)  $("#23").prop('disabled', false);
  if(i === 15 || i === 16)  $("#24").prop('disabled', false);
  if(i === 23 || i === 24)  $("#28").prop('disabled', false);
  if(i === 21 || i === 22)  $("#27").prop('disabled', false);
  if(i === 25 || i === 26)  $("#29").prop('disabled', false);
  if(i === 27 || i === 28)  $("#30").prop('disabled', false);

}

function guardarDatosP(id, p1, p2, Partido)
{
  var au1;
  var au2;
  
  if(id === "Cuartos11") { au1 = "Octavos11"; au2 = "Octavos12"; }
  if(id === "Cuartos12") { au1 = "Octavos13"; au2 = "Octavos14"; }
  if(id === "Cuartos13") { au1 = "Octavos15"; au2 = "Octavos16"; }
  if(id === "Cuartos14") { au1 = "Octavos17"; au2 = "Octavos18"; }
  if(id === "Cuartos15") { au1 = "Octavos21"; au2 = "Octavos22"; }
  if(id === "Cuartos16") { au1 = "Octavos23"; au2 = "Octavos24"; }
  if(id === "Cuartos17") { au1 = "Octavos25"; au2 = "Octavos26"; }
  if(id === "Cuartos18") { au1 = "Octavos27"; au2 = "Octavos28"; }
  if(id === "Semi1")     { au1 = "Cuartos11"; au2 = "Cuartos12"; }
  if(id === "Semi2")     { au1 = "Cuartos13"; au2 = "Cuartos14"; }
  if(id === "Semi3")     { au1 = "Cuartos15"; au2 = "Cuartos16"; }
  if(id === "Semi4")     { au1 = "Cuartos17"; au2 = "Cuartos18"; }
  if(id === "Final1")    { au1 = "Semi1";     au2 = "Semi2";     }
  if(id === "Final2")    { au1 = "Semi3";     au2 = "Semi4";     }

  var aux;
  if(getItem(p1)>=getItem(p2)) aux = au1;
  else aux = au2; 
  
  localStorage.setItem(id, localStorage.getItem(aux));
  var divContainer = document.getElementById("Partido"+Partido);
  divContainer.innerHTML = arreglarString(localStorage.getItem(aux)); 
  var flag;
  if(localStorage.getItem(aux) === "usa") 
    flag = "USA";
  else
    flag =localStorage.getItem(aux); 
  document.getElementById("Imagen"+Partido).src = "images/flags/f"+ flag +".png";
                    
}

function analisisPartidosPlayoff(partido1, partido2)
{  
    var Partido;

    if(partido1 === 1  && partido2 === 2 )  { Partido = 17; guardarDatosP("Cuartos11", partido1, partido2, 17); }
    if(partido1 === 3  && partido2 === 4 )  { Partido = 18; guardarDatosP("Cuartos12", partido1, partido2, 18); }   
    if(partido1 === 5  && partido2 === 6 )  { Partido = 19; guardarDatosP("Cuartos13", partido1, partido2, 19); }   
    if(partido1 === 7  && partido2 === 8 )  { Partido = 20; guardarDatosP("Cuartos14", partido1, partido2, 20); }
    if(partido1 === 9  && partido2 === 10)  { Partido = 21; guardarDatosP("Cuartos15", partido1, partido2, 21); }
    if(partido1 === 11 && partido2 === 12)  { Partido = 22; guardarDatosP("Cuartos16", partido1, partido2, 22); }
    if(partido1 === 13 && partido2 === 14)  { Partido = 23; guardarDatosP("Cuartos17", partido1, partido2, 23); }
    if(partido1 === 15 && partido2 === 16)  { Partido = 24; guardarDatosP("Cuartos18", partido1, partido2, 24); }   
    if(partido1 === 17 && partido2 === 18)  { Partido = 25; guardarDatosP("Semi1",     partido1, partido2, 25); }   
    if(partido1 === 19 && partido2 === 20)  { Partido = 26; guardarDatosP("Semi2",     partido1, partido2, 26); }   
    if(partido1 === 23 && partido2 === 24)  { Partido = 28; guardarDatosP("Semi4",     partido1, partido2, 28); }   
    if(partido1 === 21 && partido2 === 22)  { Partido = 27; guardarDatosP("Semi3",     partido1, partido2, 27); }   
    if(partido1 === 25 && partido2 === 26)  { Partido = 29; guardarDatosP("Final1",    partido1, partido2, 29); }
    if(partido1 === 27 && partido2 === 28)  { Partido = 30; guardarDatosP("Final2",    partido1, partido2, 30); }      
} 

function logicaPlayoff(numero, value)
{  
    if(numero%2 === 0)
    {        
        if(noEsVacio(numero-1)&&noEsVacio(numero))
        { 
          logicaP2(numero, value);                                 
          analisisPartidosPlayoff(numero-1, numero);          
        }
        else
        {
            borrarPlay(numero);      
        }             
    }
    else
    {
        if(noEsVacio(numero+1)&&noEsVacio(numero))
        { 
          logicaP2(numero, value);                   
          analisisPartidosPlayoff(numero, numero+1);                    
        } 
        else 
        {
            borrarPlay(numero);            
        }
    } 

}

function rec(i)
{
  document.getElementById("Partido"+i).innerHTML = "Equipo ?";  document.getElementById("Imagen"+i).src = "images/flags/fx.png";
  $("#"+i).val("");  
  $("#"+i).prop('disabled',true);
  localStorage.setItem(i, "");

}

function borrarPlay(i)
{
    if(i === 1  || i === 2)   {  localStorage.setItem("Cuartos11", ""); rec(17); borrarPlay(17); }
    if(i === 3  || i === 4)   {  localStorage.setItem("Cuartos12", ""); rec(18); borrarPlay(18); }
    if(i === 5  || i === 6)   {  localStorage.setItem("Cuartos13", ""); rec(19); borrarPlay(19); }
    if(i === 7  || i === 8)   {  localStorage.setItem("Cuartos14", ""); rec(20); borrarPlay(20); }
    if(i === 9  || i === 10)  {  localStorage.setItem("Cuartos15", ""); rec(21); borrarPlay(21); }
    if(i === 11 || i === 12)  {  localStorage.setItem("Cuartos16", ""); rec(22); borrarPlay(22); }
    if(i === 13 || i === 14)  {  localStorage.setItem("Cuartos17", ""); rec(23); borrarPlay(23); }
    if(i === 15 || i === 16)  {  localStorage.setItem("Cuartos18", ""); rec(24); borrarPlay(24); }
    if(i === 17 || i === 18)  {  localStorage.setItem("Semi1", ""); rec(25); borrarPlay(25); }
    if(i === 19 || i === 20)  {  localStorage.setItem("Semi2", ""); rec(26); borrarPlay(26); }
    if(i === 23 || i === 24)  {  localStorage.setItem("Semi4", ""); rec(28); borrarPlay(28); }
    if(i === 21 || i === 22)  {  localStorage.setItem("Semi3", ""); rec(27); borrarPlay(27); }
    if(i === 25 || i === 26)  {  localStorage.setItem("Final1", "");rec(29); borrarPlay(29); }
    if(i === 27 || i === 28)  {  localStorage.setItem("Final2", ""); rec(30); borrarPlay(30); }
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
/*function getItem(id_gol){
    var value;
    var errorHandling = function( req, status, err ) {
                            console.log( 'Something went wrong', status, err );
                        };
    var id_input = 'p_'+id_gol;
    $.ajax({
            async: false,
            url: './auxiliares/item_gol.php',
            type: 'POST',
            data: { 
                Case:'get',
                id_gol:id_input
            },
            success:function (resp){
                   value = resp;
            },
            error: errorHandling
    });
    return value;
}*/

function getItem(id_gol){
    return $('#'+id_gol).val();
}

function setItem(id_gol,input_value){
    //var id_input = id_gol.substring(0, id_gol.indexOf('_'));
      
    var errorHandling = function( req, status, err ) {
                            console.log( 'Something went wrong', status, err );
                        };
    var id_input = 'p_'+id_gol;
    $.ajax({
            url: './auxiliares/item_gol.php',
            type: 'POST',
            data: { 
                Case:'set',
                id_gol:id_input,
                value:input_value
            },
            error: errorHandling
    });
}

