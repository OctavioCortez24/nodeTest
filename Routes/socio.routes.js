const express= require('express');
const router = express.Router();
const path = require('path');

const funciones = require('../Modelo');//Importo las funciones del archivo Modelo.js


//Añadir Socios--------------------------------------------Comienzo
router.get('/AnadirUnSocio', (request, response) => {
    //
    response.sendFile(path.join(__dirname, '../Archivos/Forms/AnadirUnSocio.html'))

});
router.post('/AnadirUnSocioPost', (request, response) => {

    funciones.guardarSocio(request.body); //Envio los atributos del socio al modelo

    response.redirect('/AnadirUnSocio');
});

//Añadir Socios--------------------------------------------Fin




//Mostrar datos----------------------------------Inicio
router.get('/VerSocios', (request, response) => {

    response.sendFile(path.join(__dirname, '../Archivos/ToShow/VerSocios.html'))


});

router.get('/VerSociosTabla', (request, response) => {

    var socios = funciones.enviarSocios();

    response.send(socios);


});
//Mostrar datos----------------------------------Fin


//Dar de baja------------------------------------Inicio

router.get('/Dar-de-baja-un-Socio', (request, response) => {
    response.sendFile(path.join(__dirname, '../Archivos/Dar de Baja/Dar-de-baja-un-Socio.html'))
});
//Dar de baja------------------------------------Fin



module.exports= router;