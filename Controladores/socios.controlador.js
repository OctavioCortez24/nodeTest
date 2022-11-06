const path = require('path');
const controlador={};//<----Objeto
const modelo = require('../Modelo');//Importo las funciones del archivo Modelo.js

controlador.anadirSocio=(request, response) => {
    //Envio el formulario para poder añadir un socio
    response.sendFile(path.join(__dirname, '../Archivos/Forms/AnadirUnSocio.html'))

}

controlador.anadirSocioPost=(request, response) => {
    //Recibe los artibutos del socio

    modelo.guardarSocio(request.body);//Envio los atributos del socio al modelo

    response.redirect('/AnadirUnSocio');
}

controlador.verSocios=(request, response) => {

    response.sendFile(path.join(__dirname, '../Archivos/ToShow/VerSocios.html'))


}

controlador.verSociosTabla=(request, response) => {

    var socios = modelo.enviarSocios();

    response.send(socios);


}

controlador.darDeBaja=(request, response) => {
    response.sendFile(path.join(__dirname, '../Archivos/Dar de Baja/Dar-de-baja-un-Socio.html'))
}

controlador.darDeBajaPost=(request, response)=>{


    response.redirect('/Dar-de-baja-un-Socio');
    //Terminar
}


module.exports=controlador;