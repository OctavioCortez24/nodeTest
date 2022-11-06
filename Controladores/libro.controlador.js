const path = require('path');
const controlador={};//<----Objeto
const modelo = require('../Modelo');//Importo las funciones del archivo Modelo.js

controlador.anadirLibro= (request, response) => {
    //Envio el formulario para añadir un socio
    response.sendFile(path.join(__dirname, '../Archivos/Forms/AnadirUnLibro.html'))

}
controlador.anadirLibroPost=(request, response) => {
    //Recibe los atributos del socio
    modelo.guardarLibro(request.body);
    response.redirect('/AnadirUnLibro');

}
controlador.darDeBaja=(request, response) => {
    //Envio el html de Dar de baja
    response.sendFile(path.join(__dirname, '../Archivos/Dar de Baja/Dar-de-baja-un-Libro.html'))
}
controlador.darDeBajaPost=(request, response) => {
    //Terminar esto
  
    var libro = JSON.parse(request.body.libro);
    libro.desactivado=true;

    console.log(libro);
    response.redirect('/Dar-de-baja-un-Libro');
}
controlador.verLibros=(request, response) => {

    response.sendFile(path.join(__dirname, '../Archivos/ToShow/VerLibros.html'))

}

controlador.verLibrosTabla=(request, response) => {

    var libros=modelo.enviarLibros();//Traigo el array de libros desde el archivo Modelo
    response.send(libros);

}



module.exports = controlador;