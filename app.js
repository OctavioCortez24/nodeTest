var fs = require('fs');



//var socio=require('./Archivos/Datos.json');
//console.log(socio); 

const Clases = require('./Clases');


function guardarSocio(atributos, socios) {

    var nombre = atributos.name;
    var apellido = atributos.surname;
    var dNI = atributos.dni;

    var so1 = new Clases.Socio(nombre, apellido, dNI, false);//Instancio un socio
    //Compruebo si existe un socio igual
    var bandera = false;
    var validacion = socios.map(socio => socio.name == so1.getName() & socio.apellido == so1.getApellido() & socio.dNI == so1.getDNI());

    for (var i = 0; i < validacion.length; i++) {
        if (validacion[i]) {
            bandera = true;
            break;
        }
    }

    //Terimina de comprobar

    if (!bandera) {
        console.log("Funciona")
        socios.push(so1);
        var sociosString = JSON.stringify(socios);

        fs.writeFileSync('./Archivos/Socios.txt', sociosString, (error) => {
            if (error) {
                console.log('No se puede escribir en archivos');
            } else {
                console.log('Escritura existosa')
            }
        });

    } else {

        console.log('No se guardo porque hay uno igual')
    }


}


function mostrarSocios() {

    //var striTable="";

    // for(var i=0; i<socios.length;i++){
    //    striTable+="<tr><td>"+socios[i].name+"</td><td>"+socios[i].apellido+"</td><td>"+socios[i].dNI+"</td></tr>";
    // }
    //striTable="<table border=true><tr><th>Nombre</th><th>Apellido</th><th>DNI</th></tr>"+striTable+"</table>";

    // response.send(striTable);
    //return striTable;
};


function guardarLibro(atributosLibro, libros) {

    var tituloLibro = atributosLibro.titulo;
    var autorLibro = atributosLibro.nombreAutor;
    var categoriaLibro = atributosLibro.categoria;

    var libro = new Clases.Libro(tituloLibro, autorLibro, categoriaLibro, true, false);
    libros.push(libro);

    var librosString = JSON.stringify(libros);

    fs.writeFile('./Archivos/Libros.txt', librosString, (error) => {

        if (error) {
            console.log('No se puede escribir en archivos');
        } else {
            console.log('Escritura existosa')
        }
    });

}

function guardarPedido(atributosPedido, pedidos) {

    const fechaActual = new Date();

    var fechaPrestamo = fechaActual.toLocaleDateString();

    fechaActual.setDate(fechaActual.getDate() + 15);//Sumo 15 dias a la fecha actual

    var fechaDevolucion = fechaActual.toLocaleDateString();//A la fecha actual se le sumaron 15 dias

    var fechaReintegro = null;

    var libro;
    var socio;

    try {
        try {
           libro = JSON.parse(atributosPedido.libro);
        } catch (errorJSON) {
            console.log("Erorr al libro convertir en JSON")
            libro = null;
        }

        try{
            socio = JSON.parse(atributosPedido.socio);
        }catch(errorSocioJSON){
            console.log("Erorr al convertir socio en JSON")
            socio = null;
        }
    } catch (error) {
        console.log(error);
        libro = null;
        socio = null;
    }
    libro.disponible=false;

    var pedido = new Clases.Pedido(fechaPrestamo, fechaDevolucion, libro, socio, fechaReintegro);

    pedidos.push(pedido);
    var pedidosString = JSON.stringify(pedidos);

    fs.writeFileSync('./Archivos/Pedidos.txt', pedidosString, (error) => {
        if (error) {
            console.log('No se puede escribir en archivos');
        } else {
            console.log('Escritura existosa')
        }
    });


}


module.exports = { guardarSocio, mostrarSocios, guardarLibro, guardarPedido };