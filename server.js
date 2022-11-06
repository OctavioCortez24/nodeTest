
const express = require('express');
const app = express();
const path = require('path');
var fs = require('fs');

const funciones = require('./Modelo');//Importo las funciones del archivo Modelo.js



const port = 3000;//Asigno el puerto
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('Archivos'));//Cargo el archivo CSS en el servidor.



//-----


//Mostrar datos----------------------------------Inicio
app.get('/Mostrar-Pedidos', (request, response) => {
    response.sendFile(path.join(__dirname, './Archivos/ToShow/Mostrar-Pedidos.html'))
});

app.get('/Mostrar-PedidosTabla', (request, response) => {
    var pedidos=funciones.enviarPedidos();
    response.send(pedidos);
});
//Mostrar datos----------------------------------Fin




//Pedidos------------------------------------Comienzo
app.get('/Pedir-un-libro', (request, response) => {
    response.sendFile(path.join(__dirname, './Archivos/Forms/Pedir-un-libro.html'))
});

app.post('/Pedir-un-libro-Post', (req, res) => {

    funciones.guardarPedido(req.body);
    res.redirect("/Pedir-un-libro");
});


app.get('/Devolver-un-libro', (request, response) => {
    response.sendFile(path.join(__dirname, './Archivos/Devolver-un-libro.html'))
});
app.post('/Devolver-un-libroPost', (request, response) => {
    
    var libro=JSON.parse(request.body.libro);
    libro.disponible
    response.redirect('/Devolver-un-libro');

});

//Pedidos-----------------------------------Fin

//Mostrar Puerto-----------------------------------
app.listen(port, () => {
    console.log(`Express listen on port ${port}!`);
});




