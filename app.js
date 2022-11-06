const express = require('express');
const app = express();
const path = require('path');


const port = 3000;//Asigno el puerto
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('Archivos'));//Cargo el archivo CSS en el servidor.


app.use(require('./Routes/socio.routes.js'))//Llamo a las rutas de todas las funciones que tengan que ver con un socio

app.use(require('./Routes/libros.routes.js'))//Llamo a las rutas de todas las funciones que tengan que ver con un Libro
app.use(require('./Routes/pedido.routes.js'))//Llamo a las rutas de todas las funciones que tengan que ver con pedidos

//Menu------------------------------------
app.get('/', (request, response) => {
    
    response.sendFile(path.join(__dirname, './Archivos/BibliotecaMenu.html'))

});
//----------------------------------------


app.get('/Prueba',(request, response)=>{

  var prueba= " <ul class='menu'>"+
        "<li><a href='http://localhost:3000/AnadirUnSocio'>Añadir Socio</a></li>"+
        "<li><a href='http://localhost:3000/AnadirUnLibro'>Añadir Libro</a></li>"+
        "<li><a href='http://localhost:3000/VerSocios'>Ver Socios</a></li>"+
        "<li><a href='http://localhost:3000/VerLibros'>Ver Libros</a></li>"+
        "<li><a href='http://localhost:3000/Dar-de-baja-un-Libro'>Dar de baja un Libro</a></li>"+
        "<li><a href='http://localhost:3000/Dar-de-baja-un-Socio'>Dar de baja un Socio</a></li>"+
        "<li><a href='http://localhost:3000/Pedir-un-libro'>Pedir un Libro</a></li>"+
        "<li><a href='http://localhost:3000/Mostrar-Pedidos'>Mostrar Pedidos</a></li>"+
        "<li><a href='http://localhost:3000/Devolver-un-libro'>Devolver Libro</a></li>"+
    "</ul>"

    response.send(prueba)

});




//Mostrar Puerto-----------------------------------
app.listen(port, () => {
    console.log(`Express listen on port ${port}!`);
});