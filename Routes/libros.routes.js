const express= require('express');
const router = express.Router();
const path = require('path');

const funciones = require('../Modelo');//Importo las funciones del archivo Modelo.js

//Añadir Libro--------------------------------------------Comienzo
router.get('/AnadirUnLibro', (request, response) => {
    //
    response.sendFile(path.join(__dirname, '../Archivos/Forms/AnadirUnLibro.html'))

});
router.post('/AnadirUnLibroPost', (request, response) => {

    funciones.guardarLibro(request.body);
    response.redirect('/AnadirUnLibro');

})

//Añadir Libros--------------------------------------------Fin



//Dar de baja------------------------------------Inicio
router.get('/Dar-de-baja-un-Libro', (request, response) => {
    response.sendFile(path.join(__dirname, '../Archivos/Dar de Baja/Dar-de-baja-un-Libro.html'))
});
router.post('/Dar-de-baja-un-LibroPost', (request, response) => {

  
    var libro = JSON.parse(request.body.libro);
    libro.desactivado=true;

    console.log(libro);
    response.redirect('/Dar-de-baja-un-Libro');
});
//Dar de baja------------------------------------Fin



//Mostrar Libros------------------------------Inicio
router.get('/VerLibros', (request, response) => {

    response.sendFile(path.join(__dirname, '../Archivos/ToShow/VerLibros.html'))

});

router.get('/VerLibrosTabla', (request, response) => {

    var libros=funciones.enviarLibros();//Traigo el array de libros desde el archivo Modelo
    response.send(libros);

});
//Mostrar Libros------------------------------Fin






module.exports =router;