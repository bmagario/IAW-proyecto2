/*
 * @param xmlFile, el nombre del archivo xml a cargar
 * @return devuelve un elemento con la estructura del archivo XML para recorrer utilizando la interfaz DOM
 **/


function loadXMLDoc(archivoXML)  {
     var xmlDoc;
 
     if (window.XMLHttpRequest) {
         xmlDoc = new window.XMLHttpRequest();
         xmlDoc.open("GET", archivoXML, false);
         xmlDoc.send("");
         return xmlDoc.responseXML;
     }
     // para IE 5 y IE 6
     else if (ActiveXObject("Microsoft.XMLDOM"))
     {
          xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
          xmlDoc.async = false;
          xmlDoc.load(archivoXML);
          return xmlDoc;
     }
 
     alert("Error cargando el documento.");
 
     return null;
}
