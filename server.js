
const express = require('express');
const app = express();
const path = require('path');
var fs = require('fs');

const Clases = require('./Clases');//Importo las clases del archivo Clases.js
const funciones = require('./app');//Importo las funciones del archivo app.js

var socios = [];//Array de Socios
var libros = [];//Array de Libros
var pedidos = [];//Array de pedidos




try {
    var contenido = fs.readFileSync('./Archivos/Socios.txt', 'utf-8');
    socios = JSON.parse(contenido);
} catch (erroSocios) {
    console.log("No se pudo cargar a los socios");
    socios = [];
}//Cargo los socios que se encuentran en el archivo txt


try {
    var contenidoLibro = fs.readFileSync('./Archivos/Libros.txt', 'utf-8');
    libros = JSON.parse(contenidoLibro);
} catch (error) {
    console.log("No se pudo parcear el contenido")
    libros = [];
}//Cargo los libros que se encuentran en el archivo txt

try {
    var contenidoPedido = fs.readFileSync('./Archivos/Pedidos.txt', 'utf-8');
    pedidos = JSON.parse(contenidoPedido);
} catch (errorPedido) {
    console.log("No se pudo parcear el contenido del archivo Pedido.txt")
    pedidos = [];
}//Cargo los pedidos que se encuentran en el archivo txt



const port = 3000;//Asigno el puerto
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('Archivos'));//Cargo el archivo CSS en el servidor.

app.get('/', (request, response) => {
    //Menu
    response.sendFile(path.join(__dirname, './Archivos/BibliotecaMenu.html'))

});

//Añadir Socios--------------------------------------------Comienzo
app.get('/AnadirUnSocio', (request, response) => {
    //
    response.sendFile(path.join(__dirname, './Archivos/Forms/AnadirUnSocio.html'))

});
app.post('/AnadirUnSocioPost', (request, response) => {
    console.log("Llego un post");

    funciones.guardarSocio(request.body, socios);

    response.redirect('/AnadirUnSocio');
});

//Añadir Socios--------------------------------------------Fin




//Añadir Libro--------------------------------------------Comienzo
app.get('/AnadirUnLibro', (request, response) => {
    //
    response.sendFile(path.join(__dirname, './Archivos/Forms/AnadirUnLibro.html'))

});
app.post('/AnadirUnLibroPost', (request, response) => {

    funciones.guardarLibro(request.body, libros);
    response.redirect('/AnadirUnLibro');

})

//Añadir Libros--------------------------------------------Fin


//Mostrar datos----------------------------------Inicio
app.get('/VerSocios', (request, response) => {


    //funciones.mostrarSocios(response, socios);
    var sociosTabla = funciones.mostrarSocios(socios);
    response.sendFile(path.join(__dirname, './Archivos/ToShow/VerSocios.html'))


});

app.get('/VerSociosTabla', (request, response) => {

    //var sociosTabla = funciones.mostrarSocios();//NO Sirve

    response.send(socios);


});

app.get('/VerLibros', (request, response) => {

    response.sendFile(path.join(__dirname, './Archivos/ToShow/VerLibros.html'))

});

app.get('/VerLibrosTabla', (request, response) => {

    response.send(libros);

});

app.get('/Mostrar-Pedidos', (request, response) => {
    response.sendFile(path.join(__dirname, './Archivos/ToShow/Mostrar-Pedidos.html'))
});

app.get('/Mostrar-PedidosTabla', (request, response) => {
    response.send(pedidos);
});
//Mostrar datos----------------------------------Fin

//Dar de baja------------------------------------Inicio
app.get('/Dar-de-baja-un-Libro', (request, response) => {
    response.sendFile(path.join(__dirname, './Archivos/Dar de Baja/Dar-de-baja-un-Libro.html'))
});
app.post('/Dar-de-baja-un-LibroPost', (request, response) => {

  
    var libro = JSON.parse(request.body.libro);
    libro.desactivado=true;

    console.log(libro);
    response.redirect('/Dar-de-baja-un-Libro');
});
app.get('/Dar-de-baja-un-Socio', (request, response) => {
    response.sendFile(path.join(__dirname, './Archivos/Dar de Baja/Dar-de-baja-un-Socio.html'))
});
//Dar de baja------------------------------------Fin


//Pedidos------------------------------------Comienzo
app.get('/Pedir-un-libro', (request, response) => {
    response.sendFile(path.join(__dirname, './Archivos/Forms/Pedir-un-libro.html'))
});

app.post('/Pedir-un-libro-Post', (req, res) => {

    funciones.guardarPedido(req.body, pedidos);
    res.redirect("/Pedir-un-libro");
});


app.get('/Devolver-un-libro', (request, response) => {
    response.sendFile(path.join(__dirname, './Archivos/Devolver-un-libro.html'))
});

//Pedidos-----------------------------------Fin

//Mostrar Puerto-----------------------------------
app.listen(port, () => {
    console.log(`Express listen on port ${port}!`);
});




